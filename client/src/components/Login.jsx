import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="container bg-secondary vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                <div className="col-md-6 col-lg-4  mx-auto">
                    <div className="card shadow p-4">
                        <h3 className="text-center mb-4">Login</h3>
                        <form>
                            <div className="mb-3">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="mb-4">
                                <label for="password">Password</label>
                                <input type="password" id="password" className="form-control" placeholder="Enter Password"/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary w-75">Sign In</button>
                            </div>
                        </form>
                        <p className="text-center mt-2">
                            Don't have account?
                            <Link to="/register">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login