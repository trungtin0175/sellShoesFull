import classNames from "classnames/bind";
import styles from "./ListChat.module.scss";
import { ReceivedContext } from "~/pages/Chat/Chat";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IdRoomContext } from "~/pages/Chat/Chat";
import { NameRoomContext } from "~/pages/Chat/Chat";

const cx = classNames.bind(styles);
function ListChat({ onlineUser }) {
  const user = useSelector((state) => state.user);
  const { setIdRoom } = useContext(IdRoomContext);
  const { idRoom } = useContext(IdRoomContext);

  const { setNameRoom } = useContext(NameRoomContext);
  const { nameRoom } = useContext(NameRoomContext);

  const { received } = useContext(ReceivedContext);
  const [dataList, setDataList] = useState([]);
  const [resetList, setResetList] = useState(false);
  const [data, setData] = useState({
    firstId: user._id,
    secondId: "",
  });

  const handleCreate = async (id) => {
    // e.preventDefault();
    try {
      // console.log("Creating with Second ID:", selectedResultId);
      console.log("ID:", id);
      const dataPost = {
        ...data,
        secondId: id[0],
      };
      console.log("data", dataPost);
      const response = await axios.post(
        "http://localhost:3000/api/create/chat",
        dataPost,
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      );
      // console.log("respone", response);
      setIdRoom(response.data._id);
      setResetList(!resetList);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/all/chat")
      .then((res) => {
        setDataList(res.data);
        console.log("resList", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [resetList, idRoom]);
  const handleSelectResult = (resultId) => {
    setNameRoom(resultId);
  };
  console.log("datalist", data);
  console.log("nameroom", nameRoom);
  console.log("onlineUser1234", onlineUser);
  return (
    <div className={cx("wrapper")}>
      <ul className={cx("list")}>
        {dataList.map((item, index) => (
          <li
            onClick={() => {
              handleSelectResult(
                item.members
                  .filter((a) => a.isAdmin === false)
                  .map((filteredMember) => filteredMember.fullname)
              );
              handleCreate(
                item.members
                  .filter((a) => a.isAdmin === false)
                  .map((filteredMember) => filteredMember._id)
              );
            }}
            key={index}
            className={cx("list-item", {
              active: item.members
                .filter((a) => a.isAdmin === false)
                .some((member) => member.fullname === nameRoom[0]),
            })}
          >
            <h4 className={cx("list-item-name")}>
              {item.members
                .filter((a) => a.isAdmin === false)
                .map((filteredMember) => filteredMember.fullname)}
            </h4>
            <div className={cx("list-item-wrapper")}>
              <p className={cx("list-item-text")}>
                {/* {item.members.filter((i) => {
                return onlineUser.some((use) => use.userId === i._id);
              })
                ? "online"
                : "offline"} */}
                {item.members
                  .filter((a) => a.isAdmin === false)
                  .some((member) =>
                    onlineUser.some((user) => user.userId === member._id)
                  )
                  ? "online"
                  : "offline"}
              </p>
              <div
                className={cx("online-btn", {
                  active: item.members
                    .filter((a) => a.isAdmin === false)
                    .some((member) =>
                      onlineUser.some((user) => user.userId === member._id)
                    ),
                })}
              ></div>
            </div>
            {console.log("item.members", item.members)}
            {console.log(
              "Filtered members",
              item.members.some((member) =>
                onlineUser.some((user) => user.userId === member._id)
              )
            )}
            {console.log(
              `trùeale${index}`,
              item.members
                .filter((a) => a.isAdmin === false)
                .map((member) => member.fullname === nameRoom[0])
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListChat;
