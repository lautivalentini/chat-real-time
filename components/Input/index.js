import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import io from "socket.io-client";

import style from "./style.module.scss";

const Input = ({ sendMessage, setMessage, message }) => {
    return (
    <form className={style.formInputSent}>
      <input
        type="text"
        placeholder="Escribe un mensaje aquí"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) =>
          e.key === "Enter" ? sendMessage(e) : null
        }
      />
      <button onClick={(e) => sendMessage(e)}>
        <p className={style.iconSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </p>
      </button>
    </form>
  );
};

export default Input;