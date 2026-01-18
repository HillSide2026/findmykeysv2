from openai import OpenAI
import os
from dotenv import load_dotenv
from ..utils import generate_presigned_url

load_dotenv()
API_KEY = os.getenv('API_KEY')
client = OpenAI(api_key=API_KEY)

def get_directions(image_url: str, command: str, object_list: list[str]) -> str:
    """
    Retrieve directional guidance for a specified object within an image using the OpenAI API.

    This function sends an image and an object name to the OpenAI API to get a brief, relative position
    of the specified object in relation to others in the image.

    @param image_url: URL of the image in which to locate the object.
    @param command: Command to locate an object in the image
    @param object_list: List of objects associated with the user

    @return: A string containing the relative position of the object if successful, or an error message if a problem occurs.
    """
    
    try:
        # Create the system message
        system_message = {
            "role": "system",
            "content": "You are an assistant for locating misplaced personal belongings by responding to voice commands. "
                       "You will provide directions and guidance based on the user's surroundings as shown through their phone camera image." 
                       "Your directions should tell them where their object is relative to other objects in the image. You should also answer any other commands or questions related to this."
                       "Please respond in a natural way, as all of your responses will be spoken with text-to-speech. Do not respond with with anything that cannot be spoken aloud."
                       "When referencing the objects, use the name and type appropriately. For example, 'The keys' or 'Your red wallet'."
                       "Never tell the user to just simply 'look for their object' or 'search for it'. Always provide a specific direction or location. If you can't provide one, let the user know."
        }

        # Create the user messages
        user_messages = [
            {
                "role": "user",
                "content": f"Here are the objects I have saved: {', '.join(object_list)}."
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": f"Here are my surroundings. {command}"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": generate_presigned_url(image_url),
                        },
                    },
                ],
            }
        ]

        # Combine messages
        messages = [system_message] + user_messages

        # Call the OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
        )
        
        return response.choices[0].message.content
    except Exception as e:
        return f"Error occurred: {str(e)}"
