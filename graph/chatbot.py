from langchain.chat_models import init_chat_model
from graph.state import State
from dotenv import load_dotenv

load_dotenv()

llm = init_chat_model("google_genai:gemini-2.5-flash")

def chatbot(state: State):
    return {"messages":[llm.invoke([("human",f"Determine the average price (or range) for each of the following items in INR: {state['items_to_process']}. You may use tools to research. Do not return a total, but only your answer for each of the items. Respond when done")])]}
    # return {"messages": [llm.invoke(state["messages"])]}
