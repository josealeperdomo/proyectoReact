import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { Cuenta } from './pages/Cuenta'
import { PrivateRoutes } from './routes/PrivateRoutes'
import { Dashboard } from './pages/Dashboard'
import { DashboardPassword } from './pages/DashboardPassword'
import { PrivateRoutesAdmin } from './routes/PrivateRoutesAdmin'
import { Admin } from './pages/Admin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/cuenta' element={<Cuenta/>}/>

        <Route element={<PrivateRoutes/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboardPassword' element={<DashboardPassword/>}/>
        </Route>
        
        <Route element={<PrivateRoutesAdmin/>}>
          <Route path='/admin' element={<Admin/>}/>
        </Route>

      </Routes>
    <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
)
