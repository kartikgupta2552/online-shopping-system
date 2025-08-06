import React from "react";
import { useEffect } from "react";
import MyNavbar from "../components/MyNavbar.jsx";
import Product from "../components/Product.jsx";
import Footer from "../components/Footer.jsx";
import categories from "../Dummy Data/categories.js";

import products from "../Dummy Data/products.js";
import { useLocation ,useNavigate,Link} from "react-router-dom";





function HomePage() {
    // select 3 categories to be displayed on the homepage
    const selectedCategories = categories.slice(0, 3);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect( () => {
        if(location.state && location.state.unauthorized){
            //remove the unauthorized message after showing it once
            const timeout = setTimeout(()=>{
                navigate("/homepage",{replace:true,state:{}});
            },2500);
            return () => clearTimeout(timeout);
        }
    },[location,navigate] );

    return (
        <>
            <MyNavbar/>
            {location.state && location.state.loginSuccess && (
                <div className="alert alert-success text-center" role="alert">
                    Logged in successfully!
                </div>
            )}
            {location.state && location.state.unauthorized && (
                <div>
                    <b>Access Denied</b> Only <u>Admin</u> allowed.
                </div>
            )}
            <div className="container">
                {selectedCategories.map(cat => (
                    <div key={cat.id}>
                        <h2>{cat.name}</h2>
                        <div className="row">
                            {products
                                .filter(p => p.category === cat.name)
                                .map(p => (
                                    <div className="col-md-3" key={p.id}>
                                        <Product
                                            id={p.id}
                                            title={p.title}
                                            description={p.description}
                                            image={p.image}
                                            price={p.price}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    );
}

export default HomePage;
