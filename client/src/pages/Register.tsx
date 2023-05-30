import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData]: any = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  })

  const {firstname, lastname, username, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Brackets?
  const authState: any = useSelector((state: any) => state.auth)
  const {user, isLoading, isError, isSuccess, message} = authState

  const onChange = (e: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if(isError) toast.error(message)
    // Should be
    // if(isSuccess || user) navigate('/')
    if(isSuccess) navigate('/')

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e: any) => {
    e.preventDefault()

    if (password !== password2){
      toast.error('Passwords do not match')
    } else {
      const userData: any = {
        firstname, lastname, username, email, password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id='firstname' name='firstname' value={firstname} placeholder='Enter your first name' onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id='lastname' name='lastname' value={lastname} placeholder='Enter your last name' onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id='username' name='username' value={username} placeholder='Enter your username' onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter password' onChange={onChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password2' name='password2' value={password2} placeholder='Confirm password' onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register