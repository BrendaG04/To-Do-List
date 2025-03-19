import { useState } from 'react'
import DigitalClock from './DigitalClock'
import ToDoList from './ToDoList'
import Stopwatch from './Stopwatch'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {


  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">To-Do List</Link>
              </li>
              <li>
                <Link to="/clock">Digital Clock</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<>
                                      <ToDoList/> 
                                      <Stopwatch/> 
                                    </>} 
            />
            <Route path="/clock" element={
                                      <DigitalClock />
                                    } 
            />
          </Routes>
          
        </div>
      </Router>
    </>
  )
}

export default App
