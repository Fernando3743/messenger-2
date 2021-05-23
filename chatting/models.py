from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import SET_NULL
from django.utils import timezone

# Create your models here.

class User(AbstractUser):
  image_url = models.CharField(max_length=500, null=True)

  def serialize(self):
    return {
      'id': self.id,
      'username': self.username,
      'email': self.email,
      'image': self.image_url
    }

class Message(models.Model):
  #The user who sent the message
  user = models.ForeignKey(User, on_delete=SET_NULL, null=True)
  message = models.CharField(max_length=500)
  created_date = models.DateTimeField(auto_now_add=True, auto_now=False)

  def serialize(self):
    return {
      'id': self.id,
      'user': self.user.serialize(),
      'message': self.message,
      'created_date': self.created_date.strftime("%b %d %Y, %I:%M %p")
    }

class Chat(models.Model):
  user1 = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="chats1", null=True)
  user2 = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="chats2", null=True)
  messages = models.ManyToManyField(Message)
  open_date = models.DateTimeField(default=timezone.now())

  def serialize(self):
    return {
      'id': self.id,
      'user1': self.user1.serialize(),
      'user2': self.user2.serialize(),
      'messages': [message.serialize() for message in self.messages.order_by('-created_date').all()],
      'open_date': self.open_date.strftime("%b %d %Y, %I:%M %p"),
    }


