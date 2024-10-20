import React from "react";

function SpecialityPageContent(props) {
  const list = [
    {
      name: "Dentist",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Physician",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Cardiologist",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Oncologist",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Nephrologist",
      details:
        " Lorem Ipsum has been the industry's s dummy been the industry's standard dummy",
    },
    {
      name: "Psycotherapist",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Cosmetologist",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Psychiatrist",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Neurosurgeon",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Endocriologist",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Diabetologist",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
    {
      name: "Pediatrician",
      details:
        " Lorem Ipsum has been the industry's standard dummy been the industry's standard dummy",
    },
  ];
  return (
    <div className="px-6 md:px-10 lg:px-16 xl:px-20 lg:py-16 sm:py-16 py-10 flex flex-col gap-3">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-slate-700 font-sharp-sans-bold md:text-4xl sm:text-3xl text-2xl md:mb-10 mb-8 tracking-[.35rem]">
          Specialty
        </h1>
        <p className="text-gray font-sharp-sans md:text-base text-sm text-center md:mb-10 mb-8 tracking-normal">
          Every medical specialist shares one common goal: to help patients get
          healthy or stay healthy. But each one has very specific skills and
          competencies that make them an integral member of the medical field.
          <br /> Browse through each speciality and select as per your need.{" "}
        </p>
      </div>
      {/* <div className="w-[100%]  grid grid-rows-3 md:grid-rows-2 lg:grid-rows-1 grid-flow-col gap-2"> */}
      <div className="  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12">
        {list.map(({ name, details }, key) => {
          return (
            <div className="flex justify-center flex-col  " key={key}>
              <div className="flex justify-center items-center  mb-10">
                <img
                  // src={require("../assets/images/image.png")}
                  src={require("../../assets/images/image.png")}
                  className="w-[100%] h-auto max-w-[7rem] "
                  alt="speciality"
                />
              </div>
              <div className="text-2xl text-slate-700 md:pb-5 pb-4 tracking-[.25rem] grid justify-self-start items-self-start ">
                {name}
              </div>
              <div className="text-gray md:text-base text-sm font-sharp-sans line-clamp-3 ">
                {details}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpecialityPageContent;
