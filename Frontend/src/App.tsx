
import './App.css'
import {Button} from "./components/ui/Button";
import { PlusIcon } from './icons/Plus';
import { ShareIcon } from './icons/ShareIcon';
import { Card} from './components/ui/Card';
import { AddContentModel } from './components/ui/AddContentModel';
import { useState } from 'react';
import { Sidebar } from './components/ui/SideBar';
import Dashboard from './pages/Dashboard';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/SignIn';
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path='/signup' element={<SignUp/>} />
       <Route path='/signin' element={<Login/>} />
       <Route path='/dashboard' element={<Dashboard/>} />


     </Routes>
  </BrowserRouter>
   
  )
}

export default App
