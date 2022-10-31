import React from 'react'
import { BsGithub, BsLinkedin, BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs';
import { SiCodewars } from 'react-icons/si';

function Footer() {
  return (
    <div className="flex flex-col items-center bg-first p-2 bottom-0 w-full h-14">
      <div className="text-third flex space-x-2">
          <a href="https://github.com/Clarkmcev"><BsGithub className="link"/></a>
          <a href="https://www.linkedin.com/in/clark-mcevoy-904378150/"><BsLinkedin className="link"/></a>
          <a href="https://twitter.com/clarkmcev"><BsTwitter className="link"/></a>
          <a href="https://www.facebook.com/clark.mcevoy.5/"><BsFacebook className="link"/></a>
          <a href="instagram"><BsInstagram className="link"/></a>
          <a href="https://www.codewars.com/users/ClarkMC"><SiCodewars className="link"/></a>
      </div>
      <div>
        <div className="relative">mcevoyclark@gmail.com</div>
      </div>
    </div>
  )
}

export default Footer