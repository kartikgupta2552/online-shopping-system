function Product({id,title, description, image, price}) {

    function handleWishlistClick() {
        // SAFELY read the wishlist array from localStorage
        let wishlist = JSON.parse(localStorage.getItem("wishlist"));
        if (!Array.isArray(wishlist)) wishlist = [];
        if (!wishlist.includes(id)) wishlist.push(id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        // Optionally: toast success, re-render, etc.
    }

    return (
        <div className="card m-1 mb-2 border border-black product-card">
            <img src={image} className="card-img-top product-card-img" alt={title}/>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">₹{price}</h6>
                <p className="card-text flex-grow-1">{description}</p>
                <div>
                    <a href="#" className="btn btn-primary m-1">Buy Now</a>
                    <a href="#" className="btn btn-primary m-auto">Add to Cart</a>
                    <a
                        href="#"
                        className="btn btn-outline-danger m-1"
                        onClick={e => {
                            e.preventDefault();
                            handleWishlistClick();
                        }}
                        title="Add to Wishlist"
                    >
                        <i className="bi bi-heart"></i>
                    </a>

                </div>
            </div>
        </div>
    );
}

export default Product;