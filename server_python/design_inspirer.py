import random
import os
from dotenv import load_dotenv
import openai
import requests
import json
import streamlit as st

import time
import logging
from datetime import datetime

load_dotenv()

news_api_key = os.environ.get("NEWS_API_KEY")

client = openai.OpenAI()
model = "gpt-3.5-turbo-16k"


def get_inspiration(topic):
    url = (
        f"https://newsapi.org/v2/everything?domains=archdaily.com,dezeen.com,architizer.com,architecturaldigest.com,designboom.com&q=architecture%20{
            topic}&apiKey={news_api_key}&pageSize=100"
    )
    try:
        headers = {
            "Cache-Control": "no-cache",  # Add cache control header
            "Pragma": "no-cache"  # Add pragma header
        }
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            inspiration = response.json()

            # Extract articles from the response
            articles = inspiration.get("articles", [])

            # Randomly select 9 articles
            if len(articles) >= 9:
                selected_articles = random.sample(articles, 9)
            else:
                # Handle the case where there are fewer than 9 articles available
                selected_articles = articles

            final_inspiration = []

           # Loop through selected articles
            for article in selected_articles:
                source_name = article["source"]["name"]
                title = article["title"]
                description = article["description"]
                url = article["url"]
                image_url = article["urlToImage"]
                content = article["content"]

                # Append a dictionary containing both summary and image URL
                final_inspiration.append({
                    "summary": f"Title: {title}, Source: {source_name}, Description: {description}, URL: {url}, Content: {content}",
                    "image_url": image_url
                })

            return final_inspiration
        else:
            return []

    except requests.exceptions.RequestException as e:
        print("Error occurred during API Request:", e)


# =================================================================


class AssistantManager:
    thread_id = None
    assistant_id = None

    def __init__(self, model: str = model):
        self.client = client
        self.model = model
        self.assistant = None
        self.thread = None
        self.run = None
        self.summary = None

        # Retrieve existing assistant and thread if IDs are already set
        if AssistantManager.assistant_id:
            self.assistant = self.client.beta.assistants.retrieve(
                AssistantManager.assistant_id
            )
        if AssistantManager.thread_id:
            self.thread = self.client.beta.threads.retrieve(
                AssistantManager.thread_id)

    # === Create assistant if no assistant ===

    def create_assistant(self, name, instructions, tools):
        if not self.assistant:
            assistant_obj = self.client.beta.assistants.create(
                name=name,
                instructions=instructions,
                tools=tools,
                model=self.model
            )
            AssistantManager.assistant_id = assistant_obj.id
            self.assistant = assistant_obj
            print(f"AssisID: {self.assistant.id}")

    # === Create thread if no thread ===

    def create_thread(self):
        if not self.thread:
            thread_obj = self.client.beta.threads.create()
            AssistantManager.thread_id = thread_obj.id
            self.thread = thread_obj
            print(f"ThreadID: {self.thread.id}")

    def add_message_to_thread(self, role, content):
        if self.thread:
            self.client.beta.threads.messages.create(
                thread_id=self.thread.id,
                role=role,
                content=content,
            )

    def run_assistant(self, instructions):
        if self.thread and self.assistant:
            self.run = self.client.beta.threads.runs.create(
                thread_id=self.thread.id,
                assistant_id=self.assistant.id,
                instructions=instructions,
            )

    def process_messages(self):
        if self.thread:
            messages = self.client.beta.threads.messages.list(
                thread_id=self.thread.id)
            summary = []
            # just get the last message of the thread
            last_message = messages.data[0]
            role = last_message.role
            response = last_message.content[0].text.value
            print(f"SUMMARY: {role.capitalize()}: ==> {response}")
            summary.append(response)
            self.summary = "\n".join(summary)

            # loop through all messages in this thread
            # for msg in messages.data:
            #     role = msg.role
            #     content = msg.content[0].text.value
            #     print(f"SUMMARY:: {role.capitalize()}: {content}")

        # for streamlit

    def get_summary(self):
        return self.summary

    # Run the steps
    def run_steps(self):
        run_steps = self.client.beta.threads.runs.steps.list(
            thread_id=self.thread.id, run_id=self.run.id
        )
        print(f"Run-Steps: {run_steps}")
        return run_steps.data

    def call_required_functions(self, required_actions):
        if not self.run:
            return

        tool_outputs = []

        for action in required_actions["tool_calls"]:
            func_name = action["function"]["name"]
            arguments = json.loads(action["function"]["arguments"])

            if func_name == "get_inspiration":
                output = get_inspiration(topic=arguments["topic"])
                print(f"STUFF ===> {output}")
                final_str = ""
                for item in output:
                    final_str += "".join(item)

                # === Dictionary ===
                tool_outputs.append(
                    {"tool_call_id": action["id"], "output": final_str})
            else:
                raise ValueError(f"Unknown function: {func_name}")

        print("Submitting outputs back to the Assistant...")

        self.client.beta.threads.runs.submit_tool_outputs(
            thread_id=self.thread.id,
            run_id=self.run.id,
            tool_outputs=tool_outputs,
        )

    def wait_for_completion(self):
        if self.thread and self.run:
            while True:
                time.sleep(5)
                run_status = self.client.beta.threads.runs.retrieve(
                    thread_id=self.thread.id,
                    run_id=self.run.id,
                )

                print(f"RUN STATUS: {run_status.model_dump_json(indent=4)}")

                if run_status.status == "completed":
                    self.process_messages()
                    break
                elif run_status.status == "requires_action":
                    print("Function calling now....")
                    self.call_required_functions(
                        run_status.required_action.submit_tool_outputs.model_dump()
                    )
                else:
                    print("Waiting for the Assistant to process...")


def main():
    manager = AssistantManager()

    # Streamlit interface
    st.title("Inspiration Board")

    # Form for user input
    with st.form(key="user_input_form"):
        instructions = st.text_area("Enter topic:")
        submit_button = st.form_submit_button(label="Get Inspired")

    # Handling the button click
    if submit_button:
        # Call get_inspiration() function to get final_inspiration
        final_inspiration = get_inspiration(instructions)

        # Create the assistant and thread if they don't exist
        manager.create_assistant(
            name="Inspiration Board",
            instructions="You're an AI assistant tailored for architects, sourcing design inspiration from architecture websites and distilling key insights from design articles.",
            tools=[
                {
                    "type": "function",
                    "function": {
                        "name": "get_inspiration",
                        "description": "Get the list of articles/inspiration for the given topic",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "topic": {
                                    "type": "string",
                                    "description": "The topic for the inspiration, e.g. bitcoin",
                                }
                            },
                            "required": ["topic"],
                        },
                    },
                }
            ],
        )

        manager.create_thread()

        # Add the message and run the assistant
        manager.add_message_to_thread(
            role="user", content=f"summarize the inspiration on this topic {instructions}?"
        )
        manager.run_assistant(instructions="Summarize the inspiration")

        # Wait for completion and process messages
        manager.wait_for_completion()

        summary = manager.get_summary()
        st.write(summary)

        # Display article summaries and corresponding images
        for article in final_inspiration:
            st.subheader("Article Summary:")
            st.write(article["summary"])

            st.subheader("Corresponding Image:")
            st.image(article["image_url"], width=400)

        # st.text("Run Steps:")
        # st.code(manager.run_steps(), line_numbers=True)


if __name__ == "__main__":
    main()
