# Realtime Chat App

Realtime chat app inspired in facebook's messenger, made using Djando channels, Web Sockets in the backend and ReactJS + TailwindCSS in the frontend.

## Usage 🚀

Clone this projects, install the requirements.txt and run the project in a docker container using 
redis.


### Installation and running 🔧

Run the requirements.txt file or install Django channels and Django channels_redis

```
python -m pip install -U channels
$ python3 -m pip install channels_redis
$ docker run -p 6379:6379 -d redis:5
$ python3 manage.py runserver
```

_You also need to install Docker to run the app using redis_


## Made using 🛠️

_Frameworks / Libraries_

* [Django](https://www.djangoproject.com/) - As the backend
* [Django Channels](https://channels.readthedocs.io/en/stable/) - As ws (WebSocket) support
* [ReactJS](https://es.reactjs.org/) - As the frontend
* [TailwindCSS](https://tailwindcss.com/) - As the styling framework
* [HeroIcons](https://heroicons.com/) - As the icons support.

## Project Requirements 📚

_Project made using all the concepts taught in the course, using Django Models for storing and retrieving data like the user's usernames, emails, images, chats, messages, etc. Django views and urls for managin and developing APIS. React components, hooks and state to fetch and display the Django backend data_

### Realtime connections 💻

_I used Django channels to set up ws:// connections between the user's, when a user logs in, react connect this user to multiple Django channels rooms using the chat's id the current users is involved in (When the user write's to a user for the first time, Django creates a new Chat models object with a unique id, which will be used latter for setting up the realtime connection.)_

### Folder's content 📁

* chatting:

_It's the main app folder, contains the views, urls and models files, also contains a consumers.py and routing.py files that are used for Django channels ws:// realtime connections._

* frontend:

_Contains all the ReactJS files used in the frontend development, the node modules were installed using yarn, so all you need to do is run 'yarn' or 'npm i' to install all the node modules used in the project. **However** this folder already contains a **build** folder ready for Django to use._

* project5:

_It's the main project folder, which contains the setting.py file_




---
⌨️ made with ❤️ by [Fernando3743](https://github.com/Fernando3743) 😊
