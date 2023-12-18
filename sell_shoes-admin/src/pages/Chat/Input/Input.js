import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { DataMessContext } from "~/pages/Chat/Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Input({ room, setSendMessage, onlineUsers }) {
  const user = useSelector((state) => state.user);
  const { setDataMess } = useContext(DataMessContext);
  console.log("user", user._id);
  console.log("room", room);
  const [data, setData] = useState({
    roomId: room.roomId,
    senderId: user._id,
    content: "",
  });
  const [dataImage, setDataImage] = useState({
    roomId: room.roomId,
    senderId: user._id,
    image: [],
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFileName(file.name);
      setDataImage({ ...dataImage, image: file });
    }
    console.log("file", file);
  };
  useEffect(() => {
    // Update roomId in dataImage when room changes
    setDataImage((prevData) => ({
      ...prevData,
      roomId: room.roomId,
    }));
  }, [room.roomId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setData({
    //   ...data,
    //   [name]: value,
    // });
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      roomId: room.roomId, // Đảm bảo cập nhật roomId từ room
    }));
  };
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      console.log("data", data);
      console.log("dataImage", dataImage);
      if (data.content !== "") {
        const respone = await axios.post(
          "http://localhost:3000/api/send/message",
          data
        );
        // socket.current.emit("send-message", data);
        setData((prevData) => ({
          ...prevData,
          content: "",
        }));
        setDataMess(respone.data);
      }
      if (dataImage.image instanceof File) {
        const formData = new FormData();
        formData.append("roomId", dataImage.roomId);
        formData.append("senderId", dataImage.senderId);
        formData.append("image", dataImage.image);
        const respone = await axios.post(
          "http://localhost:3000/api/send/message",
          formData
        );
        console.log("image", respone.data.data);
        setDataImage((prev) => ({
          ...prev,
          image: [],
        }));
        setSelectedFileName("");
        setDataMess(respone.data);
      }
    } catch (error) {
      console.log(error);
    }
    // Send message to socket server
    // const receiverId = room.messages?.find(
    //   (id) => id.senderId._id !== user._id
    // );
    // // const receiverId = room.messages.find((id) => id.senderId._id === user._id);
    // setSendMessage({ ...data, receiverId });
    const receiverUser = onlineUsers?.find((user) => user.userId !== user._id);
    // const receiverId = receiverUser ? receiverUser.userId : null;
    console.log("onlineUser", onlineUsers);
    // const receiverId = receiverUser.userId;
    const receiverId = (onlineUsers?.find(
      (user1) => user1.userId !== user._id
    )).userId;
    console.log("receiverId", receiverId);
    console.log("receiverUser", receiverUser);
    setSendMessage({ ...data, receiverId });
  };

  // return
  //   room ? (

  // <div className={cx("wrapper")}>
  //   <input
  //     className={cx("input")}
  //     name="content"
  //     value={data.content}
  //     onChange={handleChange}
  //     type="text"
  //     placeholder="Nhập nội dung"
  //   />
  //   <label htmlFor="image" className={cx("icon-with-input")}>
  //     <FontAwesomeIcon icon={faImage} />
  //     <input
  //       type="file"
  //       id="image"
  //       name="image"
  //       onChange={handleImageChange}
  //       accept="png, jpg"
  //       style={{ display: "none" }}
  //     />
  //   </label>
  //   {/* {selectedFileName && <span className={cx('selected-file-name')}>{selectedFileName}</span>} */}
  //   {selectedFileName && typeof selectedFileName === "string" && (
  //     <span className={cx("selected-file-name")}>{selectedFileName}</span>
  //   )}
  //   <div className={cx("send")}>
  //     <button className={cx("send-btn")} onClick={handleSend}>
  //       Send
  //     </button>
  //   </div>
  // </div>;
  //   )
  //   :
  //   (<></>)
  // console.log("roomtype", room.typeof);
  return (
    room?.messages && (
      <div className={cx("wrapper")}>
        <div className={cx("wrapper")}>
          <input
            className={cx("input")}
            name="content"
            value={data.content}
            onChange={handleChange}
            type="text"
            placeholder="Nhập nội dung"
          />
          <label htmlFor="image" className={cx("icon-with-input")}>
            <FontAwesomeIcon icon={faImage} />
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="png, jpg"
              style={{ display: "none" }}
            />
          </label>
          {/* {selectedFileName && <span className={cx('selected-file-name')}>{selectedFileName}</span>} */}
          {selectedFileName && typeof selectedFileName === "string" && (
            <span className={cx("selected-file-name")}>{selectedFileName}</span>
          )}
          <div className={cx("send")}>
            <button className={cx("send-btn")} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Input;
