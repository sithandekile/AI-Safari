import React from 'react'

export const Navbar = () => {
  return (
        <nav className='flex justify-between items-center p-4'>
            <div className="text-green-500 font-bold"><span className='bg-amber-50 rounded-full'>🎙️</span>Voice<span className='text-amber-500'>First</span></div>
            <ul class="nav-links">
                <li><a href="#problem">Help</a></li>
            </ul>
            <button class="nav-cta">Get early access</button>
        </nav>
  
  )
}
