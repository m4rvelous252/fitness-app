import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check if user already exists
      const docRef = doc(db, 'users', user.uid)
      const docSnapshot = await getDoc(docRef)
      
      // if not create new user
      if (!docSnapshot.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email, 
          timestamp: serverTimestamp(),
        })
      }

      navigate('/')
    } catch (error) {
      toast.error('Could not sign in with Google')
    }
  }

  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img src={googleIcon} alt="Google" className='socialIconImg'/>
      </button>
    </div>
  )
}
export default OAuth