import React from 'react'
import Header from './Header'

const Contact = () => {
  return (
    <>
    <Header/>
    <div className='d-flex align-items-center mainLayout'>
        <img  src="/images/5124556.jpg" width={750} alt="" />
      <div class=" my-md-4 my-2 mx-auto">
      <h3 class="fw-bold underline ps-5">Contact Us</h3>
     <div class="row text-center mx-auto"> 
          <div class="mx-auto col-10 col-md-8 col-lg-10 my-4">
            <input
              type="text"
              name="firstName"
              id="firstName"
              class="form-control"
              placeholder="Name"
            />
          </div>
        
          </div>
          <div class="row text-center  mx-auto">
            <div class="mx-auto col-10 col-md-8 col-lg-10 ">
              <input
                type="email"
                name="Email"
                id="firstName"
                class="form-control"
                placeholder="Email"
              />
            </div>
          
            </div>
       
      
      <div class="row text-center mt-4 mx-auto">
        <div class="mx-auto col-10 col-md-8 col-lg-10 ">
            <textarea
              class="form-control"
              id=""
              cols="60"
              rows="10"
              placeholder="Message"
            ></textarea>
           
          </div>
          </div>
          <div class="row text-center mt-2 ">
            <div class=" col-10 col-md-12 col-lg-10 ">
              <button class="btn btn-primary  my-2  btn-form " type="submit">Submit</button>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Contact