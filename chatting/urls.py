from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    #API
    path("chats", views.chats, name="chats"),
    path("user", views.current_user, name="user"),
    path("new_chat", views.new_chat, name="new_chat"),
    path("new_message", views.new_message, name="new_message")
]