import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {verifyToken} from '../Fetch/VerifyToken'
import { useQuery } from "react-query";
import Spinner from "../Atoms/Spinner";

const Auth = () => {
    
    const [Loading, setLoading] = useState(true)
    const navigate = useNavigate();
    

    useQuery("verifyToken", verifyToken, {
        retry: 2,
        retryDelay: 20,
        onSuccess: () => {
            setLoading(false)
        },
        onError: () => {
           navigate('/')
            setLoading(false)
        },
    });

    if (Loading) {
        return <Spinner />
    }
    return (
        <Outlet />
    )
}


export default Auth;