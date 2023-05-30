import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData]: any = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Brackets?
  const authState: any = useSelector((state: any) => state.auth)
  const {user, isLoading, isError, isSuccess, message} = authState

  useEffect(() => {
    if(isError) toast.error(message)
    // Should be
    // if(isSuccess || user) navigate('/')
    if(isSuccess) navigate('/')

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    const userData = {
      email, 
      password
    }
    dispatch(login(userData))
  }

  if(isLoading) return <Spinner/>

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Log in to your profile and start shopping</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter password' onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login