import style from "./style.module.scss";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className={style.sentText}>
      <p className={style.nameSentMessage}>{trimmedName}</p>
      <div className={style.messageBox}>
        <p>{text}</p>
      </div>
    </div>
  ) : (
    <div className={style.messageCurrentUser}>
      <div className={style.messageWelcome}>
        <p>{text}</p>
      </div>
      <p className={style.userName}>{user}</p>
    </div>
  );
};

export default Message;