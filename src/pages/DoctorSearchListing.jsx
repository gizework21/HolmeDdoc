import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import zerodoctor from "../assets/images/zerodoctor.png";
import DoctorList from "../components/DoctorList";
import HolmeddocLoader from "../components/HolmeddocLoader.jsx";
import Image from "../components/Image";
import MobileSearchDrawer from "../components/MobileSearchDrawer";
import MobileSearchFilterDrawer from "../components/MobileSearchFilterDrawer";
import SearchBar from "../components/SearchBar";
import SearchFilter from "../components/SearchFilter";
import usePreviousValue from "../hooks/usePreviousValue";
import useQuery from "../hooks/useQuery";
import NavbarWithFilter from "../parts/NavbarWithFilter";
import NewFooter from "../parts/NewFooter";
import { fetchDoctorsThunk } from "../redux/doctor/doctor.actions";
import { setAppointmentType, setCurrentPage, setSearchTermValue, setSelectedMobileFilters } from "../redux/doctor/doctor.reducer";
import { toggleFilterDrawer } from "../redux/sidebar";
import { decrypt } from "../utils/crypto";
import { VisitType } from "../utils/DummyData";

const PageSize = 4;

export const mapping = {
  "filter_appointment_type": "appointment_type",
  "filter_insurance": "insurance_company_name",
  "filter_language": "language_title",
  "filter_conditions": "medical_condition_name",
  'filter_specialty': "medical_speciality_name"
}

function DoctorSearchListing(props) {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const query = useQuery()

  const {
    totalCount: totalDoctorsFound,
    isFailed: isDoctorFetchingFailure,
    isFetching: isDoctorFetching,
    selectedFilters: appliedFilters,
    currentPage,
    searchTerm,
  } = useSelector((state) => state.doctor);
  const location = query.get('location')
  console.log("🚀 ~ file: DoctorSearchListing.jsx:46 ~ DoctorSearchListing ~ location:", location)


  
  const selectedDate = query.get('selected_date')
  const master = useSelector(state => state.master)

  const prevSearchTerm = usePreviousValue(searchTerm,"");
  const prevAppliedFilters = usePreviousValue(appliedFilters,{});
  const prevCurrentPage = usePreviousValue(currentPage,1);
  const prevLocation = usePreviousValue(location, null);
  const prevSelectedDate = usePreviousValue(selectedDate, null);

  const selectedAppointmentType = useSelector(
    (state) => state.doctor.selectedFilters?.appointment_type
  );
  const firstRender = useRef(true);
  const handleSearch = (searchTerm) => dispatch(setSearchTermValue(searchTerm))


  useEffect(() => {
    const arr = ['filter_specialty', 'filter_conditions', "filter_insurance", "filter_language", "filter_appointment_type"]
    const filtersFromUrl = {}
    arr.forEach(el => {
      const values = query.get(el)
      if(values){
        filtersFromUrl[mapping[el]] = decrypt(values).split(',').map(el => parseInt(el))
      }
    })
    if(query.get('specialty')){
      const arrA = filtersFromUrl[mapping['filter_specialty']] ?? []
      // const arrB =  appliedFilters['medical_speciality_name'] ?? []
      const searchedSpeciality = master.specialities.find(el => el.seo_url === query.get('specialty'))
      if(searchedSpeciality){
        filtersFromUrl[mapping['filter_specialty']] = [...new Set([searchedSpeciality.id, ...arrA])]
      }else{
        filtersFromUrl[mapping['filter_specialty']] = [...new Set([...arrA])]
      }
    }
    if(query.get('condition')){
      const arrA = filtersFromUrl[mapping['filter_conditions']] ?? []
      // const arrB =  appliedFilters['medical_condition_name'] ?? []
      const searchedCondition = master.conditions.find(el => el.seo_url === query.get('condition'))
      if(searchedCondition){
        filtersFromUrl[mapping['filter_conditions']] = [...new Set([searchedCondition.id, ...arrA])]
      }else{
        filtersFromUrl[mapping['filter_conditions']] = [...new Set([...arrA])]
      }
      // filtersFromUrl[mapping['filter_conditions']] = [...new Set([...arrB, ...arrA])]
    }
    if(query.get('visit_type')){
      const selectedType = VisitType.find(el => el.title === query.get('visit_type'))
      if(selectedType){
        const arrA = filtersFromUrl[mapping['filter_appointment_type']] ?? []
        // const arrB =  appliedFilters['appointment_type'] ?? []
        filtersFromUrl[mapping['filter_appointment_type']] = [...new Set([selectedType.id - 1, ...arrA])]
      }
    }
    dispatch(setSelectedMobileFilters(filtersFromUrl))
  }, [])

  useEffect(() => {
    (async () => {
      if (firstRender.current && JSON.stringify(appliedFilters) === '{}') {
        firstRender.current = false;
        return;
      }
      if((JSON.stringify(appliedFilters) === '{}' && JSON.stringify(prevAppliedFilters ?? {}) === '{}') && searchTerm === prevSearchTerm && location === prevLocation && selectedDate === prevSelectedDate){
        return
      }
      if (currentPage !== 1) {
        dispatch(setCurrentPage(1));
      }
      if (
        searchTerm !== prevSearchTerm ||
        JSON.stringify(appliedFilters) !== JSON.stringify(prevAppliedFilters) ||
        location !== prevLocation ||
        selectedDate !== prevSelectedDate
      ) {
        dispatch(
          fetchDoctorsThunk({
            paginate: PageSize,
            page: 1,
            appliedFilters,
            searchTerm,
            location: query.get('location'),
            selectedDate
          })
        );
      }
    })();
  }, [appliedFilters, searchTerm, location, selectedDate]);

  useEffect(() => {
    (async () => {
      if(currentPage === prevCurrentPage && (query.get('condition') || query.get('specialty') || query.get('filter_specialty') || query.get('filter_conditions') || query.get('filter_language') || query.get('filter_appointment_type') || query.get('filter_insurance'))){
        return
      }
      dispatch(
        fetchDoctorsThunk({
          paginate: PageSize,
          page: currentPage,
          appliedFilters,
          searchTerm,
          location: query.get('location'),
          selectedDate
        })
      );
    })();
  }, [dispatch, currentPage]);


  const {
    doctorFilters: filterOptions,
    isFetching: isFilterFetching,
    isFailed: isFilterFetchingFailure,
  } = useSelector((state) => state.filters);

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  const buttonRef = useRef(null);

  const handleFilterClicked = (item) => {
    if (item === "Filters") {
      dispatch(toggleFilterDrawer());
    } else if (item === "In Person") {
      dispatch(setAppointmentType(0));
    } else if (item === "Virtual") {
      dispatch(setAppointmentType(1));
    }
  };
  const isFetching = isFilterFetching;
  const isFailure = isDoctorFetchingFailure || isFilterFetchingFailure;

  const divRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0);
  }, []);

  return (
    <>
      <div
        className="max-w-[100vw] focus:outline-none"
        tabIndex={0}
        ref={divRef}
        id="test"
      >
        <NavbarWithFilter />
      </div>
      {isFailure && !isFetching && (
        <div className="w-full flex flex-col items-center justify-center py-10">
          <h1 className="text-size-12">Aaah! Something went wrong</h1>
          <span>Brace yourself till we get the error fixed.</span>
          <span>You may also refresh the page or try again later</span>
        </div>
      )}
      {isFetching && (
        <div className="w-full flex justify-center">
          <HolmeddocLoader />
        </div>
      )}
      {!isFetching && !isFailure && (
        <div className={`flex lg:justify-center lg:items-center`}>
          <div className="w-full 3xl:max-w-[1600px] px-4 pt-6 md:px-6 xl:px-10">
            <div className="md:hidden space-y-5 mb-4">
              <SearchBar handleSearch={handleSearch}/>
              <div className="flex items-center space-x-2">
                {["In Person", "Virtual", "Filters"].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleFilterClicked(item)}
                    className={`w-full rounded-2xl border ${
                      selectedAppointmentType?.includes(idx)
                        ? "border-green bg-green text-white"
                        : "border-gray-500 text-gray-800"
                    } flex items-center justify-center h-7  tracking-[1px] font-light text-size-2`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <h1
              className="font-basic-sans-regular md:leading-[70px] font-bold
    text-size-5 md:h-[86px] md:text-[24px] text-gray-800 tracking-[2px] pt-2 pb-4 md:py-2 border-b-2 border-gray-200 md:border-b-0"
            >
              {!isDoctorFetching && (
                <>
                  We have found {totalDoctorsFound} Doctors for your search
                  criteria.
                </>
              )}
            </h1>
            <div className=" flex flex-col md:flex-row items-start justify-start h-full">
              <div className="hidden md:flex flex-col items-start justify-start col-span-3 lg:col-span-2 p-1 sm:p-2 sm:pr-1">
                <div className="text-size-8 font-basic-sans-regular font-normal flex flex-row items-center justify-start">
                  <p className="tracking-[3px] text-gray-900">Filters</p>
                </div>
                <div className=" mt-0  md:block hidden w-[15rem] h-full border-gray-300">
                  {filterOptions.map((item) => (
                    <SearchFilter
                      key={item.title}
                      list={item.value}
                      showLimit={
                        item.title !== "Specialty" &&
                        item.title !== "Conditions" &&
                        3
                      }
                      title={item.title}
                    />
                  ))}
                </div>
                <MobileSearchFilterDrawer filterOptions={filterOptions} />
                <MobileSearchDrawer />
              </div>
              <div className="block md:flex flex-col w-full md:border-l md:pl-5"> 
                <DoctorList />

                {/* show no doctors found with image when count is 0 */}
                {!isDoctorFetching ? (
                  totalDoctorsFound === 0 ? (
                    <>
                      <Image className="h-96 w-auto m-auto object-contain" alt={"zerodoctor"} src={'/home/zerodoctor.png'} staticUrl={zerodoctor} />
                      <h1 className="text-center pt-5 text-gray-500 tracking-widest font-bold text-2xl">
                        Sorry ! No Doctors Found
                      </h1>
                    </>
                  ) : null
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
      <NewFooter />
    </>
  );
}

export default DoctorSearchListing;
