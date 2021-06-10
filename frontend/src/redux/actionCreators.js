import {
  ADD_CHATS,
  ADD_USER,
  OPEN_CHAT,
  CLOSE_CHAT,
  ADD_MESSAGE,
  NEW_CHAT,
} from "./actionTypes";

export function addChats(chats) {
  return {
    type: ADD_CHATS,
    payload: chats.map((chat) => ({ ...chat, open: false })),
  };
}

export function addUser(user) {
  return { type: ADD_USER, payload: user };
}

export const openChat = (id) => ({
  type: OPEN_CHAT,
  payload: id,
});
export const closeChat = (id) => ({
  type: CLOSE_CHAT,
  payload: id,
});
export const addMessage = ({ chatID, message }) => ({
  type: ADD_MESSAGE,
  payload: { chatID, message },
});
export const newChat = (chat) => ({
  type: NEW_CHAT,
  payload: chat,
});
