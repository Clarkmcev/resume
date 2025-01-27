import React, { useEffect, useState } from "react";

function Footer() {
  const [commitsNumber, setCommitsNumber] = useState("0");

  fetch(
    "https://api.github.com/repos/Clarkmcev/resume/commits?sha=main&per_page=1&page=1'"
  ).then((response) => {
    response.json();
    console.log(response);
    setCommitsNumber(response.url);
  });

  useEffect(() => {
    console.log(commitsNumber);
  }, []);

  const splitString = (string) => {
    return string.split("page=1%").pop();
  };

  return (
    <div className="fixed bottom-0 text-third text-center w-full p-2 bg-first italic font-thin border-t-2 border-second">
      <span className="hover:text-fourth cursor-pointer hover:-translate-y-10">
        Developed & designed by Clark McEvoy
      </span>
      <div>Number of commits {splitString(commitsNumber)}</div>
    </div>
  );
}

export default Footer;
