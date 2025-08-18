import { Navigate, useLocation } from 'react-router'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../components/Spinner/LoadingSpinner'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <LoadingSpinner />
    if (user) return children
    return <Navigate to='/login' state={{ from: location }} replace='true' />
}

export default PrivateRoute