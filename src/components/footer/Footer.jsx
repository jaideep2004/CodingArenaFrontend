import React from 'react'
import './footer.css'
import '../header/header.css'

export default function Footer() {
  return (
      <div className='mainfootcontainer'>
          <div className='footcontainer1'>
              Coding Arena
          </div>
          <div className='footcontainer2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, nisi inventore quisquam ipsam a omnis rem error nulla. Nemo eos sequi tempora dolorum ad vitae nulla, itaque officia sint amet.
          </div>
          <div className='footcontainer3'>
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-x-twitter"></i>
              <i class="fa-brands fa-google"></i>
              <i class="fa-brands fa-linkedin"></i>
          </div>
          <div className='footcontainer4'>
              Copright <i class="fa-solid fa-copyright"></i>Coding Arena
          </div>

    </div>
  )
}
