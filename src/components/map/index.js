import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useCallback } from "react";
import LoadMap from "./LoadMap";
const key = process.env.REACT_APP_MAP_API_KEY



const Map = ({ address }) => {
    console.log(address)
    const render = useCallback((status) => {
        switch (status) {
          case Status.LOADING:
            return <h1>loading</h1>;
          case Status.FAILURE:
            return <h1>error</h1>;
          case Status.SUCCESS:
            return <LoadMap address={address}/>;
        }
    }, [address]);

    return <Wrapper apiKey={"AIzaSyAWH5SQg2niDM6yLPf1dDYDt0La9Idf7Tk"} render={render} />; 
} 

export default Map