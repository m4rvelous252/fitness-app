import {IconContext} from 'react-icons'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

function Icon({value}) {
  return (
    <IconContext.Provider value={value}
    >
      <div>
        <Outlet></Outlet>
      </div>
    </IconContext.Provider>
  )
}
export default Icon