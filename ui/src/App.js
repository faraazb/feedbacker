import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import TestimonialForm from './components/testimonial-form';
import './App.css';
import Testimonials from './components/testimonials';
import TestimonialWall from "./components/testimonial-wall";
import Dashboard from "./components/dashboard";
import ThankYou from "./components/thank-you";
import TestimonialEmbed from "./components/testimonial-embed";
import Home from "./components/home";
import Products from "./components/products";
import CreateProduct from "./components/create-product";
import Header from "./components/header";

const App = () => {
    const baseUrl = 'http://127.0.0.1:5000/'
    const productId = '6240397ade9d1baf487e88ba'

    return (
        <BrowserRouter>
            {/*<Link to='/send/625a89fa272d76013668aa53'>DEBUG: Send Testimonial</Link>*/}
            {/*<Link to='/wall/625a89fa272d76013668aa53'>DEBUG: Testimonials</Link>*/}
            {/*<Link to='/embed/625a89fa272d76013668aa53'>DEBUG: Testimonials Embed</Link>*/}
            {/*<Link to='/thank-you/625a89fa272d76013668aa53'>Thank you</Link>*/}
            {/*<Link to='/testimonials/all'>Dashboard</Link>*/}
            <div className='main-container'>
                <Header/>
                <div className='page'>
                    <Routes>
                        <Route exact path='/send/:productId' element={<TestimonialForm/>}/>
                        <Route exact path='/wall/:productId' element={<TestimonialWall/>}/>
                        <Route exact path='/embed/:productId' element={<TestimonialEmbed/>}/>
                        <Route exact path="/testimonials/all" element={<Dashboard starred={false}/>}/>
                        <Route exact path="/testimonials/starred" element={<Dashboard starred={true}/>}/>
                        <Route exact path="/thank-you/:productId" element={<ThankYou/>}/>
                        <Route exact path="/create-product" element={<CreateProduct/>} />
                        <Route exact path='/products' element={<Products/>}/>
                        <Route exact path='/' element={<Home/>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App
