import React from 'react'
import { Button, Col, Container,  Row } from 'react-bootstrap'

import { NavLink } from 'react-router-dom'
import Header from './Header'
const Banner = () => {
  return (
    <>
    <section className='showcase'> 
    <div className="overlay">
     
      <Header/>
        <Container>
     <section className="landing">
      <div className="landing-content animate__animated animate__heartBeat">   
      <div className="small-heading">
        Sale is live Now!</div>   
        <div className="large-heading">
          <span>Flat 70% OFF</span> 
          <br />
          Winter Sale </div>  
          <Button className='mt-3'>Shop Now!</Button>
      </div>
      
     </section>
     
        </Container>

      </div>


    </section>
     
  
    </>
  )
}

export default Banner