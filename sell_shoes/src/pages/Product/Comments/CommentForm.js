import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
function CommentForm({ submitLabel, handleSubmit, hasCancelButton = false, handleCancel, initialText = '' }) {
    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText('');
    };
    return (
        <form onSubmit={onSubmit}>
            <textarea className={cx('comment-form-textarea')} value={text} onChange={(e) => setText(e.target.value)} />
            <button className={cx('comment-form-button')} disabled={isTextareaDisabled}>
                {submitLabel}
            </button>
            {hasCancelButton && (
                <button
                    type="button"
                    className={cx('comment-form-button comment-form-cancel-button')}
                    onClick={handleCancel}
                    style={{ cursor: 'pointer' }}
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default CommentForm;
