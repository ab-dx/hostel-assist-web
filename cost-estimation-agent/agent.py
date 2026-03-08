import vertexai
from dotenv import load_dotenv
from vertexai import agent_engines
from graph.builder import graph
from langchain.chat_models import init_chat_model
from tools.tavily import tavily_tool
from tools.price_response import PriceResponse

load_dotenv()

def langgraph_builder(*, model, **kwargs):
    return graph

agent = agent_engines.LanggraphAgent(
    model="gemini-2.5-flash",
    runnable_builder=langgraph_builder,
    tools=[tavily_tool, PriceResponse],
)

# Example query
# response = agent.query(input={"role": "user", "content": "scrum methodology"})
# response = agent.query(input={"image_url": "https://media.istockphoto.com/id/1329884032/photo/various-plumbing-spare-parts-sealing-tape-and-adjustable-wrench-on-rustic-wooden-background.jpg?s=170667a&w=0&k=20&c=LmzjEzf2VKr2rah4q89nuUQymWASMDHYmiU_1GHwxQo="})
#
# print(response['final_response'])
