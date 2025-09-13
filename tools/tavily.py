from langchain_tavily import TavilySearch
from dotenv import load_dotenv

load_dotenv()
tavily_tool = TavilySearch(max_results=6)
