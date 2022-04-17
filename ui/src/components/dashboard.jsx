import { useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import './dashboard.css';
import ProductSelect from "./product-select";
import {getProducts} from "../api";
import Testimonials from "./testimonials";
import { CopyBlock } from "react-code-blocks";
import {github} from 'react-code-blocks'
import {toast, Tooltip} from "@chakra-ui/react";

const Dashboard = (props) => {
    const {starred} = props;
    let userId = '625a89fa272d76013668aa52';
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const location = useLocation();

    useEffect(() => {
        getProducts(userId)
            .then((products) => {
                setProducts(products);
                if (products.length > 0) {
                    setSelectedProduct(products[0]._id)
                }
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

    }, [userId])



    const getNavClass = (path) => {
        return location.pathname === path
            ? "sidebar-link active"
            : "sidebar-link";
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    let embedCode = `<iframe id="feedbacker" src="http://localhost:3000/embed/${selectedProduct}" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>
<script type="text/javascript" src="https://raw.githubusercontent.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.min.js"></script>
<script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#feedbacker");</script>`

    return (
        <div id="home">
            <div id="sidebar">
                <ProductSelect items={products} setSelect={setSelectedProduct}/>
                <div className="sidebar-links">
                    <div>Testimonials</div>
                    <div className={getNavClass('/testimonials/all')}>
                        <Link to={'/testimonials/all'}>All</Link>
                    </div>
                    <div className={getNavClass('/testimonials/starred')}>
                        <Link to={'/testimonials/starred'}>Starred</Link>
                    </div>
                </div>
            </div>
            <div id="home-main">
                <div className="home-content-container">
                    <div className="h1-title dashboard-head">Dashboard</div>
                    <div className='feedback-form-link'>
                        <div className='h3-title'>Collect feedbacks with this link</div>
                        <Tooltip label={'Click to copy'}>
                            <span onClick={() => copyToClipboard(`http://localhost:3000/send/${selectedProduct}`)} className='link'>
                                http://localhost:3000/send/{selectedProduct}
                            </span>
                        </Tooltip>
                    </div>
                    <div onClick={() => copyToClipboard(embedCode)} className="embed-code">
                        <div className='code-heading'>
                            <span className='h3-title'>Copy the following code to your site</span>
                        </div>
                        <Tooltip label={'Click to copy'}>
                            <div>
                                <CopyBlock
                                    text={embedCode}
                                    language={'javascript'}
                                    theme={github}
                                    wrapLines={true}
                                />
                            </div>
                        </Tooltip>
                    </div>
                    <div className="home-testimonials">
                        {selectedProduct &&
                            <Testimonials productId={selectedProduct} controls={true} starred={starred}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;