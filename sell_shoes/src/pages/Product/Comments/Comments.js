import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '~/config';

// import {
//     getComments as getCommentsApi,
//     createComment as createCommentApi,
//     updateComment as updateCommentApi,
//     deleteComment as deleteCommentApi,
//   } from "../api";

const cx = classNames.bind(styles);

function Comments({ id }) {
    const [backendComments, setBackendComments] = useState([]);
    const [count, setCount] = useState(null);
    const [activeComment, setActiveComment] = useState(null);
    const [sortedComment, setSortedComment] = useState([]);
    const token = useSelector((state) => state.user.accessToken);
    const currentUserId = useSelector((state) => state.user._id);
    const user = useSelector((state) => state.user);
    console.log('user', user);
    console.log('currentUserId', currentUserId);
    console.log('token', token);
    // const getReplies = (commentId) =>
    //         backendComments
    //             .filter((backendComment) => backendComment.parentId === commentId)
    //             .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    const addComment = async (text) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/comment/${id}`,
                {
                    content: text,
                },
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                },
            );
            console.log('token2', token);
            console.log('respone', response);
            const updatedComments = [response.data.data, ...backendComments];
            setBackendComments(updatedComments);
            setCount(response);
        } catch (error) {
            console.error(error);
        }
    };

    const updateComment = async (text, commentId) => {
        try {
            if (backendComments.length > 0) {
                const response = await axios.put(
                    `http://localhost:3000/api/comment/edit/${commentId}`,
                    {
                        content: text,
                    },
                    {
                        headers: {
                            token: `Bearer ${token}`,
                        },
                    },
                );
                setCount(response);
            }
        } catch (error) {
            console.log(error);
        }
        // axios
        //     .put(
        //         `http://localhost:3000/api/comment/edit/${backendComments.data._id}`,
        //         {
        //             body: text,
        //         },
        //         {
        //             headers: {
        //                 token: `Bearer ${token}`,
        //             },
        //         },
        //     )
        //     .then(() => {
        //         const updatedBackendComments = backendComments.map((backendComment) => {
        //             if (backendComment._id === commentId) {
        //                 return { ...backendComment, body: text };
        //             }
        //             return backendComment;
        //         });
        //         setBackendComments(updatedBackendComments);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };
    // if (backendComments.length > 0) {
    //     console.log('backendComments', backendComments[0]._id);
    // } else {
    //     console.log('backendComments is empty');
    // }
    console.log('token', token);
    const deleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to remove comment?')) {
            try {
                if (backendComments.length > 0) {
                    const response = await axios.delete(`http://localhost:3000/api/comment/delete/${commentId}`, {
                        headers: {
                            token: `Bearer ${token}`,
                        },
                    });
                    setCount(response);
                }
            } catch (error) {
                console.log(error);
            }
            // axios
            //     .delete(`http://localhost:3000/api/comment/delete/${backendComments._id}`, {
            //         headers: {
            //             token: `Bearer ${token}`,
            //         },
            //     })
            //     .then(() => {
            //         const updatedBackendComments = backendComments.filter(
            //             (backendComment) => backendComment.data._id !== commentId,
            //         );
            //         setBackendComments(updatedBackendComments);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        }
    };
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/comment/all/${id}`)
            .then((response) => {
                setBackendComments(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [count]);
    // useEffect(() => {
    //     const sorted = backendComments.sort((a, b) => b.timestamp - a.timestamp);
    //     setSortedComment(sorted);
    // }, [backendComments]);
    useEffect(() => {
        const sorted = [...backendComments].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setSortedComment(sorted);
    }, [backendComments]);
    // console.log('backend', backendComments);
    return (
        <div className={cx('comments')}>
            <h3 className={cx('comments-title')}>ĐÁNH GIÁ</h3>
            <div className={cx('comment-form-title')}>Để lại bình luận của bạn</div>
            {token !== '' ? (
                <CommentForm submitLabel="Gửi" handleSubmit={addComment} />
            ) : (
                <Link to={config.routes.login} className={cx('comment-form-link')}>
                    Bạn cần đăng nhập để bình luận
                </Link>
            )}
            <div className={cx('comments-container')}>
                {sortedComment.map((rootComment, index) => {
                    console.log('cswdsd', currentUserId);
                    return (
                        <Comment
                            parentId={rootComment._id}
                            key={index}
                            comment={rootComment}
                            // replies={getReplies(rootComment.id)}
                            // activeComment={activeComment}
                            // setActiveComment={setActiveComment}
                            // addComment={addComment}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                            currentUserId={currentUserId}
                        />
                    );
                })}
            </div>
        </div>
    );
}
// const parentId = null;
// function Comments({ _id, currentUserId }) {
//     const [backendComments, setBackendComments] = useState([]);
//     const [activeComment, setActiveComment] = useState(null);
//     const token = useSelector((state) => state.user.accessToken);
//     console.log('backend', backendComments);
//     const rootComments = backendComments.filter(
//         (backendComment) => backendComment.parentId === null,
//         // backendComment.parentId === null
//     );
//     console.log('rootComment', rootComments);
//     const getReplies = (commentId) =>
//         backendComments
//             .filter((backendComment) => backendComment.parentId === commentId)
//             .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
//     const addComment = (text, parentId) => {
//         axios
//             .post(
//                 `http://localhost:3000/api/comment/${_id}`,
//                 {
//                     text,
//                 },
//                 {
//                     headers: {
//                         token: `Bearer ${token}`,
//                     },
//                 },
//             )
//             // createCommentApi(text, parentId)
//             .then((comment) => {
//                 setBackendComments([comment, ...backendComments]);
//                 setActiveComment(null);
//             });
//     };

//     const updateComment = (text, commentId) => {
//         axios
//             .put(
//                 `http://localhost:3000/api/comment/edit/${backendComments.data._id}`,
//                 {
//                     body: text,
//                 },
//                 {
//                     headers: {
//                         token: `Bearer ${token}`,
//                     },
//                 },
//             )
//             .then(() => {
//                 const updatedBackendComments = backendComments.map((backendComment) => {
//                     if (backendComment._id === commentId) {
//                         return { ...backendComment, body: text };
//                     }
//                     return backendComment;
//                 });
//                 setBackendComments(updatedBackendComments);
//                 setActiveComment(null);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };
//     const deleteComment = (commentId) => {
//         if (window.confirm('Are you sure you want to remove comment?')) {
//             axios
//                 .delete(`http://localhost:3000/api/comment/delete/${backendComments.data._id}`, {
//                     headers: {
//                         token: `Bearer ${token}`,
//                     },
//                 })
//                 .then(() => {
//                     const updatedBackendComments = backendComments.filter(
//                         (backendComment) => backendComment.data._id !== commentId,
//                     );
//                     setBackendComments(updatedBackendComments);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }
//     };

//     useEffect(() => {
//         axios
//             .get(`http://localhost:3000/api/comment/all/${_id}`)
//             .then((response) => {
//                 setBackendComments(response.data.data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, [_id]);

//     return (
//         <div className={cx('comments')}>
//             <h3 className={cx('comments-title')}>Comments</h3>
//             <div className={cx('comment-form-title')}>Write comment</div>
//             <CommentForm submitLabel="Write" handleSubmit={addComment} />
//             <div className={cx('comments-container')}>
//                 {rootComments.map((rootComment) => {
//                     console.log('cswdsd', rootComments);
//                     return (
//                         <Comment
//                             key={rootComment._id}
//                             comment={rootComment}
//                             replies={getReplies(rootComment.id)}
//                             activeComment={activeComment}
//                             setActiveComment={setActiveComment}
//                             addComment={addComment}
//                             deleteComment={deleteComment}
//                             updateComment={updateComment}
//                             currentUserId={currentUserId}
//                         />
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }

export default Comments;
