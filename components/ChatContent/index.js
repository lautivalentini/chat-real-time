import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import SocketIOClient from "socket.io-client";

import InfoBar from "../InfoBar";
import Messages from "../Messages";
import Input from "../Input";

import style from "./style.module.scss";

const ChatContent = () => {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const url = process.env.NEXT_PUBLIC_URL

  const router = useRouter()

  useEffect(() => {

    const { name = '' } = router.query;
    setName(name);

    if (name === '') router.push('/')

    const socket = SocketIOClient.connect(url, {
      path: "/api/socketio",
    })
  
    socket.on("message", (message) => {
      messages.push(message)
      setMessages([...messages]);
    });

    if (socket) return () => {
      router.push('/')
      return socket.disconnect()
    };
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });
    if (response.ok) setMessage("");
  };

  return (
    <div className={style.containerChat}>
      <div className={style.containerComponents}>
        <InfoBar />
        <Messages messages={messages} name={name} />
        <Input sendMessage={sendMessage} setMessage={setMessage} message={message} />
      </div>
    </div>
  );
};

export default ChatContent;