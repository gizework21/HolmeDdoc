import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfService from './TermsOfService'
import GeneralContainer from './GeneralContainer'
import UserAgreement from './UserAgreement'

const General = () => {

  return (
    <>
        <Routes>
            <Route path="/" element={<GeneralContainer />}>
                <Route path="/privacyPolicy" element={<PrivacyPolicy  />}/>
                <Route path="/terms&service" element={<TermsOfService />}/>
                <Route path="/userAgreement" element={<UserAgreement />}/>
            </Route>
        </Routes>
    </>
  )
}

export default General