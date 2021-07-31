
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'

import style from "./style.module.scss";

const InfoBar = () => {
  return (
    <div className={style.topInfoChat}>
      <div className={style.containerLeft}>
        <FontAwesomeIcon className={style.iconOnline} icon={faCircle} />
        <h3>Online</h3>
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