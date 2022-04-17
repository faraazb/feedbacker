import {useEffect, useState} from "react";
import {getProducts} from "../api";
import {toast} from "@chakra-ui/react";
import './products.css';
import {Link, useNavigate} from "react-router-dom";

const Products = () => {
    let userId = '625a89fa272d76013668aa52';
    const [products, setProducts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getProducts(userId)
            .then((products) => {
                setProducts(products);
            })
            .catch(error => {
                toast({
                    title: 'Failed!',
                    description: "There was a problem!",
                    status: 'error',
                    duration: 9000,
                    position: 'top',
                    isClosable: true,
                });
            })
    }, [])


    return (
        <div id='products'>
            <span className='h1-title product-head'>Products</span>
            <div className='products-container'>
                <div className='products-list'>
                    {products &&
                        products.map((product, i) =>
                            <div className='product-card'>
                                <div className='product-info'>
                                    <div className='product-name h3-title'>
                                        {product.name} <br/>
                                        <div className='product-info-testimonials h4-subtitle'>
                                            {product.testimonials} testimonials <br/>
                                            {product.testimonials_starred} starred
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <Link to={'/create-product'}>
                        <div className='product-card add-product'>
                            <div className='product-info h3-title'>
                                Add a Product
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Products;
