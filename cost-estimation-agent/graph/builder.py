from langgraph.graph import StateGraph, START, END
from graph.state import State
from graph.chatbot import chatbot
from graph.route_tools import route_tools, finish
from graph.respond import respond
from graph.items import items
from tools.tool_node import BasicToolNode
from tools.tavily import tavily_tool
from tools.price_response import PriceResponse

graph_builder = StateGraph(State)
graph_builder.add_node("items", items)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("tools", BasicToolNode(tools=[tavily_tool, PriceResponse]))
graph_builder.add_node("respond", respond)


graph_builder.add_edge(START, "items")
graph_builder.add_edge("items", "chatbot")
graph_builder.add_edge("tools", "chatbot")
# graph_builder.add_edge("item_manager", "respond")

graph_builder.add_conditional_edges(
    "chatbot",
    route_tools,
    {"tools": "tools", "respond": "respond"},
)
graph_builder.add_conditional_edges("respond", finish, {"chatbot":"chatbot",END:END})

graph = graph_builder.compile()
