import "../App.css";
import React, { useState, useEffect ,useMemo,memo} from "react";
import { TaskQMemo,dateFormat,range} from "./task";
import { dateDjangoFormat } from "./todo";
import BurgerMenu from "./burgermenu";

export default function OverdueTodo(){
    const [date,setDate] = useState(null);
    const [todoList,setTodoList] = useState();
    const [dateList,setDateList] = useState();
    const [type,setType] = useState('text')

    useEffect(()=>{

        if(date){
        fetch(`http://127.0.0.1:8000/overdue/${date}/`).then((res)=>{
            return res.json()

        }).then((data)=>{
            setTodoList(data)

        })
    }

    fetch('http://127.0.0.1:8000/future/').then((res)=>{
        return res.json()
    }).then((data)=>{
        setDateList(data)
    })
    },[date])

    const handleChange = (e)=>{
        setDate(e.target.value)
    }


    return(
        <div className='cPage'>
            <div>
            <BurgerMenu/>
            </div>

            

           

            <div className='todoWrapper'>
            {!date ?
            <div className='dateDiv'>
            
                <select className='dateSel' onChange={handleChange}>
                    <option  default>Select a date</option>
                    {dateList?.map((dates)=>{
                        return(
                            <option  value={dates.published}>{dateFormat(dates.published)}</option>
                        )
                    })}
                </select>
                </div>
          :

         
          <div className='todoSlider' >

          <div className='dateDiv'>
        <select className='dateSel' onChange={handleChange}>
                    <option  default>Select a date</option>
                    {dateList?.map((dates)=>{
                        return(
                            <option  value={dates.published}>{dateFormat(dates.published)}</option>
                        )
                    })}
                </select>
                </div>
                
    
               
               
          <div className="taskDiv" id='ovco'>
        
      
          {todoList?<TaskQMemo range={range} setTodoList={setTodoList} dateFormat = {dateFormat} todoList={todoList}/>:null}
          </div>
          </div>
          

          }
          </div>
          </div>
        
        

        
    )
}