import classNames from "classnames/bind";
import styles from "./Content.module.scss";
import axios from "axios";
import Message from "./Message";
import { useEffect, useState, useRef, useContext } from "react";
import Input from "../Input";
import { io } from "socket.io-client";
import {
  IdRoomContext,
  DataMessContext,
  NameRoomContext,
  ReceivedContext,
} from "~/pages/Chat/Chat";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
function Content({ setOnlineUser }) {
  const user = useSelector((state) => state.user);

  const { idRoom } = useContext(IdRoomContext);
  const { nameRoom } = useContext(NameRoomContext);
  const { dataMess } = useContext(DataMessContext);
  const { setReceived } = useContext(ReceivedContext);
  const [data, setData] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();
  const [expandedImage, setExpandedImage] = useState(null);
  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  // Thêm hàm để đóng ảnh phóng to
  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-add-user", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      setOnlineUser(users);
    });
    // Lắng nghe tin nhắn mới từ server và cập nhật state
    // socket.current.on("recieve-message", (newMessage) => {
    //   setData((prevData) => ({
    //     ...prevData,
    //     messages: [...prevData.messages, newMessage],
    //   }));
    // });
    // console.log("123");
    // socket.current.on("recieve-message", (data) => {
    //   console.log("data1", data);
    //   setReceivedMessage(data);
    // });
    // return () => {
    //   socket.current.disconnect(); // Disconnect the socket when the component unmounts
    // };
  }, [user, idRoom]);
  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log("data1", data);
      setReceivedMessage(data);
      setReceived(data);
    });
  }, [sendMessage, user, idRoom]);
  useEffect(() => {
    // if (receivedMessage !== null && receivedMessage.chatId === data.roomId) {
    if (receivedMessage !== null && receivedMessage.roomId === data.roomId) {
      // setData([...data, receivedMessage]);
      setData((prevData) => ({
        ...prevData,
        messages: [...prevData.messages, receivedMessage],
      }));
    }
  }, [receivedMessage]);
  console.log("reciev", receivedMessage);
  console.log("dataaa", data);

  console.log("idRoom", idRoom);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/message/${idRoom}`)
      .then((res) => {
        setData(res.data.data);
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idRoom, dataMess, receivedMessage]);
  const renderExpandedImage = () => {
    if (expandedImage) {
      return (
        <div
          className={cx("expanded-image-overlay")}
          onClick={closeExpandedImage}
        >
          <img
            className={cx("expanded-image")}
            src={expandedImage}
            alt="hinhanh"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }} // Ngăn chặn sự kiện nhấp vào overlay từ lan ra
          />
        </div>
      );
    }
    return null;
  };
  console.log("userOnline", onlineUsers);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h3 className={cx("name")}>{nameRoom}</h3>
      </div>
      <div className={cx("content")}>
        {Array.isArray(data.messages) && data.messages.length > 0 ? (
          // data.messages
          //   .slice()
          //   .reverse()
          //   .map((mes, index) => <Message key={index} mes={mes} />)
          [...data.messages]
            .reverse()
            .map((mes, index) => (
              <Message
                key={index}
                mes={mes}
                receivedMessage={receivedMessage}
                setSendMessage={setSendMessage}
                handleImageClick={handleImageClick}
              />
            ))
        ) : (
          <></>
        )}
      </div>
      <div className={cx("action")}>
        <Input
          room={data}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          onlineUsers={onlineUsers}
        />
      </div>
      {renderExpandedImage()}
    </div>
  );
}

export default Content;
