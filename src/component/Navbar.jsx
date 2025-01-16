import React from 'react'
import { NavLink,Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-400'>
        <ul className='flex gap-4 px-3'>
            
            <NavLink className={(e)=>{ return e.isActive?"bg-slate-500 text-white":""}} to='/'> <li className='my-5 mx-2 text-xl'>Home</li></NavLink>
            <NavLink className={(e)=>{ return e.isActive?"bg-slate-500 text-white":""}}  to='/contact'> <li className='my-5 mx-2 text-xl'>Contact</li></NavLink>
            <NavLink className={(e)=>{ return e.isActive?"bg-slate-500 text-white":""}} to='/about'> <li className='my-5 mx-2 text-xl'>About us</li></NavLink>
            <NavLink className={(e)=>{ return e.isActive?"bg-slate-500 text-white":""}} to='/feedback'> <li className='my-5 mx-2 text-xl'>Feedback</li></NavLink>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
