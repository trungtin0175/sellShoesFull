import classNames from "classnames/bind";
import styles from "./Message.module.scss";
import images from "~/assets/img";
import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { faL } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Message({ mes, handleImageClick }) {
  const user = useSelector((state) => state.user);
  const [owner, setOwner] = useState(user._id === mes.senderId._id);
  // const [isImageExpanded, setIsImageExpanded] = useState(false);
  const formattedTime = format(new Date(mes.createdAt));

  // console.log("mes", mes);
  // const handleImageClick = () => {
  //   setIsImageExpanded(!isImageExpanded);
  // };
  // const imageClassName = cx("message-content-image", {
  //   "expanded-image": isImageExpanded,
  // });

  // // Thêm một overlay/modal để hiển thị ảnh phóng to
  // const renderExpandedImage = () => {
  //   if (isImageExpanded) {
  //     return (
  //       <div className={cx("expanded-image-overlay")}>
  //         <img
  //           className={cx("expanded-image")}
  //           src={mes.image}
  //           alt="hinhanh"
  //           onClick={handleImageClick}
  //         />
  //       </div>
  //     );
  //   }
  //   return null;
  // };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("message", { owner: user._id === mes.senderId._id })}>
        {/* <div className={cx("message-info")}>
          <img
            alt="avatar"
            src={images.user}
            className={cx("message-info-img")}
          />
          <span>{formattedTime}</span>
        </div> */}
        <div className={cx("message-content")}>
          {mes.image && mes?.image.length > 0 ? (
            <img
              className={cx("message-content-image")}
              src={mes.image}
              alt="hinhanh"
              onClick={() => handleImageClick(mes.image)}
            ></img>
          ) : (
            <p className={cx("message-content-item")}>{mes.content}</p>
          )}
          <span className={cx("message-content-time")}>{formattedTime}</span>
          {/* <img alt="avatar" src={images.user} /> */}
        </div>
      </div>
      {/* {renderExpandedImage()} */}
    </div>
  );
}

export default Message;
