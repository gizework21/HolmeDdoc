import React, { useEffect, useState } from "react";

function MainHeaderText(props) {
  const arr = [
    "doctors",
    "dentists",
    "dermatologists",
    "doctors4",
    "doctors5",
    "doctors6",
  ];
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timer = () => {
      setCounter((counter) => {
        if (counter >= 5) {
          return 0;
        } else {
          return counter + 1;
        }
      });
    };
    let id = setInterval(timer, 3300);
    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    let el = document.getElementById("movingText");
    el.classList = "removeText";
    setTimeout(() => {
      el.innerText = arr[counter];
      el.classList = "showText";
    }, 2000);
  }, [counter]);

  return (
    <div className=" px-6 md:px-10 lg:px-16 xl:px-20 lg:pt-20 pt-5 MainHeaderText bg-[#DCE9FD]">
      <p className="text-nowrap">
        Find local <span id="movingText">doctors</span>
      </p>
      <p>who take your insurance</p>
    </div>
  );
}

export default MainHeaderText;
