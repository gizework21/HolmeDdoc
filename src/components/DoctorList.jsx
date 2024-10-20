import React, { useEffect, useState, useRef } from "react";
import CustomPagination from "./CustomPagination";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DoctorDesc from "./DoctorDesc";
import HolmeddocLoader from "./HolmeddocLoader";
import { setCurrentPage } from "../redux/doctor/doctor.reducer";

function Items({ currentItems }) {
  console.log(currentItems)
  
  return (
    <>
      {currentItems &&
        currentItems.map((item, key) => (
          <div key={key}>
            <div
              className={`m-2 pb-5 pt-5 ${
                (key + 1) % 4 !== 0
                  ? "border-b-2 md:border-b"
                  : "border-b-2 md:border-b-0"
              } border-gray-200`}
              key={key}
            >
              <DoctorDesc info={item} />
            </div>
          </div>
        ))}
    </>
  );
}

const PageSize = 4;

const DoctorList = ({ }) => {
  const {
    list,
    totalCount,
    currentPage
  } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();


  const state = useSelector((state) => state.doctor);


  const handlePageChanges = (page) => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(page));
  };



  if(state.isFetching === true) return (<HolmeddocLoader />)

  return (
    <>
      <Items currentItems={list} />
      <CustomPagination
        currentPage={currentPage}
        totalCount={totalCount ?? 1}
        pageSize={PageSize}
        onPageChange={handlePageChanges}
      />
    </>
  );
};

export default DoctorList;
