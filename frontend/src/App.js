import { useEffect, useState } from "react";
import Blank from "./components/Blank";
import ChatScreen from "./components/ChatScreen";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState({});
  const [user2, setUser2] = useState({});
  const [chats, setChats] = useState([]);
  const [openedChat, setOpenedChat] = useState({});

  useEffect(() => {
    //Fetching the logged user
    fetch("/user")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setUser(response);
      });
    //Fetching the chats
    fetch("/chats")
      .then((res) => res.json())
      .then((response) => {
        setChats(response);
      });
  }, []);

  const fetchChats = async () => {
    fetch("/chats")
      .then((res) => res.json())
      .then((response) => {
        setChats(response);
      });
  };

  const openChat = (id) => {
    let chat = {};
    setOpenedChat(chat);
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].user1.id === id || chats[i].user2.id === id) {
        chat = chats[i];
        break;
      }
    }
    const tempUser2 = chat.user1.id === user.id ? chat.user2 : chat.user1;
    setUser2(tempUser2);
    setOpenedChat(chat);
  };

  return (
    <div className="flex">
      <Sidebar
        fetchChats={fetchChats}
        openedChat={Boolean(Object.keys(openedChat).length)}
        user={user}
        chats={chats}
        openChat={openChat}
      />
      {Object.keys(openedChat).length ? (
        chats.map((chat) => {
          const opened = openedChat.id === chat.id;
          return (
            <ChatScreen
              setOpenedChat={setOpenedChat}
              fetchChats={fetchChats}
              opened={opened}
              chatID={chat.id}
              user={user}
              user2={user2}
              messages={chat.messages}
            />
          );
        })
      ) : (
        <Blank />
      )}
    </div>
  );
}

export default App;
