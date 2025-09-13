from pydantic import BaseModel, Field
from typing import List

class ItemModel(BaseModel):
    item: str = Field(description="Name of item")
    qty: int = Field(description="Quantity of item")

class ItemsModel(BaseModel):
    items: List[ItemModel] = Field(description="List of items with their quantity as determined")
