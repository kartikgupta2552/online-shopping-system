import React from "react";
import { useLocation } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";
import products from "../Dummy Data/products.js";
import Product from "../components/Product";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
    const query = useQuery().get('q')?.toLowerCase() || "";
    // Simple case-insensitive search on title + description
    const filtered = products.filter(
        p =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
    );

    return (
        <>
            <MyNavbar />
            <div className="container my-4">
                <h2>
                    Search Results for "{query || '...'}"
                </h2>
                <div className="row">
                    {filtered.length ? (
                        filtered.map(p => (
                            <div className="col-md-3" key={p.id}>
                                {/* Reuse your Product card component */}
                                <Product
                                    title={p.title}
                                    description={p.description}
                                    image={p.image}
                                    price={p.price}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p className="text-secondary fs-5 mt-4">No products found. Life's tough, huh?</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SearchResultsPage;
