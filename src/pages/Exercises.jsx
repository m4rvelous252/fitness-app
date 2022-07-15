import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import index from "toastify"
import Spinner from "../components/Spinner"

function Exercises() {
  const [muscleFilter, setMuscleFilter] = useState([])
  const [equipmentFilter, setEquipmentFilter] = useState(null)
  const [listExercise, setListExercise] = useState([])
  const navigate = useNavigate()

  const sortBy = [
    {
      key: 1,
      text: 'Muscle Group',
      options: [
        {
            "id": 10,
            "name": "Abs"
        },
        {
            "id": 8,
            "name": "Arms"
        },
        {
            "id": 12,
            "name": "Back"
        },
        {
            "id": 14,
            "name": "Calves"
        },
        {
            "id": 11,
            "name": "Chest"
        },
        {
            "id": 9,
            "name": "Legs"
        },
        {
            "id": 13,
            "name": "Shoulders"
        }
    ]
    },
    {
      key: 2,
      text: 'Equipment',
      options: [
        {
            "id": 1,
            "name": "Barbell"
        },
        {
            "id": 8,
            "name": "Bench"
        },
        {
            "id": 3,
            "name": "Dumbbell"
        },
        {
            "id": 4,
            "name": "Gym mat"
        },
        {
            "id": 9,
            "name": "Incline bench"
        },
        {
            "id": 10,
            "name": "Kettlebell"
        },
        {
            "id": 7,
            "name": "None"
        },
        {
            "id": 6,
            "name": "Pull-up bar"
        },
        {
            "id": 5,
            "name": "Swiss Ball"
        },
        {
            "id": 2,
            "name": "SZ-Bar"
        }
    ]
    }
  ]
  
  const getListExercise = async (muscles, equipment) => {
    const buildUrl = () => {
      let url = `${process.env.REACT_APP_WGER_API_URL}/exercise/?language=2`
      let muscleQuery = ''
      if(muscles.length > 1){
        muscleQuery += '&muscles='
        for (let i = 0; i < muscles.length; i++) {
          if(i !== muscles.length - 1){
            muscleQuery += `${muscles[i]},`;
          }else{
            muscleQuery += muscles[i]
          }
        }
      }
      let equimentQuery = equipment ? `&equipment=${equipment}` : ''
      url += `${muscleQuery}${equimentQuery}&ordering=id`
      return url
    }
    let url = buildUrl();
    let data = await fetch(url)
    let response = await data.json()
    
    setListExercise(response.results)
  }

  useEffect(()=>{
    getListExercise([], null)
  }, [])

  const isFilterSelected = (categoryKey, optionId) => {
    switch (categoryKey) {
      case 1:
        if(muscleFilter.includes(optionId)){
          return true
        }
        return false
    
      case 2:
        if(equipmentFilter === optionId){
          return true
        }
        return false

      default:
    }
  }

  const onOptionClick = (e, category) => {
    let newMuscleFilter = muscleFilter
    let newEquipmentFilter = equipmentFilter
    switch (category.key) {
      case 1:
        setMuscleFilter(prevState => {
          if(!prevState.includes(parseInt(e.target.id))){
            newMuscleFilter = [...prevState, parseInt(e.target.id)]
          }else{
            newMuscleFilter = prevState.filter(value => value !== parseInt(e.target.id))
          }
          getListExercise(newMuscleFilter, newEquipmentFilter);
          return newMuscleFilter
        })
        break;
      case 2:
        setEquipmentFilter(prevState => {
          newEquipmentFilter = prevState == null || prevState !== parseInt(e.target.id) ?  parseInt(e.target.id) : null
          getListExercise(newMuscleFilter, newEquipmentFilter);
          return newEquipmentFilter
        })
        break;
      default:
    }
  }
  
  const navigateToExercise = (e) => {
    navigate(`/exercise/${e.target.id}`)
  }

  // useEffect(()=>{
  //   const getCategory = async () => {
  //     if(filterCategory.length < 1) {
  //       const categoryCall = await fetch(`${process.env.REACT_APP_WGER_API_URL}/exercisecategory`)
  //       const categoryJson = await categoryCall.json()

  //       setFilterCategory(categoryJson)
  //     }
  //   }
  //   getCategory()
  // },[])

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Excercise</p>
      </header>
      <div className="pageContent">
        <div className="sortBox w-full">
          {
            sortBy.map(category => (
              <div className="w-full" key={category.key}>
                <p>{category.text}:</p>
                <ul className="sortCategory" >
                  {category.options.map(option => (
                    <li className={isFilterSelected(category.key, option.id) ? 'sortOptionSelected' : 'sortOption'} id={option.id} key={option.id} onClick={e => onOptionClick(e, category)}>{option.name}</li>
                  ))}
                </ul>
              </div>
            ))
          }
        </div>
        <div className="listExercise w-full">
          {
            listExercise.map(exercise => (
              <div onClick={e => navigateToExercise(e)} key={exercise.uuid} id={exercise.id} className="exercise">
                <p>{exercise.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default Exercises