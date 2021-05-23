import React from "react";
import { ChatAlt2Icon } from "@heroicons/react/outline";

function Blank() {
  return (
    <div className="hidden md:flex-1 md:grid place-items-center">
      <ChatAlt2Icon className="h-60 text-gray-500" />
    </div>
  );
}

export default Blank;
