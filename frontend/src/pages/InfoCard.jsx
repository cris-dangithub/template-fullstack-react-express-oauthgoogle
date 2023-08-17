import React from 'react'
import { Outlet } from 'react-router-dom'

const InfoCard = () => {
  return (
    <div className='info-card'>InfoCard
    
    <Outlet />
    </div>
  )
}

export default InfoCard