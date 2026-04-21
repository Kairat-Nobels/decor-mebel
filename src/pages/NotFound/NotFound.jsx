import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 4000)
    }, [navigate])
    return (
        <div className="not-found page-container d-flex flex-column justify-content-center align-items-center">
            <h1 className='text-center p-5'>Не могу найти страницу</h1>
            <button className="btn btn-primary text-center mb-4 p-1 w-50" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Идет перенаправление на главную страницу...
            </button>
        </div>
    )
}

export default NotFound