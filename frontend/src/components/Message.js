import React from "react";

function Message({ user, sender, message }) {
  return (
    <div
      className={`max-w-2xl p-4 rounded-3xl my-3 ${
        sender.id === user.id ? "ml-auto bg-blue-500" : "mr-auto bg-gray-100"
      }`}
    >
      <p>{message}</p>
    </div>
  );
}

export default Message;
