import openai
from dotenv import find_dotenv, load_dotenv

load_dotenv()

client = openai.OpenAI()
model = "gpt-3.5-turbo-16k"

# === Create our assistant ===
architect_assistant = client.beta.assistants.create(
    name="Architect Assistant",
    instructions="You are an Architect Assistant designed to assist architects with various tasks related to building design and construction.",
    model=model
)
archi_assistant_id = architect_assistant.id
print(archi_assistant_id)

# === Thread ===
thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "Can you help me brainstorm ideas for the facade design of our new commercial building project?"
        }
    ]
)
thread_id = thread.id
print(thread_id)
