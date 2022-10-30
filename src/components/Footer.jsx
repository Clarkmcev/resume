import React from 'react'
import { BsGithub, BsLinkedin, BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs';
import { SiCodewars } from 'react-icons/si';

function Footer() {
  return (
    <>
    <div className="text-third fixed left-0 bottom-0 w-full text-center bg-first p-5">
        <div className="networks">
        <a href="https://github.com/Clarkmcev"><BsGithub className="link"/></a>
        <a href="https://www.linkedin.com/in/clark-mcevoy-904378150/"><BsLinkedin className="link"/></a>
        <a href="https://twitter.com/clarkmcev"><BsTwitter className="link"/></a>
        <a href="https://www.facebook.com/clark.mcevoy.5/"><BsFacebook className="link"/></a>
        <a href="instagram"><BsInstagram className="link"/></a>
        <a href="https://www.codewars.com/users/ClarkMC"><SiCodewars className="link"/></a>
    </div>
    <div className="relative">mcevoyclark@gmail.com</div>
    </div>
    </>
  )
}

export default Footer