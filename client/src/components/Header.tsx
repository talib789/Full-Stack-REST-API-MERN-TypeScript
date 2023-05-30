import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch:any = useDispatch()
    const {user} = useSelector((state:any) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(logout())
        navigate('/')
    }

    return (
        <header className = "header">
            <div className="logo">
                <Link to='/'>My Profile</Link>
            </div>
            <ul>
                {user ? (
                <li>
                    <button className = 'btn' onClick={onLogout}>
                        <FaSignOutAlt/> LogOut
                    </button>
                </li>
                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt/> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser/> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    )
}

export default Header