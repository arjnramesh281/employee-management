import React  from 'react'
import './App.css'
import EmpList from './components/EmpList'
import AddDetail from './components/AddEmp'
import { useEffect, useState } from 'react'

function App() {

  return (
    <div>
    <AddDetail/>
    <EmpList/>
    </div>
  
  )
}

export default App
