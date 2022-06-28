import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email)
      toast.success('Email sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <div className='pageContent'>
        <form onSubmit={onSubmit} className='flex flex-col w-1/2 max-w-xl min-w-max'>
          <input type="email" 
          className='emailInput' 
          placeholder='Email' id='email' 
          value={email} onChange={onChange}/>
          <Link className="self-end" to='/sign-in'>Sign In</Link>
          <button className='signInBtn mt-3'>Reset Password</button>
        </form>
      </div>
    </div>
  )
}
export default ForgotPassword