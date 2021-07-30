import React, { useState } from "react";
import Link from "next/link";

import style from "./style.module.scss";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [position, setPosition] = useState({ name: false, room: false })

  const setNameInput = (event) => {
    const value = event.target.value;
    const nameCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setName(nameCapitalized);
  };

  const setRoomInput = (event) => {
    const value = event.target.value;
    const nameCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setRoom(nameCapitalized);
  };

  return (
    <div className={style.containerLogin}>
      <div className={style.loginForm}>
        <h2>Iniciar Sesión</h2>
        <div className={style.containerInputLogin}>
          <label id="nameLabel" htmlFor="name" className={position.name ? style.top : style.bottom}>
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="nameLabel"
            onChange={(event) => setNameInput(event)}
            onFocus={(e) => setPosition({ ...position, name: true })}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setPosition({ ...position, name: true })
              } else {
                setPosition({ ...position, name: false })
              }
            }}
          />
        </div>
        <div className={style.containerInputLogin}>
          <label id="roomLabel" htmlFor="room" className={position.room ? style.top : style.bottom}>
            Sala
          </label>
          <input
            type="text"
            id="room"
            name="roomLabel"
            onChange={(event) => setRoomInput(event)}
            onFocus={(e) => setPosition({ ...position, room: true })}
            onBlur={(e) => {
              if (e.target.value !== "") {
                setPosition({ ...position, room: true })
              } else {
                setPosition({ ...position, room: false })
              }
            }}
          />
        </div>
        <Link
          onClick={(event) => (!name || !name ? event.preventDefault() : null)}
          href={`/chat?name=${name}&room=${room}`}
          passHref
        >
          <button type="submit">Unirse</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;