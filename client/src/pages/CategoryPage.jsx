// src/pages/CategoryPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import Product from "../components/Product";
import Footer from "../components/Footer";
import products from "../Dummy Data/products.js";

function CategoryPage() {
    const { name } = useParams(); // get "Fashion & Apparel" or whatever from URL
    const productsForCategory = products.filter(
        (p) => p.category === name
    );
    const displayName = name;

    if (!productsForCategory.length) {
        return (
            <>
                <MyNavbar />
                <div className="container text-center my-5">
                    <h2>No products found for "{displayName}"</h2>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <MyNavbar />
            <div className="container">
                <h2>{displayName}</h2>
                <div className="row">
                    {productsForCategory.map((p) => (
                        <div className="col-md-3" key={p.id}>
                            <Product
                                title={p.title}
                                description={p.description}
                                image={p.image}
                                price={p.price}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CategoryPage;
