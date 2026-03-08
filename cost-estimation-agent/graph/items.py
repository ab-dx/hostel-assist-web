from langchain.chat_models import init_chat_model
from models.item import ItemsModel
from graph.state import State
from dotenv import load_dotenv

load_dotenv()

llm = init_chat_model("google_genai:gemini-2.5-flash")
llm_with_structured_output = llm.with_structured_output(ItemsModel)

def items(state: State):
    message = {
        "role": "user",
        "content": [
            {"type": "text", "text": "Identify all the parts in this image for the estimation of their cost, if similar items as a whole or certain subgroupings can be categorised as a single item under which their price can be determined, then return that subgroup as a single grouping of item. All names returned must be non-ambiguous and sufficient to determine prices from online"},
            # {"type": "image", "source_type": "url", "url": state["image_url"]},
            {"type": "image_url", "image_url": {"url":state["image_url"]}},
        ],
    }
    items = llm_with_structured_output.invoke([message])
    print(items)
    return {"items_to_process": items}
