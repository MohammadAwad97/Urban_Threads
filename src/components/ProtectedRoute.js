import { useEffect } from "react";
import { Navigate } from "react-router-dom"

function ProtectedRoute({ isLoggedIn, children }) {

    const userId = sessionStorage.getItem("userId");


    return (
        <>
        {userId? children: <Navigate to='/'/>}
        </>
    )
};

export default ProtectedRoute;