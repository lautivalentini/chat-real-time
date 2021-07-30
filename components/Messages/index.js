  
import Message from "../Message";

import style from "./style.module.scss";

const Messages = ({ messages, name }) => {
  return (
    <div className={style.containerMessages}>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;