from langchain_core.tools import tool
from models.price_model import PriceModel

@tool
def PriceResponse(avg_low_price: float, avg_high_price: float):
    """Respond to the user with the final result(s) of the average price range"""
    return (avg_low_price+avg_high_price)/2
