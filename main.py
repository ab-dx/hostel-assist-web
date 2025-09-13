from dotenv import load_dotenv
load_dotenv()
from graph.builder import graph

from PIL import Image
import base64
from io import BytesIO


img = Image.open('./items.png')
buffered = BytesIO()
img.save(buffered, format="PNG")
img_data = base64.b64encode(buffered.getvalue()).decode('utf-8')
img_data = f"data:image/png;base64,{img_data}"

def main():
    # while True:
    #         # user_input = input("User: ")
    #         user_input = "Respond once you have figured out the average price (rnage) of a seiko 5"
    #         if user_input.lower() in ["quit", "exit", "q"]:
    #             print("Goodbye!")
    #             break
    #         stream_graph_updates(user_input)
    ans = graph.invoke({"image_url": "https://media.istockphoto.com/id/1329884032/photo/various-plumbing-spare-parts-sealing-tape-and-adjustable-wrench-on-rustic-wooden-background.jpg?s=170667a&w=0&k=20&c=LmzjEzf2VKr2rah4q89nuUQymWASMDHYmiU_1GHwxQo="})
    print(ans["final_response"])

if __name__ == "__main__":
    main()
