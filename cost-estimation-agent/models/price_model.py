from pydantic import BaseModel, Field

class PriceModel(BaseModel):
    item: str = Field(description="Name of item")
    average: float = Field(description="Average price of item")
    average_low: float = Field(description="Average lower bound of price of item")
    average_high: float = Field(description="Average higher bound of price of item")
    lowest: float = Field(description="Lowest price of item")
    highest: float = Field(description="Highest price of item")
