import { PlusCircleIcon, SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { getCookie } from "../util/cookies";
import Chat from "./Chat";
import { newChat } from "../redux/actionCreators";
import { useDispatch } from "react-redux";

function Sidebar({ chats, user, openedChat }) {
  const dispatch = useDispatch();

  const handleAddChat = async () => {
    const username = prompt("Write user's username you wanna chat with");

    const csrftoken = getCookie("csrftoken");

    const request = new Request("/new_chat", {
      headers: { "X-CSRFToken": csrftoken },
    });

    await fetch(request, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) alert(response.error);
        else {
          console.log(response.message);
          dispatch(newChat(response.chat));
        }
      });
  };

  return (
    <div
      className={`px-4 ${
        openedChat ? "hidden" : "flex"
      } md:flex flex-col w-full md:max-w-[400px] lg:min-w-[500px] h-screen`}
    >
      <div className="flex justify-between p-2 rounded-b-2xl h-20 items-center">
        <a href="/logout">
          <img
            src={user?.image}
            alt="User's profile"
            className="h-14 w-14 rounded-full object-cover"
          />
        </a>
        <h1 className="font-bold text-2xl">{user?.email}</h1>
        <PlusCircleIcon onClick={handleAddChat} className="blueIcon" />
      </div>
      <div className="flex items-center mt-2 p-2 h-15 shadow-lg rounded-xl w-full space-x-2">
        <SearchIcon className="h-6 text-gray-400" />
        <input
          placeholder="Search Messages"
          type="text"
          className="h-8 w-full outline-none text-lg"
        />
      </div>
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {chats.length > 0 &&
          Object.keys(user) &&
          chats.map((chat) => {
            //User2 data
            const { username, image } =
              chat.user1.id === user.id ? chat.user2 : chat.user1;
            const message = chat.messages[0]?.message || null;
            return (
              <Chat
                key={chat.id}
                id={chat.id}
                username={username}
                image={image}
                message={message}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Sidebar;
