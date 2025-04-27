import "../App.css";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "react-datepicker/dist/react-datepicker.css";
import Dialog from '@mui/material/Dialog';
import { TaskQMemo,dateFormat,range} from "./task";
import BurgerMenu from "./burgermenu";

export const dateDjangoFormat = (date)=>{
    if(date){
        date = new Date(date)
        return `${date.getFullYear()}-${date.getMonth()+1>9?date.getMonth()+1:'0'+(date.getMonth()+1).toString()}-${date.getDate()>9?date.getDate():'0'+(date.getDate().toString())}`

}
}


function TodoPage(){
    const [todoList,setTodoList] = useState([])
    const [date,setDate] = useState(new Date())
    const [task,setTask] = useState({id:'','isCompleted':false,'title':'','desc':'','color':'#FFF7E6',date:''})
    const {id,title,desc} = task
    const [selected,setSelected] = useState('c2')
    const [statusSelect,setStatusSelect] = useState('Pending')
    const [open,setOpen] = useState()
    const [empty,setEmpty] = useState('')
    const [update,setUpdate] = useState(0)
    const [err,setErr] = useState('')

    const handleChange = (e)=>{
        setTask({
            ...task,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`http://127.0.0.1:8000/add/${dateDjangoFormat(date)}/`,{
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setUpdate(update+1)
        setTask({id:'','isCompleted':false,'title':'','desc':'','color':'#FFF7E6',date:''})

    }








    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/todo/filter/${dateDjangoFormat(date)}/`,{
            method:'POST',
            body:JSON.stringify({'btn':statusSelect}),
            headers:{'Content-Type':'application/json'}
        }).then((res)=>{
            return res.json().then((data)=>{
                console.log(typeof data)

            typeof data == 'object'?setTodoList(data):setTodoList([])
         
                
            })
        }).catch((e)=>{
            console.log(e.response.data)
            setTodoList(e.response.data)
        })
    },[statusSelect,date,update,todoList.title])



    function makeSelection(id){
        
        return statusSelect == id?'gainsboro':'white'
    }



    
    return(
        <div className='todoPage'>
            <div>
            <BurgerMenu/>
            </div>
           
        <div className='todoSlider'>
        <div className='dateDiv'><input  min={dateDjangoFormat(new Date())} onChange={(e)=>setDate((e.target.value))} type='date' value={dateDjangoFormat(date)} ></input></div>
            <div className='filter'>
                <span onClick={(e)=>setStatusSelect('Pending')}  id='Pending' className='status' style={{backgroundColor:makeSelection('Pending')}}>Pending</span>
                <span onClick={(e)=>setStatusSelect('Completed')} id='Completed' className='status' style={{backgroundColor:makeSelection('Completed')}}>Completed</span>
                <span onClick={(e)=>setStatusSelect('Deleted')} id='Deleted' className='status' style={{backgroundColor:makeSelection('Deleted')}}>Deleted</span>
        
            </div>
            
            <div className='taskDiv'>
    
        
        <TaskQMemo isTodoPage={true} update={update} setUpdate={setUpdate} dateFormat={dateFormat} todoList={todoList} setTodoList={setTodoList}  id={id} range={range} selected = {selected} setSelected={setSelected}/>
        {statusSelect=='Pending'?<div className='add'>
            <button className='addBtn' onClick={(e)=>setOpen(true)}><Icon icon="mdi:plus" width='50' height='50'/></button>
            <Dialog open={open} onClose={(e)=>setOpen(false)}>
                <form className='formField' onSubmit={handleSubmit}>
                <div className="inputArea">
            <div className="dateDisp">{dateFormat(date)}</div>
            <div className="title">
              <input
              maxLength={45}
                placeholder="Insert a Title"
    
                name="title"
                value={title}
                type="text"
                className="titleInp"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="desc1">
              <textarea
    
                className="descInp"
                placeholder='Enter Description'
                value={desc}
                name="desc"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>

        
            
            <div className='priorBtns'>

            <button  onClick={(e)=>{
                setSelected('c1')
                setTask({
                    ...task,
                    color:'#c8fac8'
                })
            }} type='button' value='1' id='c1' style={{backgroundColor:selected=='c1'?"#c8fac8":"#deffde"}}>Low</button>
            <button  onClick={(e)=>{
                setSelected('c2')
                setTask({
                    ...task,
                    color:'#FFF7E6'
                })
                
            }} value='2'  type='button' id='c2' style={{backgroundColor:selected=='c2'?'#FFF7E6':'#ffffe0'}}>Moderate</button>
            <button onClick={(e)=>{
                setSelected('c3')
                setTask({
                    ...task,
                    color:'#ff9082'
                })
            }}  value='3' type='button' id='c3' style={{backgroundColor:selected=='c3'?"#ff9082":"#fabbbb"}}>High</button>
            </div>
            <div className="addTask">
              <button onClick={(e)=>setOpen(false)} type='submit'  className="taskBtn" >
                Add Task to the List
              </button>
              


            </div>
            {empty? <div className='errorDiv'>Please add a title</div>:null}
          </div>

                </form>

            </Dialog>
        </div>:null}
        </div>
        </div>
        </div>
   
    )


}

export default TodoPage