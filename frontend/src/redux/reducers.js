import { combineReducers } from "redux";
import {
  ADD_CHATS,
  ADD_USER,
  OPEN_CHAT,
  CLOSE_CHAT,
  ADD_MESSAGE,
} from "./actionTypes";

export const chatsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_CHATS:
      return action.payload;
    case OPEN_CHAT:
      return state.map((chat) =>
        chat.id === action.payload
          ? { ...chat, open: true }
          : { ...chat, open: false }
      );
    case CLOSE_CHAT:
      return state.map((chat) =>
        chat.id === action.payload ? { ...chat, open: false } : chat
      );
    case ADD_MESSAGE:
      const tempChats = state.filter(
        (chat) => chat.id !== action.payload.chatID
      );
      const oudatedChat = state.filter(
        (chat) => chat.id === action.payload.chatID
      )[0];
      const updatedChat = {
        ...oudatedChat,
        messages: [action.payload.message, ...oudatedChat.messages],
      };
      return [updatedChat, ...tempChats];
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  user: userReducer,
  chats: chatsReducer,
});

export default reducer;
