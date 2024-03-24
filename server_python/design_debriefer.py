import os
from dotenv import load_dotenv
import openai
import requests
import json

import time
import logging
from datetime import datetime
import streamlit as st


load_dotenv()

client = openai.OpenAI()

model = "gpt-4-1106-preview"  # "gpt-3.5-turbo-16k"


# Step 1: Upload file to OpenAI embeddings

filepath = "./designbrief.pdf"
file_object = client.files.create(
    file=open(filepath, "rb"), purpose="assistants")


# Step 2: Create an assistant
