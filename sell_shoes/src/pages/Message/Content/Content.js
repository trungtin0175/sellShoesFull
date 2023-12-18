import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import Messenge from './Messenge';

const cx = classNames.bind(styles);
function Content({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('name')}>Admin</h3>
            </div>
            <div className={cx('content')}>
                {/* <div className={cx('content-item')}> */}
                {Array.isArray(data.messages) && data.messages.length > 0 ? (
                    data.messages
                        .slice()
                        .reverse()
                        .map((mes, index) => <Messenge key={index} mes={mes} />)
                ) : (
                    <></>
                )}
                {/* </div> */}
            </div>
        </div>
    );
}

export default Content;
