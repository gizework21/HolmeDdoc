import React from "react";
import { useNavigate } from "react-router-dom";
import { setSelectedFilters } from "../redux/doctor/doctor.reducer";
import { useDispatch } from "react-redux";

function ComplexSvgContainer(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSpecialityClick = () => {
    // dispatch(setSelectedFilters(
    //   { selected: [props.id], filterName: 'medical_speciality_name' }
    // ))
    navigate(`/doctorsearch?specialty=${props.seo_url}`);
  };

  return (
    <div
      className={`flex flex-col items-center md:items-start justify-between
       rounded-3xl ${
         props.shadowOnHover &&
         `pt-6 ${
           props.customPadding ?? "md:pl-6 pr-0"
         } hover:border-blueBg speciality-card__shadow`
       } border border-white hover:cursor-pointer md:max-w-[15rem] ${
        props.height
      } ${props.width} ${props.customPadding}`}
      onClick={handleSpecialityClick}
    >
      {props.children}
      <div className="h-full flex flex-col items-start mt-8">
        <div className="h-[fit-content] md:h-[6rem] lg:h-[6.6rem]">
          <div
            className={`text-center md:text-left  ${props.titleHeight} md:text-[22px] text-gray-800 font-sharp-sans-bold   md:leading-[32px] tracking-[0.2rem] sm:line-clamp-2 xl:line-clamp-3`}
          >
            {props.name}
          </div>
        </div>
        <div className="hidden md:block md:text-[1rem] lg:text-[1.18rem] h-full w-full">
          <p
            className={`leading-7 font-basic-sans-regular text-paragraphColor ${
              props.shadowOnHover && "md:pr-5"
            }`}
          >
            {props.details}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComplexSvgContainer;
