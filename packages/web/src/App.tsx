import React, { Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import RouteList from './routes'
import { GetUserInfo } from './api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App: React.FC = () => {
  async function checkLogin() {
    try {
      const res = await GetUserInfo()
      localStorage.setItem('USER', JSON.stringify(res))
    } catch (_) {
    }
  }
  useEffect(() => {
    checkLogin()
  }, [])
  return (
    <div>
      <HashRouter>
        <Routes>
          {
            RouteList.map(item => (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <Suspense fallback={
                    <div>loading...</div>
                  }>
                    < item.component />
                  </Suspense>
                }
              >
              </Route>
            ))
          }
        </Routes>
      </HashRouter>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  );
}
export default App;
