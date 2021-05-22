import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from './ProductCarousel'
import Meta from '../components/Meta'


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;
    
    useEffect(() => {
        dispatch(fetchProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta/>
            {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
                <>
                {!keyword && <ProductCarousel/>}
                <h1>Latest Products</h1>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )
            }
        </>
    )
}


export default HomeScreen