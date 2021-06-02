import { useDispatch, useSelector } from "react-redux";
import Blank from "./components/Blank";
import ChatScreen from "./components/ChatScreen";
import Sidebar from "./components/Sidebar";
import { addChats, addUser } from "./redux/actionCreators";
import { useEffect } from "react";

function App() {
  const chats = useSelector((state) => state.chats);
  const user = useSelector((state) => state.user);
  const openedChat = useSelector((state) =>
    Boolean(state.chats.filter((chat) => chat.open).length)
  );

  const dispatch = useDispatch();
  console.log(openedChat);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/chats`)
      .then((res) => res.json())
      .then((chats) => {
        dispatch(addChats(chats));
      });

    fetch(`${process.env.REACT_APP_API_URL}/user`)
      .then((res) => res.json())
      .then((user) => {
        dispatch(addUser(user));
      });
    console.log("Calling use effect");
  }, []);

  return (
    <div className="flex">
      <Sidebar openedChat={openedChat} user={user} chats={chats} />

      {Boolean(chats?.length) &&
        chats.map((chat) => {
          const user2 = chat.user1.id === user.id ? chat.user2 : chat.user1;
          return (
            <ChatScreen
              chatID={chat.id}
              opened={chat.open}
              user={user}
              user2={user2}
              messages={chat.messages}
            />
          );
        })}
      {!openedChat && <Blank />}
    </div>
  );
}

export default App;
