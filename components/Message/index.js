import style from "./style.module.scss";

const Message = ({ message: { user, text }, name }) => {
  const isSentByCurrentUser = Boolean(user === name);

  if (isSentByCurrentUser) {
    return (
      <div className={style.sentText}>
        <p className={style.nameSentMessage}>{name}</p>
        <div className={style.messageBox}>
          <p>{text}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className={style.messageCurrentUser}>
        <div className={style.messageWelcome}>
          <p>{text}</p>
        </div>
        <p className={style.userName}>{user}</p>
      </div>
    )
  }
};

export default Message;