import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import CommentForm from './CommentForm';
import images from '~/assets/images';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Comment({
    // parentId,
    comment,
    // replies,
    // activeComment,
    // setActiveComment,
    // addComment,
    deleteComment,
    updateComment,
    currentUserId,
}) {
    // console.log('currwnt', comment);
    // const isEditing = activeComment && activeComment.id === comment._id && activeComment.type === 'editing';
    // const isReplying = activeComment && activeComment.id === comment._id && activeComment.type === 'replying';
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.timestamp);
    // const timePassed = new Date() - new Date(comment.timestamp) > fiveMinutes;
    // const canDelete = currentUserId === comment.userId && replies.length === 0 && !timePassed;
    const canDelete = currentUserId === comment.id_user._id;
    // console.log('cadadf', comment.id_user._id);
    const canReply = Boolean(currentUserId);
    // const canEdit = currentUserId === comment.id_user._id && !timePassed;
    const canEdit = currentUserId === comment.id_user._id;
    // const replyId = parentId ? parentId : comment._id;
    // const timestamp = new Date(comment.timestamp).toLocaleDateString();
    // console.log('comment._id;', comment.id_user.fullname);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div key={comment._id} className={cx('comment')}>
            {console.log('id', comment._id)}
            {console.log('comment', comment)}
            <div className={cx('comment-image-container')}>
                <img src={images.user} />
            </div>
            <div className={cx('comment-right-part')}>
                <div className={cx('comment-content')}>
                    <h1 className={cx('comment-author')}>{comment.id_user.fullname}</h1>
                    <div className={cx('comment-time')}>{comment.timestamp}</div>
                </div>
                <div className={cx('comment-text')}>{comment.content}</div>
                {/* {!isEditing && <div className={cx('comment-text')}>{comment.content}</div>} */}
                {isEditing && (
                    <CommentForm
                        submitLabel="Update"
                        hasCancelButton
                        initialText={comment.content}
                        handleSubmit={(text) => updateComment(text, comment._id)}
                        handleCancel={() => {
                            setIsEditing(!isEditing);
                        }}
                    />
                )}
                <div className={cx('comment-actions')}>
                    {canReply && (
                        <div
                            className={cx('comment-action')}
                            // onClick={() => setActiveComment({ id: comment._id, type: 'replying' })}
                        >
                            Reply
                        </div>
                    )}
                    {canEdit && (
                        <div className={cx('comment-action')} onClick={() => setIsEditing(!isEditing)}>
                            Edit
                        </div>
                    )}
                    {canDelete && (
                        <div className={cx('comment-action')} onClick={() => deleteComment(comment._id)}>
                            Delete
                        </div>
                    )}
                </div>
                {/* {isReplying && <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)} />} */}
                {/* {replies.length > 0 && (
                    <div className={cx('replies')}>
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply._id}
                                setActiveComment={setActiveComment}
                                activeComment={activeComment}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                parentId={comment._id}
                                replies={[]}
                                currentUserId={currentUserId}
                            />
                        ))}
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default Comment;
