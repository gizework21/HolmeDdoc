import { useNavigate } from "react-router-dom"

export default function DoctorCarouselCard({ image, name, speciality, bio, location, seo_url  }){
    let expertise = speciality.filter((el, idx) => idx < 3)
    expertise = expertise.join(', ')
    if(speciality.length > 3){
        expertise = expertise + "..."
    }
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/doctor/${seo_url}`)} className="flex flex-col cursor-pointer md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-6 lg:space-x-10 w-[80vw] sm:w-[80vw] md:w-[28rem] lg:w-[32rem] xl:w-[36rem] overflow-hidden">
            <div className='w-[13.5rem] h-[13.5rem] md:h-[10rem] md:w-[10rem] lg:w-[12rem] lg:h-[12rem] xl:w-[13rem] xl:h-[13rem] self-center md:self-start'>
                <img className='h-full w-full rounded-xl' src={image} alt="doc" />
            </div>
            <div className='space-y-2 flex-1 w-full text-center md:text-start'>
                <h1 className="text-2xl font-semibold font-basic-sans text-black">{name}</h1>
                <div className="flex items-center justify-center line-clamp-3 md:justify-start text-md space-x-4 font-bold font-basic-sans text-black">
                    <h2>{expertise}, {location}</h2>
                    {/* <h2>{location}</h2> */}
                </div>
                <p className="md:text-[1rem] lg:text-[1.18rem] font-light line-clamp-3 leading-7 font-basic-sans-regular text-paragraphColor active:font-light active:text-paragraphColor min-h-[5rem]">
                    {bio ?? ''}
                </p>
            </div>
        </div>
    )
}