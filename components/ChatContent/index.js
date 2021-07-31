import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import SocketIOClient from "socket.io-client";

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

  const router = useRouter()

  useEffect(() => {

    const { room, name } = router.query;
    setName(name);
    setRoom(room);

    if (room === '' || name === '') router.push('/')
    
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

  useEffect(() => {
    if (name !== '' && room !== '') joinRoom()
  }, [name, room])

  const joinRoom = async (e) => {
    await fetch("/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, room }),
    });
  }

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
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input sendMessage={sendMessage} setMessage={setMessage} message={message} />
      </div>
    </div>
  );
};

export default ChatContent;