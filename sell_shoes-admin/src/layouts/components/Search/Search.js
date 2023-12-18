import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "~/layouts/components/Popper";
import { Link } from "react-router-dom";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState, useRef, useContext } from "react";
import { useDebounce } from "~/hook";
import axios from "axios";
import { useSelector } from "react-redux";
import { IdRoomContext } from "~/pages/Chat/Chat";
import { NameRoomContext } from "~/pages/Chat/Chat";

const cx = classNames.bind(styles);
function Search() {
  const user = useSelector((state) => state.user);
  const { setIdRoom } = useContext(IdRoomContext);
  const { setNameRoom } = useContext(NameRoomContext);

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const debounced = useDebounce(searchValue, 500);
  const [data, setData] = useState({
    firstId: user._id,
    secondId: "",
  });
  const [selectedResultId, setSelectedResultId] = useState(null);
  // console.log("user", user);
  const inputRef = useRef();

  // useEffect(() => {
  //     setTimeout(() => {
  //         setSearchResult([1, 2, 3]);
  //     }, 3000);
  // }, []);
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    fetch(
      `http://localhost:3000/api/search/user?search=${encodeURIComponent(
        debounced
      )}`
    )
      .then((res) => res.json())
      .then((res) => {
        const value = res.data.filter((val) => {
          return val.isAdmin !== true;
        });
        setSearchResult(value);
        // setSearchResult(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [debounced]);
  console.log("result", searchResult);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  // console.log("result", searchResult);
  const handleSelectResult = (resultId) => {
    setNameRoom(resultId);
  };
  useEffect(() => {
    // Use useEffect to perform the update after selectedResultId changes
    if (selectedResultId !== null) {
      setData({
        ...data,
        secondId: selectedResultId,
      });
    }
  }, [selectedResultId]);
  const handleCreate = async (id) => {
    // e.preventDefault();
    try {
      console.log("Creating with Second ID:", selectedResultId);
      console.log("ID:", id);
      const dataPost = {
        ...data,
        secondId: id,
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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Tippy
        interactive
        visible={showResult && (searchResult ?? []).length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <div className={cx("search-result-wrapper")}>
                {Array.isArray(searchResult) &&
                  searchResult.map((result) => (
                    <div
                      className={cx("search-link")}
                      // to={`/api/product/detail/${result._id}`}
                      key={result._id}
                      onClick={() => {
                        handleHideResult();
                        handleClear();
                        handleSelectResult(result.fullname);
                        handleCreate(result._id);
                      }}
                    >
                      {/* <img
                        src={result.image[0]}
                        alt="search"
                        className={cx("search-result-img")}
                      ></img> */}
                      <div className={cx("search-result-info")}>
                        <h4 className={cx("search-result-name")}>
                          {result.fullname}
                        </h4>
                        <p className={cx("search-result-price")}>
                          {
                            // result.salePrice.toLocaleString() ||
                            result.email
                          }{" "}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </PopperWrapper>
            {/* <h4 className={cx('search-title')}>Kết quả</h4>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link> */}
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Tìm kiếm tên người dùng!"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          ></input>
          {!!searchValue && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {/* <Link to={`/api/search?search=${encodeURIComponent(debounced)}`}>
            <button
              className={cx("search-btn")}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </Link> */}

          {/* <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button> */}
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
