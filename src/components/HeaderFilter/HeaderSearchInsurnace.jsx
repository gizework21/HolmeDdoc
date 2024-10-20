import { XMarkIcon, CameraIcon } from "@heroicons/react/20/solid";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import FilterDropdownItem from "./../FilterDropdownItem";

const InsuranceConstant = [
  {
    id: 1,
    title: "I'll choose an insurance later",
  },
  {
    id: 2,
    title: "I'm paying for myself",
  },
];

const InitialState = { id: null, title: "" };

const HeaderSearchInsurance = ({ plans, carriers, isSmallScreen, searchTerm }) => {
  const [focus, setFocus] = useState(false);
  const [carrier, setCarrier] = useState(InitialState);
  const [plan, setPlan] = useState(InitialState);
  const [step, setStep] = useState(0);
  const [insuranceValue, setInsuranceValue] = useState(searchTerm);
  const [isInsuranceSelected, setIsInsuranceSelected] = useState(true);
  const [selectedInsurance, setSelectedInsurance] = useState(
    searchTerm
  );
  const searchEl = useRef();
  const searchInputEl = useRef();
  const [showBtn, setShowBtn] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const filteredCarriers = insuranceValue
    ? [
        carriers.reduce(
          (acc, item) => {
            acc.title = "Matches";
            const filtered = item.options.filter((option) =>
              option.title.toLowerCase().includes(insuranceValue.toLowerCase())
            );
            acc.options = [...acc.options, ...filtered];
            return acc;
          },
          { title: "", options: [] }
        ),
      ]
    : carriers;

  const filteredPlans = insuranceValue
    ? [
        plans.reduce(
          (acc, item) => {
            acc.title = "Matches";
            const filtered = item.options.filter((option) =>
              option.title.toLowerCase().includes(insuranceValue.toLowerCase())
            );
            acc.options = [...acc.options, ...filtered];
            return acc;
          },
          { title: "", options: [] }
        ),
      ]
    : plans;

  const hideSearchOptions = (e) => {
    if (!searchEl.current.contains(e.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", hideSearchOptions, true);

    return () => {
      window.removeEventListener("click", hideSearchOptions, true);
    };
  }, []);

  useEffect(() => {
    if (!insuranceValue) {
      //set showBtn to true
      setShowBtn(true);
      return;
    }
    if (showBtn && insuranceValue) {
      setShowBtn(false);
    }
  }, [insuranceValue]);

  const handleCarrierSelected = (seletedCarrier) => {
    setInsuranceValue("");
    setCarrier(seletedCarrier);
    setStep(1);
  };

  const handlePlanSelected = (selectedPlan) => {
    setPlan(selectedPlan);
    setFocus(false);
    setInsuranceValue(`${carrier.title}-${selectedPlan.title}`);
    setSelectedInsurance(`${carrier.title}-${selectedPlan.title}`);
    setIsInsuranceSelected(true);
    setFullScreen(false);
  };

  const handleChangeInsuranceClick = () => {
    setPlan(InitialState);
    setCarrier(InitialState);
    setStep(0);
    setInsuranceValue("");
    setIsInsuranceSelected(false);
  };

  const handleNoInsuranceSelected = (item) => {
    setSelectedInsurance(item);
    handleSelectPreviousInsurance(item);
  };

  const handleSelectPreviousInsurance = (prevInsurance) => {
    //when insurance was selected before but input was clicked again and then same
    //insurance selected again which was selected previously
    setInsuranceValue(prevInsurance);
    setIsInsuranceSelected(true);
    setFocus(false);
    setFullScreen(false);
  };

  const handleFocus = () => {
    setInsuranceValue("");
    if (focus) return;
    setFocus(true);
    //768 is md
    if (isSmallScreen) {
      setFullScreen(true);
    }
  };

  useEffect(() => {
    if (!isSmallScreen) {
      setFullScreen(false);
    }
  }, [isSmallScreen]);

  const removeShowFullScreen = () => {
    setFullScreen(false);
    setFocus(false);
  };

  const searchTermChange = (e) => {
    setInsuranceValue(e.target.value);
    setShowBtn(false);
    if (plan.id && carrier.id) {
      setPlan(InitialState);
      setCarrier(InitialState);
      setStep(0);
      setIsInsuranceSelected(false);
    } else if (carrier.id) {
      setPlan(InitialState);
      setIsInsuranceSelected(false);
    } else {
      setPlan(InitialState);
      setIsInsuranceSelected(false);
    }
  };

  return (
    <>
      <div
        ref={searchEl}
        className="w-[30%] relative"
        onFocus={(e) => setFocus(true)}
      >
        <input
          onFocus={handleFocus}
          value={insuranceValue}
          onChange={searchTermChange}
          type="text"
          className="h-[2.5rem] text-size-7 w-full px-2 focus:outline-none active:outline-none"
          ref={searchInputEl}
          placeholder={"Insurance carrier and plan"}
        />
        {focus && (
          <div className="absolute z-50 mt-1 px-6 min-w-[25rem] rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {!isInsuranceSelected && showBtn && (
              <div className="flex items-center justify-center py-2">
                <button
                  className={`${
                    step === 0
                      ? "border border-primary bg-primary text-white"
                      : "bg-transparent border border-primary text-primary"
                  } py-3 px-4 w-full border-r-none`}
                  onClick={() => setStep(0)}
                >
                  1. Choose carrier
                </button>
                <button
                  className={`${
                    step === 1
                      ? "border border-primary bg-primary text-white"
                      : "bg-transparent border border-primary text-primary"
                  } py-3 px-4 w-full relative border-l-none`}
                  disabled={!carrier.id}
                  onClick={() => setStep(1)}
                >
                  <span
                    className={step === 0 ? "clip_blue" : "clip_white"}
                  ></span>
                  2. Choose plan
                </button>
              </div>
            )}
            {!!carrier.id && !isInsuranceSelected && (
              <h1 className="text-2xl pb-2 text-primary">{carrier.title}</h1>
            )}
            {isInsuranceSelected && (
              <h1
                className="py-2 text-primary hover:bg-pink-50 cursor-pointer"
                onClick={() => handleSelectPreviousInsurance(selectedInsurance)}
              >
                {selectedInsurance}
              </h1>
            )}
            {isInsuranceSelected && (
              <button
                className="text-blue-500 py-2 border-t-2 w-full flex hover:underline"
                onClick={handleChangeInsuranceClick}
              >
                choose a differnet insurance
              </button>
            )}
            {!isInsuranceSelected && (
              <div className="overflow-auto max-h-60 ">
                {step === 0 && showBtn && !isInsuranceSelected && (
                  <h1
                    className="mb-2 text-primary hover:bg-pink-50 cursor-pointer"
                    onClick={() =>
                      handleNoInsuranceSelected("I'm paying for myself")
                    }
                  >
                    {"I'm paying for myself"}
                  </h1>
                )}
                {step === 0 && showBtn && !isInsuranceSelected && (
                  <h1
                    className="mb-2 text-primary hover:bg-pink-50 cursor-pointer"
                    onClick={() =>
                      handleNoInsuranceSelected(
                        "I'll choose my insurance later"
                      )
                    }
                  >
                    {"I'll choose my insurance later"}
                  </h1>
                )}
                {step === 0 &&
                  filteredCarriers.map((item) => (
                    <div key={item.id} className="mb-2">
                      <h1 className="text-gray-500">{item.title}</h1>
                      <div>
                        {item.options.map((option) => (
                          <FilterDropdownItem
                            selectedId={carrier.id}
                            key={option.id}
                            option={option}
                            handleItemSelected={handleCarrierSelected}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                {step === 1 &&
                  filteredPlans.map((item) => (
                    <div key={item.id} className="mb-2">
                      <h1 className="text-gray-500 text-size-6">
                        {item.title}
                      </h1>
                      <div>
                        {item.options.map((option) => (
                          <FilterDropdownItem
                            selectedId={plan.id}
                            key={option.id}
                            option={option}
                            handleItemSelected={handlePlanSelected}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderSearchInsurance;
