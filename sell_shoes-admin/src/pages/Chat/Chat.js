import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import ListChat from "./ListChat";
import Content from "./Content";
import Input from "./Input";
import Search from "~/layouts/components/Search";
import { useState, createContext } from "react";

export const IdRoomContext = createContext();
export const NameRoomContext = createContext();
export const DataMessContext = createContext();
export const ReceivedContext = createContext();
export const UserOnlineContext = createContext();

const cx = classNames.bind(styles);
function Chat() {
  const [idRoom, setIdRoom] = useState(0);
  const [nameRoom, setNameRoom] = useState("");
  const [dataMess, setDataMess] = useState([]);
  const [received, setReceived] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  return (
    <IdRoomContext.Provider value={{ idRoom, setIdRoom }}>
      <NameRoomContext.Provider value={{ nameRoom, setNameRoom }}>
        <DataMessContext.Provider value={{ dataMess, setDataMess }}>
          <ReceivedContext.Provider value={{ received, setReceived }}>
            <div className={cx("wrapper")}>
              <nav className={cx("navbar")}>
                <div className={cx("search")}>
                  <Search />
                </div>
                <div className={cx("list")}>
                  <ListChat onlineUser={onlineUser} />
                </div>
              </nav>
              <div className={cx("body")}>
                <div className={cx("content")}>
                  <Content setOnlineUser={setOnlineUser} />
                </div>
                {/* <div className={cx("action")}>
            <Input />
          </div> */}
              </div>
            </div>
          </ReceivedContext.Provider>
        </DataMessContext.Provider>
      </NameRoomContext.Provider>
    </IdRoomContext.Provider>
  );
}

export default Chat;
