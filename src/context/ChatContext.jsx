import React, { createContext, useContext, useReducer } from "react";
import { useAuth } from "./UserContext";

const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
  const { user } = useAuth();

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
        };
      case "CLOSE_CHAT":
        return {
          user: {},
          chatId: "null",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => useContext(ChatContext);

export { ChatContextProvider, useChat };
