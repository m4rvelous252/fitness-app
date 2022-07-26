import { jsonEval } from "@firebase/util"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"

function ExerciseDetails() {
  const params = useParams()
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    const getExercise = async () => {
      let url = `${process.env.REACT_APP_WGER_API_URL}/exerciseinfo/${params.exerciseId}/?language=2`

      let data = await fetch(url)
      let res = await data.json()
      setExercise(res)
    }
    getExercise()
  }, []);

  if(exercise == null) {
    return <Spinner />
  }

  const {name, description, images, comments} = exercise

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">{name}</p>
      </header>
      <div className="pageContent">
          {description 
          ?  <div dangerouslySetInnerHTML={{__html: description}} className="description"></div>
          : null}
          {images.length > 0 
          ? <ul className="images">
            {
              images.map((image, index) => (
                <li className="img" key={index}><img src={image.image} alt={name}  /></li>
              ))
            }
            </ul>
          : null}
          {comments.length > 0 
          ? <div className="comments">
            {
              comments.map((comment, index) => (
                  <p key={index}>{comment.comment}</p>
              ))
            }
          </div>
          : null}
      </div>
    </div>
  )
}
export default ExerciseDetails