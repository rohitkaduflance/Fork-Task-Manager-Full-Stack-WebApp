import { useState } from 'react'
import Navbar from "./components/Navbar";
import Todo from "./components/Todo"
import TaskList from './components/TaskList';
import './App.css'


function App() {
  

  return (
    <>
      <Navbar />
      <TaskList />
      {/* <Todo /> */}
    </>
  )
}

export default App
