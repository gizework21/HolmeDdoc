import React from "react";
import FormContainer from "../../components/FormContainer";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const navigate = useNavigate();
  return (
    <FormContainer
      formTitle={"Profile Details"}
      rBtnText={"Edit Profile"}
      profilePage
      nextStep={() => navigate("/myProfile/edit")}
    >
      <div className="w-full flex items-center justify-center">
        <div className="border-green border xl:w-[32rem] p-5 lg:p-2 xl:p-5 flex flex-col rounded-xl">
          <h1 className="text-xl font-bold self-center py-5">
            Alexander O. Babazadeh
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4  items-end border border-green rounded-xl text-gray-900">
            <div className="h-full flex flex-col items-center justify-center py-3  space-y-1 border-b md:border-b-0 border-r border-green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="1088 719 48 48"
              >
                <g data-name="Unkown">
                  <path
                    d="M1112 719a24 24 0 0 1 24 24 24 24 0 0 1-24 24 24 24 0 0 1-24-24 24 24 0 0 1 24-24"
                    fill="#F7F8F9"
                    fillRule="evenodd"
                    data-name="Rectangle 405"
                  />
                  <g data-name="Group 341">
                    <path
                      d="m1107.166 744.84-6.666 6.666"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Line 54"
                    />
                    <path
                      d="m1101.372 745.784 4.85 4.85"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Line 55"
                    />
                    <path
                      d="M1108.103 743.827a7.713 7.713 0 1 1 .07.07"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Ellipse 20"
                    />
                  </g>
                </g>
              </svg>
              <span className="text-xs">FEMALE</span>
            </div>
            <div className="h-full flex flex-col items-center justify-center py-3 space-y-1 border-b md:border-b-0 md:border-r  border-green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="1088 719 48 48"
              >
                <g data-name="Unkown">
                  <path
                    d="M1112 719a24 24 0 0 1 24 24 24 24 0 0 1-24 24 24 24 0 0 1-24-24 24 24 0 0 1 24-24"
                    fill="#F7F8F9"
                    fillRule="evenodd"
                    data-name="Rectangle 405"
                  />
                  <g data-name="Group 341">
                    <path
                      d="m1107.166 744.84-6.666 6.666"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Line 54"
                    />
                    <path
                      d="m1101.372 745.784 4.85 4.85"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Line 55"
                    />
                    <path
                      d="M1108.103 743.827a7.713 7.713 0 1 1 .07.07"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Ellipse 20"
                    />
                  </g>
                </g>
              </svg>
              <span className="text-xs">YEARS OLD</span>
            </div>
            <div className="h-full flex flex-col items-center justify-center py-3 space-y-1  border-r border-green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="1088 719 48 48"
              >
                <g data-name="Unkown">
                  <path
                    d="M1112 719a24 24 0 0 1 24 24 24 24 0 0 1-24 24 24 24 0 0 1-24-24 24 24 0 0 1 24-24"
                    fill="#F7F8F9"
                    fillRule="evenodd"
                    data-name="Rectangle 405"
                  />
                  <g data-name="Group 341">
                    <path
                      d="m1107.166 744.84-6.666 6.666"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Line 54"
                    />
                    <path
                      d="m1101.372 745.784 4.85 4.85"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Line 55"
                    />
                    <path
                      d="M1108.103 743.827a7.713 7.713 0 1 1 .07.07"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Ellipse 20"
                    />
                  </g>
                </g>
              </svg>
              <span className="text-xs">+1 780005412</span>
            </div>
            <div className="h-full flex flex-col items-center justify-center  py-3 space-y-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="1088 719 48 48"
              >
                <g data-name="Unkown">
                  <path
                    d="M1112 719a24 24 0 0 1 24 24 24 24 0 0 1-24 24 24 24 0 0 1-24-24 24 24 0 0 1 24-24"
                    fill="#F7F8F9"
                    fillRule="evenodd"
                    data-name="Rectangle 405"
                  />
                  <g data-name="Group 341">
                    <path
                      d="m1107.166 744.84-6.666 6.666"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Line 54"
                    />
                    <path
                      d="m1101.372 745.784 4.85 4.85"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Line 55"
                    />
                    <path
                      d="M1108.103 743.827a7.713 7.713 0 1 1 .07.07"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="3"
                      stroke="grey"
                      fill="transparent"
                      data-name="Ellipse 20"
                    />
                  </g>
                </g>
              </svg>
              <span className="text-xs">xyz@gamil.com</span>
            </div>
          </div>
          <div className="py-3">
            <div className="flex items-center space-x-3 py-5">
              <div className="basis-[10%]">
                <div className="h-12 w-12 rounded-full bg-lightgrey flex items-center justify-center">
                  <MapPinIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="text-[1rem] flex-1 font-light space-y-1">
                <h1 className="text-grey">Address</h1>
                <p>14 Street Medical P.C. 110 W 14th St New York, NY 10011</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 py-5">
              <div className="basis-[10%]">
                <div className="h-12 w-12 rounded-full bg-lightgrey flex items-center justify-center">
                  <MapPinIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="text-[1rem] flex-1 font-light space-y-1">
                <h1 className="text-grey">Insurance Details</h1>
                <p>UHS, PN: 763529</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="font-light">
          <span className="font-medium">Note: </span>
          We attach great importance to protecting your private sphere and
          ensuring that yout data are secure. We collect, process and store
          personal data(including IP addresses only as permitted) by law or if
          you have given your consent.
        </p>
      </div>
    </FormContainer>
  );
};

export default ProfileDetails;
