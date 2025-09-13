import vertexai
from vertexai import agent_engines
import os
import vertexai
from dotenv import load_dotenv
from vertexai import agent_engines
from graph.builder import graph
from langchain.chat_models import init_chat_model
# from tools.tavily import tavily_tool
# from tools.price_response import PriceResponse

load_dotenv()

def langgraph_builder(*, model, **kwargs):
    return graph

agent = agent_engines.LanggraphAgent(
    model="gemini-2.5-flash",
    runnable_builder=langgraph_builder,
)
# response = agent.query(input={"image_url": "https://media.istockphoto.com/id/1329884032/photo/various-plumbing-spare-parts-sealing-tape-and-adjustable-wrench-on-rustic-wooden-background.jpg?s=170667a&w=0&k=20&c=LmzjEzf2VKr2rah4q89nuUQymWASMDHYmiU_1GHwxQo="})
#
# print(response['final_response'])

vertexai.init(
    project=os.environ.get("VERTEX_PROJECT_ID"),
    location=os.environ.get("VERTEX_LOCATION"),
    staging_bucket=os.environ.get("VERTEX_STAGING_BUCKET")
)

remote_app = agent_engines.create(
    agent_engine=agent,
    requirements=[
        # "google-cloud-aiplatform[agent_engines, langgraph, langchain]",
        "dotenv",
        "langchain",
        "langchain-google-genai",
        "langchain-google-vertexai",
        "langchain-tavily",
        "langgraph",
        "pillow",
        "vertexai",
        "google-adk",
    ],
    extra_packages = ["graph", "models", "tools"],
    env_vars = {
        "TAVILY_API_KEY": os.environ.get("TAVILY_API_KEY"),
        "GOOGLE_API_KEY": os.environ.get("GOOGLE_API_KEY")
    }
)

print(remote_app.resource_name)
