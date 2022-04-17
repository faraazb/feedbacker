import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Header = () => {
    let location = useLocation();
    const allowed = ['/', '/testimonials/all', '/testimonials/starred', '/products', '/create-product']

    if (allowed.includes(location.pathname)) {
        return (
            <header className='nav-header'>
                <div className='feedbacker-logo'>
                    Feedbacker
                </div>
                <div className='nav-links'>
                    <Link className='nav-link' to={'/'}>Home</Link>
                    <Link className='nav-link' to={'/testimonials/all'}>Dashboard</Link>
                    <Link className='nav-link' to={'/products'}>Products</Link>
                </div>
            </header>
        );
    }
    return null;
}

export default Header;