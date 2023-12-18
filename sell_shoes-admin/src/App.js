import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes";
import DefaultLayout from "~/layouts";
import { useDispatch, useSelector } from "react-redux";
import config from "~/config";
import { Navigate } from "react-router-dom";

// import "./index.css";

function App() {
  const user = useSelector((state) => state.user);
  const isLoggedIn = !!user.email;
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  !isLoggedIn ? (
                    <Layout>
                      <Navigate to={config.routes.login} />
                      <Page />
                    </Layout>
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
