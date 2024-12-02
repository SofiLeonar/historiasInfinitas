import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!isLoggedIn) {

        navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? children : null;
    };

export default RutaProtegida;