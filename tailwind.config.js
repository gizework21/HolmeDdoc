/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const url = process.env.REACT_APP_CUSTOM_NODE_ENV === "production" ? 'https://holmedddoc-static.s3.us-west-1.amazonaws.com' : 'https://holmeddoc-static.s3.ap-south-1.amazonaws.com'

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,png}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xsm: '300px',
      xs: "475px",
      BtnMdLg: "915px",
      BtnLgXl: "1180px",
      '3xl': "1620px",
      specialityLg: {'min': "1280px", 'max': '1404px' },
      specialityMd: "1231px",
      searchXl: "1311px",
      searchLg: "1131px",
      tall: { raw: "(min-height: 750px)" },
      short: { raw: "(min-height: 590px)" },
      ...defaultTheme.screens,
    },
    extend: {
      // backgroundImage: {
      //   // "hero-pattern": "url('/img/hero-pattern.svg')",
      //   aboutUs: "url('/src/assets/images/aboutUs.png')",
      //   appSection: "url('/src/assets/images/appSection.png')",
      // },
      height: {
        'bannerHeight': '87vh',
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        80: "80%",
        70: "70%",
        60: "60%",
        50: "50%",
        40: "40%",
        30: "30%",
        55: "55%",
        35: "35%",
        16: "4rem",
      },
      keyframes: {
        removeCardNew: {
          "0%": { transform: "translate(0rem,0rem)" },
          "25%": { transform: "translate(-100rem,100rem)" },
          "50%": {
            transform: "translate(100rem,100rem)",
          },
          "75%": {
            transform: "translate(100rem,0rem)",
            zIndex: -3,
          },
          "100%": {
            transform: "translate(0rem,0rem)",
            zIndex: -3,
          },
        },
        removeCard: {
          "0%": { transform: "translate(0rem,0rem)" },
          "100%": {
            transform: "translate(-100rem,100rem)",
          },
        },
        addCard: {
          "0%": {
            transform: "translate(100rem,-100rem)",
            zIndex: -3,
          },
          "100%": {
            transform: "translate(0rem,0rem)",
            zIndex: -3,
          },
        },
        scaleDown: {
          "0%": { transform: "scale(100)" },
          "100%": { transform: "scale(0)" },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        removeCard: "removeCard 0.7s ease-in-out 1 forwards",
        addCard: "addCard 0.5s ease-in-out 1 forwards",
        scaleDown: "scaleDown 0.9s ease-in-out 1 forwards",
        fadeOut: "fadeOut 0.7s ease-in-out 1 forwards",
        fadein: "fadein 0.7s ease-in-out 1 forwards",
        moveToBack: "moveToBack 0.7s linear 1 forwards",
      },
      colors: {
        primary: "#00234B",
        lightBlue: "#DFFEFE",
        lightgrey: "#F7F8F9",
        yellowcustom: "#FDE721",
        yellowlight: "#FFF04B",
        green: "#008282",
        grey: "#4B5563",
        lightGreen: "#3AB54A",
        blueBg: '#E2f6f3',
        titleColor : 'black',
        paragraphColor: "#545871",
        golden: "#eba134",
        greyer : "#e4e4e4",
        blue2: '#EBFEFE',
        blue3: '#65B3B3'
      },
      fontFamily: {
        "sharp-sans": ["sharp-sans"],
        "sharp-sans-bold": ["sharp-sans-bold"],
        "sharp-sans-medium": ["sharp-sans-medium"],
        "sharp-sans-light": ["sharp-sans-light"],
        "sharp-sans-italic": ["sharp-sans-italic"],
        "sharp-sans-extrabold": ["sharp-sans-extrabold"],
        "sharp-sans-extrabold-italic": ["sharp-sans-extrabold-italic"],
        "sharp-sans-thin": ["sharp-sans-thin"],
        "sharp-sans-semibold": ["sharp-sans-semibold"],
        "basic-sans-regular": ["basic-sans-regular"],
        "basic-sans-new": ["basic-sans-new"],
        "poppins": ["poppins"],
        "basic-sans-bold": ["basic-sans-bold"],
        "basic-sans-light": ["basic-sans-light"],
        "henriette": ["henriette"]
      },
      fontSize: {
        "large": '2.7rem',
        "small": '1.5rem',
        "medium": "2.25rem",
        "navbarLg": "16px",
        "searchLg": "20px",
        "titleLg": "42px",
        "subtitleLg": "27px",
        "footerHeader": "23px",
        "footerLink": "16px",
        "labelFontSize": "",
        "size-1" : "0.7rem",
        "size-2" : "0.8rem",
        "size-3" : "0.85rem",
        "size-4" : "0.9rem",
        "size-5" : "0.95rem",
        "size-6" : "1.1rem",
        "size-7" : "1.2rem",
        "size-8" : "1.25rem",
        "size-9" : "1.3rem",
        "size-10" : "1.4rem",
        "size-11" : "1.5rem",
        "size-12" : "1.8rem",
        "size-13" : "2.4rem",
        "size-14" : "2.5rem"      
      },
      backgroundImage: {
        banner: "url('./assets/images/Banner.jpg')",
        checkmark: "url('./assets/images/checkmark.svg')",
        demoForm: "url('./assets/images/DemoForm.jpeg')",
        loginForm:  `url('${url}/login/Login.jpg')` || "url('./assets/images/Login/Close.png')",
        registerForm: `url('${url}/login/Register.jpg')`,
        signUpForm: `url('${url}/login/Register2.jpg')`,
        forgotForm: `url('${url}/login/Forgot.jpg')`,
        aboutUs: `url('${url}/about/aboutUsBg.png')`,
        appSection: "url('/src/assets/images/appSection.png')",
        listPractice: "url('/src/assets/images/home/Check.png')",
        changePassword: `url('${url}/login/ChangePassword.jpg')`,

      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui"), require('cssnano'), require('tailwind-scrollbar-hide')
],
  daisyui: {
    styled: false,
    themes: false,
    base: false,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};