import { useState, useEffect } from "react"
import Spinner from "../components/Spinner"

function Exercises() {
  const [filterCategory, setFilterCategory] = useState({
    muscle: [],
    equipment: []
  })

  const sortBy = [
    {
      key: 1,
      text: 'Muscle Group',
      name: 'muscle',
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
      name: 'equipment',
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

  const isFilterSelected = (categoryKey, optionId) => {

  }

  const onOptionClick = (e) => {
    
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
                    <li className="sortOption" key={option.id} onClick={onOptionClick}>{option.name}</li>
                  ))}
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default Exercises