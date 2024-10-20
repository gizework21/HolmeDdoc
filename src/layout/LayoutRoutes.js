import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./paths";
import TranslateContainer from "../components/TranslateContainer";
import PageNotFound from "../pages/PageNotFound";

const Layout = React.lazy(() => import("./Layout"));

const LayoutRoutes = () => {
  //   const token = useSelector((state) => {
  //     console.log("state", state);
  //     return state.Customizer.token;
  //   });
  //   const navigate = useNavigate();

  return (
    <>
      <Routes>
        {routes.map(({ path, component }, i) => (
          <Route element={<Layout />} key={i}>
            <Route path={path} element={component} />
          </Route>
        ))}
        <Route path={"/*"} element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default TranslateContainer(LayoutRoutes);
