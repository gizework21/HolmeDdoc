import React from "react";

import { GrTwitter } from "react-icons/gr";
import { AiOutlineInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { IconContext } from "react-icons";

import apple1 from "../assets/images/apple1.svg";
import googleplay1 from "../assets/images/googleplay1.svg";
import Image from "../components/Image";

function Footer() {
  return (
    <>
      <div className="bg-[rgb(51,51,51)] text-white pt-8 ">
        <div className="hidden  lg:flex lg:justify-around px-8 fs14  ">
          <section>
            <ul>
              <li className="font-extralight">
                <section>
                  <ul className="whiteOpacity6">
                    <h6 className="white">Zocdoc</h6>
                    <li className="font-extralight cursor-pointer">Home</li>
                    <li className="font-extralight cursor-pointer">About us</li>
                    <li className="font-extralight cursor-pointer">Press</li>
                    <li className="font-extralight cursor-pointer">Carrers</li>
                    <li className="font-extralight cursor-pointer">Help</li>
                  </ul>
                </section>
              </li>
              <li className="font-extralight">
                <section className="mt-4">
                  <ul className="whiteOpacity6">
                    <h6 className="white">Contact</h6>
                    <li className="font-extralight cursor-pointer">
                      service@zocdoc.com
                    </li>
                    <li className="font-extralight">1-855-962-3621</li>
                  </ul>
                </section>
              </li>
            </ul>
          </section>
          <section>
            {" "}
            <ul className="whiteOpacity6">
              <h6 className="white">Discover</h6>
              <li className="font-extralight cursor-pointer">
                The Paper Gown Stories for and about patients
              </li>
              <li className="font-extralight cursor-pointer">
                The Script Insights for doctors
              </li>
              <li className="font-extralight cursor-pointer">
                Communnity Standards
              </li>
              <li className="font-extralight cursor-pointer">
                Data and privacy
              </li>
              <li className="font-extralight cursor-pointer">
                Verified reviews
              </li>
            </ul>
          </section>
          <section>
            {" "}
            <ul className="whiteOpacity6">
              <h6 className="white">Insurance Carriers</h6>

              <li className="font-extralight cursor-pointer">Aetna</li>
              <li className="font-extralight cursor-pointer">Aetna Dental</li>
              <li className="font-extralight cursor-pointer">Ambetter</li>
              <li className="font-extralight cursor-pointer">
                Anthem Blue Cross Blue Shield
              </li>
              <li className="font-extralight cursor-pointer">
                Anthem Blue Cross Blue Shield Dental
              </li>
              <li className="font-extralight cursor-pointer">Cigna</li>
              <li className="font-extralight cursor-pointer">Cigna Dental</li>
              <li className="font-extralight cursor-pointer">Delta Dental</li>
              <li className="font-extralight cursor-pointer">
                Florida Blue Cross Blue Shield{" "}
              </li>
              <li className="font-extralight cursor-pointer">Humana Dental</li>
              <li className="font-extralight cursor-pointer">Humana </li>
              <li className="font-extralight cursor-pointer">
                Kaiser Permanente
              </li>
              <li className="font-extralight cursor-pointer">Metlife</li>
              <li className="font-extralight cursor-pointer">Multiplan PHCS</li>
              <li className="font-extralight cursor-pointer">
                UnitedHealthcare
              </li>
              <li className="font-extralight cursor-pointer">
                UnitedHealthcare Dental
              </li>
              <li className="font-extralight cursor-pointer">
                UnitedHealthcare Oxford
              </li>
              <li className="font-extralight cursor-pointer">1199SEIU</li>
              <li className="font-extralight cursor-pointer">View all</li>
            </ul>
          </section>
          <section>
            <ul className="whiteOpacity6">
              <h6 className="white">Top Specialities</h6>

              <li className="font-extralight cursor-pointer">
                Primary Care Doctor
              </li>
              <li className="font-extralight cursor-pointer">Urgent Care</li>
              <li className="font-extralight cursor-pointer">Dermatologist</li>
              <li className="font-extralight cursor-pointer">OB-GYN</li>
              <li className="font-extralight cursor-pointer">Dentist</li>
              <li className="font-extralight cursor-pointer">Psychiatrist</li>
              <li className="font-extralight cursor-pointer">
                Ear, Nose & Throat Doctor
              </li>
              <li className="font-extralight cursor-pointer">Podiatrist</li>
              <li className="font-extralight cursor-pointer">Urologist</li>
              <li className="font-extralight cursor-pointer">
                Gastroenterologist
              </li>
              <li className="font-extralight cursor-pointer">Cardiologist</li>
              <li className="font-extralight cursor-pointer">Neurologist</li>
              <li className="font-extralight cursor-pointer">
                Orthopedic Surgeon
              </li>

              <li className="font-extralight cursor-pointer">
                Ophthalmologist
              </li>
              <li className="font-extralight cursor-pointer">Pediatrician</li>
              <li className="font-extralight cursor-pointer">Optometrist</li>
              <li className="font-extralight cursor-pointer">Eye Doctor</li>
              <li className="font-extralight cursor-pointer">
                {" "}
                Therapist Counselor
              </li>
              <li className="font-extralight cursor-pointer">
                Physical Therapist
              </li>
              <li className="font-extralight cursor-pointer">Psychologist </li>
              <li className="font-extralight cursor-pointer">View all</li>
            </ul>
          </section>
          <section>
            <ul>
              <li>
                <section>
                  <ul className="whiteOpacity6">
                    <h6 className="white">
                      Are you a top doctor or health service?
                    </h6>
                    <li className="font-extralight cursor-pointer">
                      List your practice on Zocdoc{" "}
                    </li>
                    <li className="font-extralight cursor-pointer">
                      Become an EHR partner
                    </li>
                    <li className="font-extralight cursor-pointer">
                      Access Zocdoc for Developers
                    </li>
                  </ul>
                </section>
              </li>
              <li>
                <section className="mt-4">
                  <ul>
                    <li>
                      <h6 className="white">Get the Zocdoc app</h6>
                    </li>
                    <li>
                      <div className="md:my-8 lg:my-4 flex flex-col md:justify-start  my-6  md:w-72 w-80 ">
                        <Image
                          src={'/home/apple1.svg'}
                          staticUrl={apple1}
                          className="mr-1 mt-1 w-[40%]"
                          alt="apple"
                        />
                        <Image
                          src={'/home/gp.png'}
                          staticUrl={googleplay1}
                          alt="googleplay"
                          className="mt-2 mr-2 w-[40%]"
                        />
                      </div>
                    </li>
                  </ul>
                </section>
              </li>
            </ul>
          </section>
        </div>
        <div className=" px-8">
          <p className="font-thin py-8 fs12 lh20 ">
            The content provided here and elsewhere on the Zocdoc site or mobile
            app is provided for general informational purposes only. It is not
            intended as, and Zocdoc does not provide, medical advice, diagnosis
            or treatment. Always contact your healthcare provider directly with
            any questions you may have regarding your health or specific medical
            advice.
          </p>
        </div>
        <div>
          <div className="bg-[rgb(51,51,51)] lg:bg-[#000024] flex px-8 py-4 lg:py-10 justify-between align-center">
            <div
              xs="12"
              lg="8"
              className="flex flex-col lg:flex-row lg:items-center"
            >
              <ul>
                <li className="pr-4">© 2022 Zocdoc, Inc. Logo </li>
              </ul>
              <ul className="flex lg:text-sm text-xs text-[rgb(255,255,255,0.6)]">
                <li className="pr-2 lg:pr-4  hover:text-white cursor-pointer">
                  Terms{" "}
                </li>
                <li className="pr-2 lg:pr-4 hover:text-white cursor-pointer">
                  Privacy{" "}
                </li>
                <li className="pr-2 lg:pr-4 hover:text-white cursor-pointer">
                  Do not sell my personal information{" "}
                </li>
                <li className="pr-2 lg:pr-4 hidden lg:block  hover:text-white cursor-pointer">
                  Site map{" "}
                </li>
              </ul>
              {/* </div> */}
            </div>
            <IconContext.Provider
              value={{ className: "shared-class", size: 30 }}
            >
              <div lg="4" className="hidden lg:block">
                <ul className="flex float-end ">
                  <li className="mr-2 cursor-pointer">
                    <GrTwitter />
                  </li>
                  <li className="mr-2 cursor-pointer">
                    <AiOutlineInstagram />
                  </li>
                  <li className="mr-2 cursor-pointer">
                    <BsFacebook />
                  </li>
                  <li className="mr-2 cursor-pointer">
                    <AiFillLinkedin />
                  </li>
                </ul>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
