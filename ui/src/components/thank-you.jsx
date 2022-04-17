import './thank-you.css';
import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import {getProduct} from "../api";

const ThankYou = (props) => {
    const [productName, setProductName] = useState('our product')
    let params = useParams();

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
        <div id='thank-you'>
            <div className='thank-you-hero'>
                <div className='hero-title'>Thank you!</div>
                <div className='hero-subtitle'>
                    Your feedback will help us in making {productName}<br/>
                    better for everyone. 🚀
                </div>
            </div>
            <footer className='made-with'>
                <span>Collect feedbacks with <a className='feedbacker-link' href={'/'}>Feedbacker</a></span>
            </footer>
        </div>
    )
}

export default ThankYou;