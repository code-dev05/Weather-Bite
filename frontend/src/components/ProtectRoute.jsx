import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

function ProtectRoute({children, redirect = "/auth"}) {
    const [cookies, setCookies] = useCookies(["token"])
    if (!cookies.token) {
        alert("Sign In First!")
        return <Navigate to={redirect} />
    }
    return children
}

export default ProtectRoute