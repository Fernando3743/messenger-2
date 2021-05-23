from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.db.models import Q
from django.utils import timezone
from .models import Message, User, Chat
from django.urls import reverse
from django.db import IntegrityError
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@login_required(login_url='login')
def index(request):
    return render(request, 'index.html')

@login_required(login_url='login')
def chats(request):
    user = request.user
    chats = Chat.objects.filter(Q(user1=user) | Q(user2=user)).order_by('-open_date')
    return JsonResponse( [chat.serialize() for chat in chats], safe=False)

@login_required(login_url='login')
def new_chat(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        username = body['username']
        try:
            user = User.objects.get(username=username)        
        except:
            return JsonResponse({
                'error': 'User does not exists'
            })
        chat = Chat.objects.filter(Q(user1=user) | Q(user2=user), Q(user1=request.user) | Q(user2=request.user) )
        if bool(chat):
            return JsonResponse({
                'error': 'Chat already exists'
            })
        chat = Chat(user1=request.user, user2=user)
        chat.save()
        return JsonResponse({
                'message': 'Chat created successfully'
            })
    
    return JsonResponse({
        'error': 'POST method required'
    })

@login_required(login_url='login')
def new_message(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        try:
            user_id = body['user_id']
            user = User.objects.get(pk=user_id)
            message = body['message']
            chat = Chat.objects.get(Q(user1=user) | Q(user2=user), Q(user1=request.user) | Q(user2=request.user) )
            chat.open_date = timezone.now()
            message = Message(user=request.user, message=message)
            message.save() 
            chat.messages.add(message)
            chat.save() 
        except:
            return JsonResponse({
                'error': 'Something went wrong'
            })
        return JsonResponse({
            'new_message': message.serialize()
        })
    return JsonResponse({
        'error': 'POST method required'
    })

@login_required(login_url='login')
def current_user(request):
    user = request.user
    return JsonResponse(user.serialize())

@csrf_exempt
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        body = json.loads(request.body)
        username = body["username"]
        password = body["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else: 
            return JsonResponse({
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "index.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@csrf_exempt
def register(request):
    if request.method == "POST":
        body = json.loads(request.body)
        username = body["username"]
        email = body["email"]
        image = body["image"]

        # Ensure password matches confirmation
        password = body["password"]
        confirmation = body["confirmation"]
        if password != confirmation:
            return JsonResponse({
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password, image_url=image)
            user.save()
        except IntegrityError:
            return JsonResponse({
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "index.html")