import React from "react";
import { useDispatch } from "react-redux";
import { openChat } from "../redux/actionCreators";

function Chat({ username, image, message, id }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(openChat(id))}
      className="flex items-center space-x-3 p-1 my-4 transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer"
    >
      <img
        className="h-16 w-16 rounded-full object-cover"
        src={image}
        alt="Profile Pic"
      />
      <div className="truncate overflow-hidden">
        <h1 className="font-bold text-xl">{username}</h1>
        <p className="text-lg text-gray-500 truncate">{message}</p>
      </div>
    </div>
  );
}

export default Chat;
