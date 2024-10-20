import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const MobileFooterDropdown = ({
  item: { title, links, type, content },
  selectedItem,
  index,
  handleItemSelected,
}) => {
  //   const [showLinks, setShowLinks] = useState(false)
  const showLinks = selectedItem === index;
  const icon = showLinks
    ? require("../assets/images/icons/Minus.png")
    : require("../assets/images/icons/Add.png");

  const iconAws = showLinks ? "/icons/Minus.png" : "/icons/Add.png";
  const handleSelected = () => {
    if (showLinks) {
      handleItemSelected(null);
      return;
    }
    handleItemSelected(index);
  };
  const handleClick = (item) => {
    if (item.type === "phone") {
      window.open(`tel:${item.title}`);
    } else if (item.type === "email") {
      // console.log('open')
      window.open(`mailto:${item.title}`);
    }
  };
  return (
    <div className="border-b py-5 border-gray-300">
      <div
        className="flex items-center justify-between"
        onClick={handleSelected}
      >
        <h1 className="text-black font-black text-size-2">{title}</h1>
        <Image
          className={`${showLinks ? "h-[2px]" : "h-2.5"}`}
          src={iconAws}
          staticUrl={icon}
          alt="icon"
        />
      </div>
      {showLinks &&
        (type === "links" ? (
          <ul className="pt-3 space-y-1">
            {links.map((item, idx) => (
              <li
                key={idx}
                className={`text-size-5 text-gray-800 ${
                  item.highlight ? "font-black" : "font-light"
                } tracking-[1.5px]`}
              >
                {item.type !== "link" ? (
                  <span
                    onClick={() => handleClick(item)}
                    className="active:opacity-[0.5] cursor-pointer"
                  >
                    {item.title}
                  </span>
                ) : (
                  <Link to={item.url}>{item.title}</Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="pt-4 text-size-3 font-light text-gray-900">{content}</p>
        ))}
    </div>
  );
};

export default MobileFooterDropdown;
