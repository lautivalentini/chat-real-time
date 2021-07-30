
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'

import style from "./style.module.scss";

const InfoBar = ({ room }) => {
  const nameCapitalized = room.charAt(0).toUpperCase() + room.slice(1);
  return (
    <div className={style.topInfoChat}>
      <div className={style.containerLeft}>
        <FontAwesomeIcon className={style.iconOnline} icon={faCircle} />
        <h3>{nameCapitalized}</h3>
      </div>
      <div>
        <Link href="/" passHref>
          <FontAwesomeIcon className={style.iconClose} icon={faTimes} />
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;