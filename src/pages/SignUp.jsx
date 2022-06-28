import {useState} from 'react'
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {MdVisibilityOff, MdVisibility} from 'react-icons/md'
import OAuth from '../components/OAuth'
import Spinner from '../components/Spinner'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const {name, email, password} = formData

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser,{
        displayName: name 
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      setLoading(false)

      navigate('/')
    } catch (error) {
      toast.error('Invalid email or password')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSignIn = () => {
    navigate('/sign-in')
  }

  if(loading){
    return <Spinner />
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main className='pageContent'>
          <form onSubmit={onSubmit} className='flex flex-col w-1/2 max-w-xl min-w-max'>
            <input type="text" className='nameInput'
            placeholder='Name' id='name' value={name} onChange={onChange}/>
            <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange}/>
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder='Password' id='password' value={password} onChange={onChange}/>

              {showPassword 
              ? <MdVisibilityOff size='1.5em' alt="hide password" className="showPassword" onClick={()=>{
                setShowPassword(false)
              }}/>
              : <MdVisibility size='1.5em' alt="show password" className="showPassword" onClick={()=>{
                setShowPassword(true)
              }}/>
              }
            </div>
            <Link to='/forgot-password' className='mt-1 self-end'>Forgot Password</Link>
            <button className='signInBtn mt-3'>Sign In</button>
          </form>
          <OAuth></OAuth>
          <button className="signUp" onClick={onSignIn}>Sign In Instead</button>
        </main>
      </div>
    </>
  )
}
export default SignUp