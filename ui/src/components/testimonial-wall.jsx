import {React, useEffect, useState} from 'react';
import './testimonial-wall.css';
import Testimonials from './testimonials';
import {useParams} from "react-router-dom";
import {getProduct} from "../api";

const TestimonialWall = (props) => {
    let params = useParams();
    const [productName, setProductName] = useState('')

    useEffect(() => {
        getProduct(params.productId)
            .then(product => {
                setProductName(product.name)
            })
            .catch(error => {
                console.error(error);
            })
    })

    return (
        <div className='wall-container'>
            <div className='wall-heading'>
                <div className='wall-subtitle'>What customers say about</div>
                <h1 className='h1-title wall-title'>{productName}</h1>
            </div>
            <Testimonials productId={params.productId} controls={false} starred={true}/>
        </div>
    )
}

export default TestimonialWall;