import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import {
  CameraIcon,
  PhotographIcon,
  MicrophoneIcon,
  EmojiHappyIcon,
  ChevronDoubleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useDispatch } from "react-redux";
import { closeChat, addMessage } from "../redux/actionCreators";

function ChatScreen({ chatID, messages, user, opened, user2 }) {
  const messageRef = useRef(null);
  const [wsclient, setWsClient] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const client = new WebSocket(
      "ws://" + window.location.host + "/ws/chat/" + chatID + "/"
    );
    client.removeEventListener(onmessage, receiveMessage);
    client.onmessage = receiveMessage;

    setWsClient(client);
  }, [chatID]);

  const receiveMessage = (event) => {
    console.log(event.data);
    console.log(typeof event.data);
    console.log(JSON.parse(event.data).message);
    dispatch(addMessage({ chatID, message: JSON.parse(event.data).message }));
  };

  const sendMessage = () => {
    if (messageRef.current.value !== "") {
      wsclient.send(
        JSON.stringify({
          message: messageRef.current.value,
        })
      );
      messageRef.current.value = "";
    }
  };

  const handleInputEnter = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  return (
    <div className={`flex-1 pr-4 ${!opened && "hidden"}`}>
      <div className="flex flex-col h-screen relative">
        <div className="flex items-center p-2 h-20 bg-white">
          <ArrowCircleLeftIcon
            onClick={() => dispatch(closeChat(chatID))}
            className="blueIcon ml-3"
          />
          <h1 className="mx-auto font-bold text-2xl">{user2.email}'s chat</h1>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="blueIcon" />
            <VideoCameraIcon className="blueIcon" />
            <ExclamationCircleIcon className="blueIcon" />
          </div>
        </div>
        <div className="flex-1 flex flex-col-reverse overflow-y-scroll scrollbar-hide">
          {messages.length > 0 &&
            messages.map((message) => (
              <Message
                key={message.id}
                user={user}
                sender={message.user}
                message={message.message}
              />
            ))}
        </div>
        <div className="flex h-16 items-center space-x-3 px-2">
          <div className="flex-1 flex items-center bg-gray-100 h-12 rounded-3xl px-3">
            <input
              className="outline-none bg-transparent flex-1"
              type="text"
              ref={messageRef}
              onKeyDown={handleInputEnter}
              placeholder="Type your message here"
            />
            <ChevronDoubleRightIcon
              onClick={sendMessage}
              className="blueIcon"
            />
          </div>

          <div className="flex space-x-2">
            <CameraIcon className="blueIcon" />
            <PhotographIcon className="blueIcon" />
            <MicrophoneIcon className="blueIcon" />
            <EmojiHappyIcon className="blueIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
