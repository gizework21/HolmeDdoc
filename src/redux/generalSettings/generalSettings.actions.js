import { setStatus, setInsurance, setPrivacyPolicy, setTermsOfUse, setUserAgreement, setFacebook, setInstagram,
    setTwitter,
    setAboutUs
} from "./generalSettings";
import { getAllInsuarance, getGeneralSettings } from "../../services/master";

export const fetchGeneralSettingDataThunk = () => {
    return async (dispatch) => {
        dispatch(setStatus("loading"));
        const result = await getGeneralSettings();
        const insurance = await getAllInsuarance();
        dispatch(setAboutUs(result.about_us))
        dispatch(setInsurance(insurance));
        dispatch(setPrivacyPolicy(result.privacy_policy));
        dispatch(setTermsOfUse(result.terms_condition));
        dispatch(setUserAgreement(result.user_agreement))
        dispatch(setFacebook(result.facebook));
        dispatch(setInstagram(result.instagram));
        dispatch(setTwitter(result.twitter));
        dispatch(setStatus("loaded"));
    }
}