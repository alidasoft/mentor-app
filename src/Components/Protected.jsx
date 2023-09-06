import React from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({ isAuthenticated, children}) => {
    const navigate = useNavigate()
    if (!isAuthenticated) {
        return navigate('/')
    } else {
        return children
    }
}

export default Protected
