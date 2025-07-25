import React from "react";

const Footer = () => (
    <footer className="bg-dark text-white pt-4 pb-2 mt-auto">
        <div className="container">
            <div className="row">
                {/* About Us */}
                <div className="col-md-6 mb-2">
                    <h5>About Us</h5>
                    <p>
                        Welcome to the Not-Another-Shop a place where great deals meet zero bullshit. We’re a crew
                        of shopping addicts and tech weirdos making online buying actually enjoyable. Real products,
                        real support, and absolutely no scammy nonsense. Want honesty and maybe a few laughs? You’re in
                        the right damn spot.
                    </p>
                </div>
                {/* Contact Us */}
                <div className="col-md-6 mb-2">
                    <h5>Contact Us</h5>
                    <ul className="list-unstyled">
                        <li><span role="img" aria-label="mail">📧</span>Email: support@Not-Another-Shop.in (Don’t
                            worry, we actually reply)
                        </li>
                        <li><span role="img" aria-label="phone">📞</span>Phone/WhatsApp: +91 98765 43210 (Calls, memes,
                            marriage proposals all welcome)
                        </li>
                        <li><span role="img" aria-label="location">📍</span>Office: Somewhere in Mumbai—come for chai,
                            stay for tech support.
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="bg-secondary"/>
            <div className="text-center">
                <small>
                    &copy; 2025 Not-Another-Shop. If you steal this code, at least change the copyright.
                </small>
            </div>
        </div>
    </footer>
);

export default Footer;
