import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import './index.css';
import { useState, createContext } from 'react';
export const LengthContext = createContext();

function App() {
    const [lengthCart, setLengthCart] = useState(0);
    return (
        <Router>
            <div className="App">
                <LengthContext.Provider value={{ lengthCart, setLengthCart }}>
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
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </LengthContext.Provider>
            </div>
        </Router>
    );
}

export default App;
