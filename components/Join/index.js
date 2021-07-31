import React, { useState } from "react";
import Link from "next/link";

import style from "./style.module.scss";

const Join = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState({ name: false, room: false })

  const setNameInput = (e) => {
    const value = e.target.value;
    const nameCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setName(nameCapitalized);
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
            onChange={(e) => setNameInput(e)}
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
        <Link
          onClick={(e) => (!name || !name ? e.preventDefault() : null)}
          href={`/chat?name=${name}`}
          passHref
        >
          <button type="submit">Unirse</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;