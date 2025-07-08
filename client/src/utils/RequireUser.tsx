import { getItem, KEY_ACCESS_TOKEN } from './localStorageManager'
import { Navigate, Outlet } from 'react-router-dom'

function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN)

    return user ? <Outlet /> : <Navigate to="/signin" />
}

export default RequireUser