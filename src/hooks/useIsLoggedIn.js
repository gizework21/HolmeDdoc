import { useSelector } from "react-redux";

export default function useIsLoggedIn(){
    const access_token = useSelector(state => state.auth?.currentUser?.remember_token)

    return !!access_token
}