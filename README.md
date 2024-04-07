# Project-Draco

FASTAPI SERVER GUIDE

SET UP VIRTUAL ENVIRONMENT

1. Navigate to server-fastapi directory
   cd server-fastapi
2. create virtual environment
   python3 -m venv venv
3. activate the virtual environment
   source venv/bin/activate

INSTALL DEPENDENCIES. MAKE SURE YOU ARE IN THE VIRTUAL ENVIRONMENT [STEP 3]

1. Install fastapi
   pip install fastapi
2. Install uvicorn
   pip install uvicorn
3. install openai
   pip install openai
4. install autogen
   pip install pyautogen

RUN THE SERVER. MAKE SURE YOU ARE IN THE VIRTUAL ENVIRONMENT

1. Set up openai api key as an environment variable. reference: https://fastapi.tiangolo.com/advanced/settings/
   export OPENAI_API_KEY="<YOUR API KEY>"
2. run the python script
   uvicorn main:app --reload
