import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'

const About = () => {
  return (
    <>
    <Header>
  <Container>
  <img id="AboutImg" src="image/a4.webp" alt="about-us" />
    <br /><br />
    <h2>What we do</h2>

    <p id="aboutPara">
      FlipKart is an online shopping website that facilitate its user to buy and
      sell their products. This is vital if you want to build friendly
      relationships with your site’s visitors. This tool will let you generate
      about us pages with ease. It doesn’t do you any good to hide behind a
      cloak of a website because today’s customers are curious, and rightly so.
      This is even more true if you have an online shop. People want to know who
      they are doing business with. <br />

      While a clever handle on social media or an avatar game is fun and cool,
      not letting people know who you are on your own site can cost you real
      money. This about us page generator was designed so you can get a nice
      quick professional writing of who you are and will let you make a great
      introduction of yourself in a professional manner. Use this amazing about
      generator for website content that you can copy and paste on your site. It
      only takes about 5 minutes to complete a page!
    </p>
    <br />
    <hr />
    <br />
    <div class="cartDiv">
      <img src="image/a3.png" alt="about-us" style="align-items: center" />
      <br />
      <hr />
      <hr />
      <img src="image/a2.png" alt="about-us" />
    </div>
  </Container>
  </Header>
  </>
  )
}

export default About