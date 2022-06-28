import { getAuth } from "firebase/auth"
import { useState, useEffect } from "react"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [loading, setLoading] = useState(false)

  const { name, email } = formData

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  if(loading){
    return <Spinner/>
  }

  return (
    <div className="pageContainer">
      <header className='flex justify-between'>
        <p className="pageHeader">Profile</p>
        <button className="logOut" type='button' onClick={onLogout}>Logout</button>
      </header>
      <main className="pageContent">
        <form>
          <div className="userNameAndEmail mx-2 flex flex-col items-start justify-center">
              <input className="profileName inputDisable text-3xl mb-2 font-bold h-fit" value={name} id='name' onChange={onChange}/>
              <p className="profileEmail text-base font-medium h-fit">{email}</p>
            </div>
        </form>
      </main>
    </div>
  )
}
export default Profile