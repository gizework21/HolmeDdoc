import React from "react";
import Accordion from "../components/Accordion";
import { Visit } from "../utils/DummyData";

function VisitReason() {
  return (
    <>
      <div className="px-6 md:px-10 lg:px-16 xl:px-20 py-20  bg-[#f7f8f9]">
        <h1 className="text-2xl font-sharp-sans-bold">Common visit reasons</h1>
        <div className=" pt-10 lg:grid lg:grid-rows-1 lg:grid-flow-col grid-col-1 lg:gap-4">
          {Visit.map((item, index) => {
            const { title, options } = item;
            return (
              <div key={index} className="mb-4">
                <Accordion title={title} options={options} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default VisitReason;
