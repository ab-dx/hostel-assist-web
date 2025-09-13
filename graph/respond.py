from graph.state import State
from models.price_model import PriceModel
from langchain.chat_models import init_chat_model
from typing import List
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

class PriceModelList(BaseModel):
    price_models: List[PriceModel] = Field(description="List of price models for each item")

llm = init_chat_model("google_genai:gemini-2.5-flash")
llm_with_structured_output = llm.with_structured_output(PriceModelList)

def respond(state: State):
    print("FINAL ANS DETERMINED\n\n\n")
    print(state['messages'][-1].content)
    response = llm_with_structured_output.invoke([(f"Find final determined average price/price range from the following context: {state['messages'][-1].content}")])
    state["final_response"] = response
    return {"final_response": response.dict() }
