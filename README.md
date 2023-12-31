# UVANews-Chatbot

Full stack web application for a document retrieval augemented chatbot. I didn't want to spend money on a cloud service provider so I am running the LLM on UVA's GPU server, so in order to run this repository you unfortunately need to be a UVA computing student. The server code can be found here: https://github.com/puschb/UVANews-Chatbot-Server. Since this chatbot is augmented using UVANews I also had to create an unnoficial api for UVANews, which I published as a pypi package and can also be found here: https://github.com/puschb/UVA-news-api-library.

## How it works
1. User provides a prompt
2. Through an api request, the prompt is then fed to the local server
3. The local server ssh tunnels to the UVA gpu server (I couldn't find another way to do this) and executes the query_vector_store.py file through the command line
4. The embedding model (all-mpnet-base-v2) emebeds the input text, which is then fed to the Faiss vector store (stored on the UVA server) which uses cosine similarity to find the 2 "nearest" chunks of text. These texts being all of the news articles from UVANews.
5. These chunks are fed into the langauge model (stablelm-tuned-alpha-3b) as context in addition to the input query, which then synthesizes a response.
6. The response is printed to the server's terminal, which the local server also recieves. This response is then sent to the front end and displayed

Additionally, since there are constantly new news articles being published, I created a feature to update the vector database so that the information the chat bot has access to is always up to date. This works as follows:
1. the user presses update
2. The local server ssh tunnels to the UVA gpu server and runs the update_vector_store.py file
3. The server checks for the most recent article it has stored, and then uses the UVANews API that I built to get any missing articles
4. These articles are chunked into a size that the embedding model can handle and are then embedded and stored in the vector database

## In action:

<img width="1279" alt="UVAAiChatbot-ex2" src="https://github.com/puschb/UVANews-Chatbot/assets/94179760/7d28ea6d-81f5-431b-a074-82b12d03445d">
<img width="1277" alt="UVAAiChatbot-ex3" src="https://github.com/puschb/UVANews-Chatbot/assets/94179760/315f6dc6-34a7-4867-84aa-ec2dcc591e3b">
