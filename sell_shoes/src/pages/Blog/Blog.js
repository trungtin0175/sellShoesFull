import styles from './Blog.module.scss';
import classNames from 'classnames/bind';
import '~/components/GridStyles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Content from '../Home/Content';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Blog() {
    const [products, setProducts] = useState([]);
    const [blog, setBlog] = useState([]);
    const { _id } = useParams();
    const [sortedProducts, setSortedProducts] = useState([]);
    const [productCount, setProductCount] = useState(10);

    useEffect(() => {
        console.log('product', _id);
        axios
            .get(`http://localhost:3000/api/blog/detail/${_id}`)
            .then((response) => {
                setBlog(response.data.data);
                console.log(response);
            })
            .catch((error) => {
                console.log('API Error:', error);
            });
    }, [_id]);
    console.log('blog', blog);
    // const body = blog.body.split('\n');
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header')}>{blog.title}</h2>
            <div className={cx('body')}>
                <div className={cx('body-image')}>
                    <img className={cx('img')} alt="hình ảnh" src={blog.image}></img>
                </div>
                <div className={cx('body-content')}>
                    {/* <p className={cx('body-content--text')}>{blog.body}</p> */}
                    {blog?.body?.split('\r\n').map((paragraph, index) => (
                        <p className={cx('body-content--text')} key={index}>
                            {paragraph}
                            <br />
                        </p>
                    ))}
                </div>
                <div className={cx('container')}>
                    {Array.isArray(blog.id_product) && blog.id_product.length > 0 ? (
                        <>
                            <h4 className={cx('container-label')}>Các sản phẩm liên quan</h4>
                            <div className={cx('row', 'sm-gutter')}>
                                {blog.id_product.map((product, index) => (
                                    <div className={cx('col', 'l-2-4', 'c-6')} key={index}>
                                        <Content product={product} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Product not found</p>
                    )}
                </div>
            </div>
        </div>
        // </div>
    );
}

export default Blog;
