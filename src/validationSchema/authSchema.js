const loginSchema = {
    phone: {
        required: 'Phone Number is required',
        pattern: {
            value: /^\d{10}$/,
            message: 'Invalid Phone Number',
        }
    },
    password: {

    },
};

const registerSchema = {
    firstName: {
        required: 'First name is required',
        minLength: {
            value: 2,
            message: 'First name should have at least 2 characters',
        },
        maxLength: {
            value: 50,
            message: 'First name cannot have more than 50 characters',
        }
    },
    lastName: {
        required: 'Last name is required',
        minLength: {
            value: 2,
            message: 'Last name should have at least 2 characters',
        },
        maxLength: {
            value: 50,
            message: 'First name cannot have more than 50 characters',
        }
    },
    gender: {
        required: 'Gender is required'
    },
    birthday: {
        required: 'Birthday is required',
    },
    policyNumber: {
        required: 'Policy number is required',
    },
    phone: {
        required: 'Phone Number is required',
        pattern: {
            value: /^\d{10}$/,
            message: 'Invalid Phone Number',
        }
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Invalid email address',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password should have at least 8 characters',
        }
    },
    confirm: {
        required: 'Please accept Privacy Policy and agree to the Terms of Service'
    },
    confirmPassword: (password) => {
            return { //validate: (confirmPassword) => {
            //     if(password !== confirmPassword){
            //         return 'Password doesnt match'
            //     }
            // },
            required: 'Confirm Password is required',
        }
    },
    apartment: {
        ...minMaxRequired(2, 50, 'Apartment')
    },
    streetAddress: {
        ...minMaxRequired(2, 50, 'Street address'),
    },
    city: {
        ...minMaxRequired(2, 50, 'City'),
    },
    state: {
        ...minMaxRequired(2, 50, 'State'),
    },
    zip: {
        ...minMaxRequired(5, 5, 'Zip'),
    },
    certify: {
        validate: (val) => {
            if(!val){
                return "Please indicate that you have provided correct information"
            }
            return true
        }
    }
}

const forgotPasswordSchema = {
    phone: {
        required: 'Phone Number is required',
        pattern: {
            value: /^\d{10}$/,
            message: 'Invalid Phone Number',
        }
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password should have at least 8 characters',
        }
    },
    confirmPassword: (password) => {
        return { 
            required: 'Confirm Password is required',
        }
    },
}

const changePasswordSchema = {
    oldPassword: {
        required: 'Old Password is required',
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password should have at least 8 characters',
        }
    },
    confirmPassword: (password) => {
            return { //validate: (confirmPassword) => {
            //     if(password !== confirmPassword){
            //         return 'Password doesnt match'
            //     }
            // },
            required: 'Confirm Password is required',
        }
    },
}


const bookAppointmentSchema = {
    condition: {
        required: 'Please select an condition'
    },
    insurance: {
        required: 'Please select an insurance'
    },
    reasonForAppointment: {
        required: 'Please type you reason appointment'
    },
    clinicAddress: {
        required: 'Please select an clinic address'
    },
    certify: {
        validate: (val) => {
            if(!val){
                return "Please indicate that you have provided correct information"
            }
            return true
        }
    }
}

const bookTopDoctorAppointmentSchema = {
    condition: {
        required: 'Please select an condition'
    },
    reason: {
        required: 'Please select an insurance'
    },
    address: {
        required: 'Please select an clinic address'
    }
}


export { 
    loginSchema,
    registerSchema,
    forgotPasswordSchema,
    bookAppointmentSchema,
    changePasswordSchema,
    bookTopDoctorAppointmentSchema
 }


function minMaxRequired(min , max, title){
    return {
        required: `${title} is required`,
        minLength: {
            value: min,
            message: `${title} should have minimum length of ${min}`,
        },
        maxLength: {
            value: max,
            message: `${title} should have maximum length of ${max}`,
        }
    }
}



  // validate: (val) => {
        //     if (!val.match(/^\d{10}$/)) {
        //     return "Invalid Phone Number";
        //     }
        //     // you can do more logic here
        //     return true;
        // },
        // required: 'this is a required',






