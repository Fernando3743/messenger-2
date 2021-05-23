import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone
from .models import Chat, User, Message
from asgiref.sync import sync_to_async

@sync_to_async
def add_message(self, message, chat_id):
  new_message = Message.objects.create(user= self.scope['user'], message=message)
  new_message.save()
  chat = Chat.objects.get(pk=chat_id)
  chat.messages.add(new_message)
  chat.open_date = timezone.now()
  chat.save()
  return new_message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        chat_id = int(self.room_name)
        new_message = await add_message(self, message, chat_id)
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': new_message.serialize()
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))