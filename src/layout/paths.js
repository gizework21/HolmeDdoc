import { lazy } from "react";

const BookAppointmentPage = lazy(() => import('../pages/BookAppointmentPage'));
const DoctorsProfilePageContent = lazy(() => import('../pages/DoctorsProfilePage'));
const SpecialityPage = lazy(() => import('../pages/SpecialityPage'));
const BookingSuccess = lazy(() => import('../pages/BookingSuccess'));
const AboutUs = lazy(() => import('../pages/AboutUs'));


const pathToComponentMapping=[
    {path:"/book/:bookingId",component:<BookAppointmentPage />},
    {path:"/doctor/*",component:<DoctorsProfilePageContent />},
    {path:"/doctor/:doctorName/:doctorId",component:<DoctorsProfilePageContent />},
    {path:"/specialties",component:<SpecialityPage />},
    {path:"/bookingSuccess/:doctorId",component:<BookingSuccess />},
    {path:"/aboutUs",component:<AboutUs />},
]

export default pathToComponentMapping