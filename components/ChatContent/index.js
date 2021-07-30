import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import io from "socket.io-client";

import InfoBar from "../InfoBar";
import Messages from "../Messages";
import Input from "../Input";

import style from "./style.module.scss";

const ChatContent = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const url = process.env.NEXT_PUBLIC_URL
  const socket = io(url);

  const router = useRouter()

  useEffect(() => {
    const { room, name } = router.query;
    setName(name);
    setRoom(room);
    
    socket.emit("join", { name, room }, () => {});
    
    return () => {
      socket.emit("off");
      socket.off();
      router.push('/')
    };

  }, [router.query]);
  
  useEffect(() => {
    socket.on(
      "message",
      (message) => {
        console.log(message)
        setMessages(message)
      },
      [messages]
    );
  });

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, name, () => {
        setMessage("");
      });
    }
  };

  return (
    <div className={style.containerChat}>
      {room && name !== '' && (
        <div className={style.containerComponents}>
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input sendMessage={sendMessage} setMessage={setMessage} message={message} />
      </div>
      )}
    </div>
  );
};

export default ChatContent;