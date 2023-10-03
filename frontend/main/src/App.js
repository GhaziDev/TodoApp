import "./App.css";
import React, { useState, useEffect } from "react";
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom';
import Todo from "./components/task";
import TodoPage from "./components/todo";
import OverdueTodo from "./components/overdue";
import CompletedTodo from "./components/completed";
function App() {

  useEffect(()=>{
    const updateDate = ()=>{
    fetch('http://127.0.0.1:8000/update/')
    }
    updateDate()
  },[])



  return(
    <Router>
      <Routes>
        <Route path='/' element={<Todo/>}/>
        <Route path='/todo' element = {<TodoPage/>}></Route>
        <Route path='/overdue' element = {<OverdueTodo/>}></Route>
        <Route path='/completed' element={<CompletedTodo/>}></Route>
      </Routes>

    </Router>
  )



}

export default App;
