import React, { useEffect, useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { IconContext } from "react-icons";

import apple1 from "../assets/images/apple1.svg";
import googleplay1 from "../assets/images/googleplay1.svg";
import footerlogo from "../assets/images/home/Footer.png";
import {
  AboutUs,
  DoctorRegister,
  Home,
  Specialties,
  PrivacyPolicy,
  TermsOfService,
  UserAgreement,
} from "../data/urls";
import { useNavigate, Link } from "react-router-dom";

import MobileFooterDropdown from "../components/MobileFooterDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setSpeciality,
  setSpecialityStatus,
} from "../redux/specialities/specialities";
import customAxios from "../utils/CustomAxios";
import Image from "../components/Image";

function NewFooter() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.generalSettings.status);
  const data = useSelector((state) => state.generalSettings.data);
  const insurance = useSelector(
    (state) => state.generalSettings.insurance ?? []
  );
  const speciality = useSelector((state) => state.speciality.speciality);
  const specialityStatus = useSelector((state) => state.speciality.status);
  const [showAllInsurance, setShowAllInsurance] = useState(false);

  // let specialityLink = [];

  // speciality and insurance were hardcoded in mobile footer --> Ubaid

  const specialityLink = speciality?.map((item) => {
    let obj = {
      title: item.medical_speciality_name,
      url: `/doctorsearch?specialty=${item.speciality_url}`,
      type: "link",
    };
    // specialityLink.push(obj);
    return obj;
  });
  console.log(specialityLink);

  const insuranceLink =
    (Array.isArray(insurance) &&
      insurance?.map &&
      insurance?.map((item) => {
        let obj = {
          title: item.insurance_company_name,
          url: "",
          type: "text",
        };
        // specialityLink.push(obj);
        return obj;
      })) ??
    [];

  const pop =
    insuranceLink && insuranceLink?.length && insuranceLink?.length > 0
      ? [...insuranceLink]
      : [];

  // console.log(InsuranceLink);

  const FOOTER_LINKS = [
    {
      title: "Holmeddoc",
      type: "links",
      links: [
        {
          title: "Home",
          url: Home,
          type: "link",
        },
        {
          title: "About Us",
          url: AboutUs,
          type: "link",
        },
        {
          title: "Help",
          url: Home,
          type: "link",
        },
      ],
    },
    {
      title: "Insurance Provider",
      type: "links",
      links: [...pop],
    },
    {
      title: "Major Specialities",
      type: "links",
      links:
        specialityLink && specialityLink?.length && specialityLink.length > 0
          ? [
              ...specialityLink,
              {
                title: "View All",
                url: Specialties,
                highlight: true,
                type: "link",
              },
            ]
          : [
              {
                title: "View All",
                url: Specialties,
                highlight: true,
                type: "link",
              },
            ],
    },
    {
      title: "For Doctor and Healthcare providers",
      type: "links",
      links: [
        {
          title: "Sign up with Holmeddoc",
          url: DoctorRegister,
          type: "link",
        },
        {
          title: "For Developer Teams",
          url: AboutUs,
          type: "link",
        },
        {
          title: "Get the Holmeddoc App",
          url: Home,
          type: "link",
        },
      ],
    },
    {
      title: "Contact Us",
      type: "links",
      links: [
        {
          title: "info@holmeddoc.com",
          type: "email",
        },
        {
          title: "+1 000 000 0000",
          type: "phone",
        },
      ],
    },
    {
      title: "More",
      type: "text",
      content: `The content provided here or elsewhere on the Holmeddoc website,
        mobile application, newsletters or similar communication is provided
        for general informational purpose only. Holmeddoc Inc does not
        provide any medical advice, diagnose or treatment of any kind.
        Always contact your doctor or healthcare service provider directly
        regarding any issues, questions or doubts pretaining to your
        healthcare or medication.`,
    },
  ];

  /**
   * calling general settings API including insurance companies also and storing it in redux along with its status of loading or not,
   *  and setting it accordingly to reduce api calls to general settings
   */
  // useEffect(() => {
  //   (async () => {
  //     if (status == "notLoaded") {
  //       dispatch(setStatus("loading"));
  //       const result = await getGeneralSettings();
  //       const insurance = await getAllInsuarance();
  //       dispatch(setInsurance(insurance));
  //       dispatch(setPrivacyPolicy(result.privacy_policy));
  //       dispatch(setTermsOfUse(result.terms_condition));
  //       dispatch(setUserAgreement(result.user_agreement))
  //       dispatch(setFacebook(result.facebook));
  //       dispatch(setInstagram(result.instagram));
  //       dispatch(setTwitter(result.twitter));
  //       dispatch(setStatus("loaded"));
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      if (specialityStatus === "notLoaded") {
        dispatch(setSpecialityStatus("loading"));
        const specialityList = await customAxios.post(
          "/patient/master/speciality",
          { paginate: 6 }
        );
        dispatch(setSpeciality(specialityList.data.data.result));
        dispatch(setSpecialityStatus("loaded"));
      }
    })();
  }, []);

  const openLink = (link) => {
    let newLink;
    let a = link.startsWith("http");
    if (!a) {
      newLink = "https://" + link;
    } else {
      newLink = link;
    }
    window.open(newLink, "_blank");
  };

  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(0);

  const handleClick = (id, url) => {
    navigate(`/doctorsearch?specialty=${url}`);
  };

  return (
    <>
      <div className="bg-blueBg text-black lg:pt-16 pt-8 tracking-[0.1rem] ">
        <div className="hidden  lg:flex lg:justify-between space-x-2 lg:px-16 xl:px-20">
          <section>
            <ul>
              <li className="mb-10">
                <section>
                  <ul className="font-basic-sans-regular space-y-5">
                    <h6 className="white font-basic-sans-regular font-semibold mb-8 text-footerHeader">
                      Holmeddoc
                    </h6>
                    <li
                      onClick={() => navigate(Home)}
                      className="cursor-pointer font-medium text-footerLink"
                    >
                      Home
                    </li>
                    <li
                      onClick={() => navigate(AboutUs)}
                      className="cursor-pointer font-medium text-footerLink"
                    >
                      About us
                    </li>
                    {/* <li className="cursor-pointer font-medium text-footerLink">
                      Help
                    </li> */}
                  </ul>
                </section>
              </li>
              <li>
                <section>
                  <ul className="font-basic-sans-regular space-y-5">
                    <h6 className="white font-basic-sans-regular font-semibold mb-8 text-footerHeader">
                      Contact Us
                    </h6>
                    <li
                      onClick={() => window.open(`mailto:info@holmeddoc.com`)}
                      className=" cursor-pointer font-medium text-footerLink"
                    >
                      info@holmeddoc.com
                    </li>
                    <li
                      onClick={() => window.open(`tel:+1 000 000 0000`)}
                      className="font-medium cursor-pointer text-footerLink"
                    >
                      +1 201 696 6552
                    </li>
                  </ul>
                </section>
              </li>
            </ul>
          </section>
          <section>
            <ul className="font-basic-sans-regular space-y-5 ml-5 pl-5">
              <h6 className="white font-basic-sans-regular font-semibold mb-8 text-footerHeader">
                Insurance Providers
              </h6>
              {Array.isArray(insurance) &&
                insurance
                  ?.filter(
                    (_, idx) =>
                      (!showAllInsurance && idx < 6) || showAllInsurance
                  )
                  ?.map((item) => (
                    <li
                      key={item.insurance_company_code}
                      className="font-medium text-footerLink"
                    >
                      {item.insurance_company_name}
                    </li>
                  ))}
              <li
                className=" cursor-pointer font-medium text-footerLink underline"
                onClick={() => setShowAllInsurance((v) => !v)}
              >
                {showAllInsurance ? "View Less" : "View All"}
              </li>
              {/* <li className="  font-medium text-footerLink">
                UHC
              </li>
              <li className=" font-medium text-footerLink">
                Humana
              </li>
              <li className=" font-medium text-footerLink">
                Aetna
              </li> */}
            </ul>
          </section>
          <section>
            {" "}
            <ul className="font-basic-sans-regular space-y-5">
              <h6 className="white font-basic-sans-regular font-semibold mb-8 text-footerHeader">
                Major Specialties
              </h6>
              {speciality?.map((item) => (
                <div key={item.id}>
                  <li
                    className="font-medium text-footerLink cursor-pointer"
                    onClick={() => handleClick(item.id, item.speciality_url)}
                  >
                    {item.medical_speciality_name}
                  </li>
                </div>
              ))}

              <li
                className=" cursor-pointer font-medium text-footerLink underline"
                onClick={() => navigate(Specialties)}
              >
                View All
              </li>
            </ul>
          </section>
          <section>
            <ul className="font-basic-sans-regular space-y-5">
              <h6 className="white font-basic-sans-regular font-semibold mb-8 text-footerHeader">
                For Doctor and Healthcare providers
              </h6>

              <li
                className=" cursor-pointer font-medium text-footerLink"
                onClick={() => navigate(DoctorRegister)}
              >
                Sign up with Holmeddoc
              </li>
              <li className="font-medium text-footerLink">
                For Developer Teams
              </li>
              <li className=" font-medium text-footerLink">
                Get the Holmeddoc App
              </li>
              <li>
                <div className="md:my-8 lg:my-4 flex items-center md:justify-start my-6  md:w-72 w-80 ">
                  <Image
                    src={"/home/apple1.svg"}
                    staticUrl={apple1}
                    className="mr-4  w-[40%] h-auto"
                    alt="appstore"
                  />
                  <Image
                    src={"/home/gp.png"}
                    staticUrl={googleplay1}
                    alt="playstore"
                    className=" mr-2 w-[40%] h-auto"
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
        <div className="hidden lg:block mt-12 px-6 mb-6 md:px-16 xl:px-20">
          <p className="text-gray-600 font-light leading-6 font-basic-sans-regular text-[15px]">
            The content provided here or elsewhere on the Holmeddoc website,
            mobile application, newsletters or similar communication is provided
            for general informational purpose only. Holmeddoc Inc does not
            provide any medical advice, diagnose or treatment of any kind.
            Always contact your doctor or healthcare service provider directly
            regarding any issues, questions or doubts pretaining to your
            healthcare or medication.
          </p>
        </div>
        <div className="lg:hidden px-5">
          {FOOTER_LINKS.map((item, idx) => (
            <MobileFooterDropdown
              key={idx}
              item={item}
              selectedItem={selectedItem}
              index={idx}
              handleItemSelected={(id) => setSelectedItem(id)}
            />
          ))}
        </div>
        <div className="bg-transparent flex justify-center items-center pt-8 md:py-0">
          <Image
            src={"/home/Footer.png"}
            staticUrl={footerlogo}
            className="bg-transparent h-[7rem] md:h-[8rem] xl:h-[8.5rem] mb-2 cursor-pointer"
            onClick={() => navigate(Home)}
          />
        </div>
        <div>
          <div className="flex px-6 sm:px-8 py-4 lg:pb-10 justify-center items-center">
            <div
              xs="12"
              lg="8"
              className="flex flex-col lg:flex-row  lg:items-center"
            >
              <ul className="flex flex-col items-center md:flex-row md:space-x-4 lg:space-x-8 text-sm font-light  md:font-medium text-size-4 md:text-[14px]  text-gray-900 policy-direction">
                <li className="cursor-pointer">
                  <Link to={TermsOfService}>Our Terms</Link>
                </li>
                <li className="cursor-pointer">
                  <Link to={PrivacyPolicy}>Our Privacy Policy</Link>
                </li>
                <li className="cursor-pointer">
                  <Link to={UserAgreement}>User Agreement</Link>
                </li>
                {/* <li className="">Do not Sell my personal information </li> // commented out because no link available --> Ubaid
                <li className="">Our Site map </li> */}
              </ul>
              {/* </div> */}
            </div>
            <IconContext.Provider
              value={{ className: "shared-class", size: 20 }}
            >
              {status === "loaded" ? (
                <div
                  lg="4"
                  // className="hidden lg:block float-right absolute right-20"
                  className="hidden lg:flex justify-end absolute lg:right-10 xl:right-16"
                >
                  <ul className=" flex flex-row">
                    {/* getting the links from redux and mapping it accordingly */}

                    <li
                      className={`mr-2 p-[4px]  border-black border-[1px] rounded-full ${
                        status === "loaded" ? "cursor-pointer" : null
                      }`}
                      onClick={() => openLink(data?.facebook)}
                    >
                      <TiSocialFacebook />
                    </li>
                    <li
                      className={`mr-2 p-[4px]  border-black border-[1px] rounded-full ${
                        status === "loaded" ? "cursor-pointer" : null
                      }`}
                      onClick={() => openLink(data?.instagram)}
                    >
                      <AiOutlineInstagram />
                    </li>
                    <li
                      className={`mr-2 p-[4px]  border-black border-[1px] rounded-full ${
                        status === "loaded" ? "cursor-pointer" : null
                      }`}
                      onClick={() => openLink(data?.twitter)}
                    >
                      <TiSocialTwitter />
                    </li>
                  </ul>
                </div>
              ) : null}
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewFooter;
