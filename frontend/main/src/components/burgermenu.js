import React,{useState,useEffect} from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function BurgerMenu(){
    const [burger,setBurger] = useState(false)
    const [count,setCount] = useState({})
    const redirect = useNavigate()

    useEffect(()=>{
      fetch('http://127.0.0.1:8000/count/').then((res)=>{
        return res.json()
      }).then((data)=>{
        console.log(data)
        setCount(data)

      })
    },[])

    return(
        <React.Fragment>
        <div onClick={()=>setBurger(!burger)} className='burgerMenu'>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div  style={{display:burger?'flex':'none'}} className="menu-wrapper">
        <div className="menu">
          <div className="menuTitle">Menu</div>
          <div className="newTask">
            <button className="newTaskBtn" onClick={(e)=>redirect('/')} >
              <Icon icon="ic:baseline-plus" width="40" height="30"></Icon>
              <span className="spanIcon" >New Todo</span>
            </button>
          </div>
          <div className="tasks">
            <div>
            <button className="tasksBtn" onClick={(e)=>redirect('/todo')}>
              <Icon icon="pajamas:todo-add" width="24" height="24" />
              <span className="spanIcon">Your Todo's</span>
              <span className="circleNotif">0</span>
            </button>
            </div>
            <div>
            <button className='tasksBtn' onClick={(e)=>redirect('/overdue')}>
              <Icon icon="icon-park:deadline-sort" width='24' height='24'/>
              <span className='spanIcon'>Overdue Tasks</span>
              <span className='circleNotif'>{count.overdue}</span>
            </button>
            </div>
            <div>
            <button className='tasksBtn' onClick={(e)=>redirect('/completed')}>
              <Icon icon="fluent-mdl2:completed-solid" width='24' height='24'/>
              <span className='spanIcon'>Completed Tasks</span>
              <span className='circleNotif'>{count.completed}</span>
            </button>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
}