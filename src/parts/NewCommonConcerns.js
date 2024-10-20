import React, { useEffect, useState } from "react";
import Accordion from "../components/Accordion";
import { COMMON_CONCERNS } from "../utils/DummyData";
import LandingPageTitle from "./LandingPageTitle";
import Container from "../components/Container";
import AccordionDropdown from "../components/AccordionDropdown";
import { useSelector } from 'react-redux'
import customAxios from "../utils/CustomAxios";

function NewCommonConcerns() {
  const [selectedId, setSelectedId] = useState(null)
  const featuredConditions = useSelector(state => state.master.featuredConditions)
  const [commonConcerns, setCommonConcerns] = useState([])

  useEffect(() => {
    const commonConcerns = featuredConditions.map(el => ({
      title: el.medical_condition_name,
      id: el.id,
      options: [],
      isFetched: false
    }))
    setCommonConcerns(commonConcerns)
  }, [featuredConditions])

  const handleConditionSelected = async (id) => {
    setSelectedId(id)
    const selectedCondition = commonConcerns.findIndex(el => el.id === parseInt(id))
    const newConcerns = [...commonConcerns]
    if(commonConcerns[selectedCondition]?.options.length === 0 && !commonConcerns[selectedCondition].isFetched){
      const specialities = await customAxios.post('patient/master/mapped', {
          paginate: 4,
          condition_id: id
      })
      newConcerns[selectedCondition].options = specialities.data.data?.result.map(el => ({
        title: el.speciality_name,
        id: el.speciality_id,
        seo_url: el.speciality_url
      })) ?? []
      newConcerns[selectedCondition].isFetched = true
      setCommonConcerns(newConcerns)
    }
  }

  return (
    <div className="bg-blueBg p-0">
      <Container>
        <LandingPageTitle>
          <div className="hidden md:block">Most common health concerns</div>
          <div className="md:hidden">
            Most common
            <br className="md:hidden" />
            health concerns
          </div>
        </LandingPageTitle>
        <div className="mt-8 md:grid md:grid-rows-1 md:grid-flow-col md:auto-cols-fr lg:gap-x-[55px] text-gray">
          {commonConcerns.map((item, index) => {
            const { title, options } = item;
            return (
              <div key={index} className={`mb-4 md:flex h-full`}>
                <AccordionDropdown isFetched={item.isFetched} title={title} options={options} id={item.id} selectedId={selectedId} handleItemClicked={(id) => handleConditionSelected(id)}/>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default NewCommonConcerns;