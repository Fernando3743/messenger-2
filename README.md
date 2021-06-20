# Distinctiveness and Complexity 📚💻
This project uses all the concepts taught in the course, uses Django as the backend and ReactJS + Redux + TailwindCSS in the frontend.
This project differs from all the projects seen in the course, because it uses not only http:// connections for the django API's, but it also uses ws:// protocol (WebSockets) for bidirectional connection in realtime chats, also uses Redux in the frontend which increases the complexity of the project, but provides better performance in chats state management, and last but not least this project uses TailwindCSS whose utility-first classes give a responsive design to the project.

## Usage 🚀

Clone this projects, install the requirements.txt and run the project in a docker container using 
redis.


### Installation and running 🔧

Run the requirements.txt file or install Django channels and Django channels_redis.

```
python -m pip install -U channels
$ python3 -m pip install channels_redis
$ docker run -p 6379:6379 -d redis:5
$ python3 manage.py runserver
```

_You also need to install Docker to run the app using redis._


## Made using 🛠️

_Frameworks / Libraries_

* [Django](https://www.djangoproject.com/) - As the backend.
* [Django Channels](https://channels.readthedocs.io/en/stable/) - As ws (WebSocket) support.
* [ReactJS](https://es.reactjs.org/) - As the frontend.
* [TailwindCSS](https://tailwindcss.com/) - As the styling framework.
* [HeroIcons](https://heroicons.com/) - As the icons support.
* [Redux](https://react-redux.js.org/) - As the app state manager.

## Project Requirements 📚

_Project made using all the concepts taught in the course, using Django Models for storing and retrieving data like the user's usernames, emails, images, chats, messages, etc. Django views and urls for managin and developing APIS. React components, hooks and state to fetch and display the Django backend data._

### Realtime connections 💻

_I used Django channels to set up ws:// connections between the user's, when a user logs in, react connect this user to multiple Django channels rooms using the chat's id the current users is involved in (When the user write's to a user for the first time, Django creates a new Chat models object with a unique id, which will be used latter for setting up the realtime connection)._

## Folder's content 📁

### chatting: 📁

* migrations: 📁
  _Python default migration files._

* consumers.py: 📄

  - (function) add_message(message,chat_id):
    _Python function that handles sending messages events, this function receives as a parameter the message's body and the chat's id, It uses this data to add the message to the database and updates the chat's open date to an updated one._

  - (class) ChatConsumer:
  _Python class that works as a Django Channels consumer, this class handles connect, disconnect, receiving messages and dispatching messages events._

* admin.py: 📄
  _Contains the Django admin's page configuration._

* models.py: 📄
  _This file defines the Django database tables schema, 4 tables are used, these are:_

    - User table
      _This table inherits from AbstractUser class and addes a new file for handling user's profile image._

    - Message table
      _This table contains a user foreing key (The user who wrote the message), message and date fields._

    - Chat table
      _This table contains 2 user foreing keys, a message many to many field and a open_date field._

_Each table contains a serialize function for handling data serialization._

* routing.py: 📄
  _Contains web sockets url path handling._

* urls.py: 📄
  _Contains https and API url path handling._

* views.py: 📄
  _Contains the project's controllers, handles the API requests to log in, register and logout users, and the others GET and POST requests.

### frontend: 📁

* build 📁
  _React production folder created using npm build._

* node_modules 📁
  _Default node folder which contains all the project's dependencies._

* public 📁
  _Contains static files like the index.html template, icons and images._

* src 📁
  - components 📁
    _Contains the projects react components, which are:_
      - Blank.js (Blank component for handling a chat's closing)
      - Chat.js
      - ChatScreen.js
      - Message.js
      - Sidebar.js

- images 📁
  _Folder which contains the project's assets._

- redux 📁
  - actionCreator.js 📄
    _Handles the redux actions._

  - actionTypes.js 📄
    _Js file which contains all the redux action types used in the proyect, in string format._

  - reducers.js 📄
    _Contains the redux store reducers, 2 reducers are used in the project, one for handling the logged user's data and other one for handling the user chat's messages._

  - store.js 📄
    _Js file which contains the redux store definition, redux-thunk and chrome development tools are added to the redux store in this file._

  _Redux's folder contains all the ReactJS files used in the frontend development, the node modules were installed using yarn, so all you need to do is run 'yarn' or 'npm i' to install all the node modules used in the project. **However** this folder already contains a **build** folder ready for Django to use._

* util 📁
  - cookies.js 📄
     _Js file that contains a getCookie function for handling Django csfr_token and logged user's data._

  - App.js 📄
     _React screen component that handles the project's home page._

  - index.css 📄
    _CSS stylesheet main component, this one contains Tailwind config and some personalized classes._

  - index.js 📄
    _React main file which injects react components to the html template._

  - Login.js 📄
    _React screen component that handles the login page._

   - Main.js 📄
     _This file handles the projects routes using react-router-dom._

   - Register.js 📄
     _React screen component which handles the register page._

### project5: 📁

_It's the main project folder, which contains the setting.py file, some aditional configuration were added for handling Django channels._




---
⌨️ made with ❤️ by [Fernando3743](https://github.com/Fernando3743) 😊
