from typing import Annotated, List
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from langchain_core.language_models import BaseLanguageModel  
from models.price_model import PriceModel
from tools.price_response import PriceResponse


class State(TypedDict):
    messages: Annotated[list, add_messages]
    final_response: PriceModel
    items_to_process: List[str]
    image_url: str
    llm: BaseLanguageModel
