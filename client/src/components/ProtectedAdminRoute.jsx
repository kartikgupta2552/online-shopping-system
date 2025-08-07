import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ( {children}) => {
    //retrieve user info from localStorage (from login step)
    const userRaw = localStorage.getItem("user");

    //parse user info(it might be undefined/null)
    let user = null;
    try {
        user = userRaw ? JSON.parse(userRaw) : null;
    } catch (err) {
        //if JSON parsing fails
        user = null;
    }

    //if NO user or userRole != ADMIN, throw them out
    if(!user || user.userRole != "ADMIN") {
        //redirect to homepage
        return <Navigate to="/homepage" state={{unauthorized:true}} />
    }


    return children;

}//ProtectedAdminRoute ends

export default ProtectedAdminRoute;