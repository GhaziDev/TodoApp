import "../App.css";
import React, { useState, useEffect ,memo} from "react";
import { Icon } from "@iconify/react";
import "react-datepicker/dist/react-datepicker.css";
import Dialog from '@mui/material/Dialog';
import Carousel from "better-react-carousel";
import BurgerMenu from "./burgermenu";
import { useNavigate } from "react-router-dom";

export const range = { "#FFF7E6": "Moderate", "#c8fac8": "Low", "#ff9082": "High" };
export const textColor = {'#FFF7E6':'#9d7e00','#c8fac8':'green','#ff9082':'rgb(186, 4, 4)'}


export const dateFormat = (date) => {
  const numToDay = {

    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  const numToMonth = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  

  if (date) {
    const format = new Date(date);
    return `${numToDay[format.getDay()]} - ${format.getUTCDate()}/${
      numToMonth[format.getUTCMonth()]
    }/${format.getFullYear()} `;
  }
};

export function TaskQ({todoList,selected,setSelected,setTodoList,dateFormat,range,update,setUpdate,isTodoPage}){
  const [selectedTask,setSelectedTask] = useState(null)
  const [open,setOpen] = useState(false)
  const [refresh,setRefresh] = useState(0)
  const redirect = useNavigate()

  useEffect(()=>{
      
  },[todoList,refresh,update])


  const deleteTask = (selected)=>{

    fetch(`http://127.0.0.1:8000/delete/${selected.id}/`,{
      method:'DELETE',
    })
    
      

    const result = new Array()
    todoList.map((task)=>{
      if(task != selected){
        result.push(task)

      }
    })

    setTodoList([...result])
    //console.log(todoList)


  }

  const handleOpenTask = (e,task)=>{
    //console.log(task)

    setSelectedTask(task)
    setOpen(true)

  }

  const removeTask = (selected)=>{
    todoList?.map((task)=>{
      if(task==selected){
        task.isDeleted = !task.isDeleted
      }
      return { ...task, isDeleted: !task.isDeleted }

    })
     
    setTodoList(todoList)

    fetch(`http://127.0.0.1:8000/todo/${selected && selected.id}/`,{
      method:'PUT',
      body:JSON.stringify(selected),
      headers:{'Content-Type':'application/json'}

    })

    setUpdate(update+1)




  }




  const handleEdit = (e,selected)=>{

    let result = [...todoList]
    result?.map((task)=>{
      if(task===selected){
        task[e.target.name] = e.target.value;
        if(e.target.name === 'color'){
          setSelected(e.target.id)
        }
        if(e.target.name === 'isCompleted'){
          task[e.target.name] = e.target.checked
        }
      }
      return task

    })
     


    setTodoList(result)

    setUpdate(update+1)


      
  
    }

    const handleSubmit = (e,task)=>{
      e.preventDefault()
      fetch(`http://127.0.0.1:8000/todo/${task.id}/`,{
        method:'PUT',
        body:JSON.stringify(task),
        headers:{
          'Content-Type': 'application/json'
        }
      })

      setUpdate(update+1)
    }

    if(!todoList){
      return(
        <div
        style={{ backgroundColor: "white", color: "black" }}
        className="square"
        draggable='true'
        onDragStart={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}
        onDragEnd={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}

        onDrop={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}

        onDragLeave={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}

        >

        </div>
      )
    }

  return todoList?.map((task,index) => {
    return (
      <div

        style={{ backgroundColor: "white", color: "black" }}
        className="square"
        key={index+43}
        draggable='true'
        onDragStart={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}
        onDragEnd={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}

        onDrop={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}

        onDragLeave={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}

      
      >
        
          <div key={index+46} className='configWrapper'>
          <Icon key={index+44} onClick={(e)=>handleOpenTask(e,task)} className='editIcn'  icon="material-symbols:edit" cursor={'pointer'} height='20' width='20' />
          <Dialogue key={task.id}  open={open} onClose={()=>setOpen(false)}>
            <form  key={index+7} onSubmit={(e)=>handleSubmit(e,selectedTask)}>
            

            <div  key={index+8} className="inputArea">
            {selectedTask  && selectedTask.isCompleted?<div key={index+99} className='statusDisp'><Icon width='30' height='30' className='statusIco' icon="mdi:clipboard-tick" /></div>:null}
          <div key={index+9} className="dateDisp">{dateFormat(selectedTask && selectedTask.date)}</div>
          <div key={index+10} className="title">
            <input
            maxLength={45}
              placeholder="Insert a Title"

              name="title"
              key = {task.title}
              value={selectedTask && selectedTask.title}
              type="text"
              className="titleInp"
              onChange={(e) => handleEdit(e,selectedTask)}
            ></input>
          </div>
          <div className="desc1">
            <textarea
  
              className="descInp"
              placeholder='Enter Description'
              value={selectedTask && selectedTask.desc}
              name="desc"
              onChange={(e) => handleEdit(e,selectedTask)}
            ></textarea>
          </div>

      
          
          <div key={index+3} className='priorBtns'>

          <button key={selectedTask && selectedTask.color+"1"} name='color'  onClick={(e)=>handleEdit(e,selectedTask)} type='button' value='#c8fac8' id='c1' style={{backgroundColor:selected=='c1'?"#c8fac8":"#deffde"}}>Low</button>
          <button key={selectedTask && selectedTask.color+"2"} name='color' value='#FFF7E6' onClick={(e)=>handleEdit(e,selectedTask)} type='button' id='c2' style={{backgroundColor:selected=='c2'?'#FFF7E6':'#FFFFF0'}}>Moderate</button>
          <button key={selectedTask && selectedTask.color+"3"} name ='color' value='#ff9082' onClick={(e)=>handleEdit(e,selectedTask)} type='button' id='c3' style={{backgroundColor:selected=='c3'?"#ff9082":"#fadbd7"}}>High</button>
          </div>
          <div className='statusDiv'>
            <div>Finished this task?<input name='isCompleted' checked={ selectedTask && selectedTask.isCompleted} key={index+77} type='checkbox' onChange={(e)=>handleEdit(e,selectedTask)}></input></div>
          </div>
          <button type='submit' onClick={()=>setOpen(false)} key={index+2} className="submitBtn">
            Submit Edit
          </button>

        </div>

            </form>

          </Dialogue>
          
          {isTodoPage?<Icon key={index+20} value={selectedTask && selectedTask.isDeleted} name='isDeleted' onClick={()=>removeTask(task)} className='dltIcn' color={task.isDeleted?'red':''} icon="bi:trash" height='20' width='20' cursor={'pointer'} />:
          <Icon key={index+20}  onClick={(e)=>deleteTask(task)} className='dltIcn'  icon="material-symbols:close"/>}

          


          </div>
        <div key={index+21} className="priorWrapper">

          
        
          <div
          className='priorDiv'
          key={index+22}
            style={{
              fontSize: "12px",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: task.color,
              color: textColor[task.color]

            }}
          >
            {range[task.color]}
          </div>

          {task  && task.isCompleted?<div key={index+99} className='statusDisp'><Icon width='30' height='30' className='statusIco' icon="mdi:clipboard-tick" /></div>:null}

        </div>
        <div key={index+23} className="titleDisp" style={{ backgroundColor: "#F6F6F6" }}>
          {task.title}
        </div>
        <div key={index+24} className="desc">{task.desc}</div>
      </div>
    );
  });
};

const Dialogue = memo(Dialog)
export const TaskQMemo = memo(TaskQ)


export default function Todo() {
  const [todo, setTodo] = useState({
    id:'', //id generation on backend.
    date: "",
    title: "",
    desc: "",
    color: "#FFF7E6",
    isCompleted:false,
    isDeleted:false
  });
  const redirect = useNavigate()
  const [selected,setSelected] = useState('c2')
  const [todoList, setTodoList] = useState([]);
  const [type, setType] = useState("text");

  const [empty,setEmpty] = useState(false)
 
  const { id,date, title, desc,color,isCompleted,isDeleted } = todo;
  console.log(todoList)

  useEffect(()=>{
    if(date){
    fetch(`http://127.0.0.1:8000/todo/get/${date}/`).then((res)=>{
      return res.json()
    }).then((data)=>{
      setTodoList(data)
    })
    }
  },[date])
 





  const handleChange = (e) => {
    setEmpty(false)
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  


    
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/todo/create/${date}/`, {
      method: "POST",
      body: JSON.stringify(todoList),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      redirect(`/todo`)
    }).catch((e)=>{
      console.log(e.response.data)
    });
  };

  const addTaskChange = () => {

    if(title?.length<=0){
      setEmpty(true)

    }
    else{
    setTodo(
      {...todo} //subject to change when backend is ready to setup
    )
    setTodoList([...todoList, todo]);
    setTodo({ date: date, title: "", desc: "", color: "#FFF7E6" ,isCompleted:false});
      }
  };

  
  const setPriority = (e) => {
    switch (e.target.value) {
      case "1":
        setTodo({
          ...todo,
          color: "#c8fac8",
        });

        setSelected(e.target.id)
    
        break;
      case "2":
        setTodo({
          ...todo,
          color: "#FFF7E6",
        });
        setSelected(e.target.id)

        break;
      case "3":
        setTodo({
          ...todo,
          color: "#ff9082",
        });
        setSelected(e.target.id)
        break;
      default:
        setTodo({
          ...todo,
          color: "#FFF7E6",
        });
        setSelected(e.target.id)
    
    }
  };



 





  return (
    <div className="main">
      <div>
     <BurgerMenu/>
     </div>
      <form className="formField" onSubmit={(e) => handleSubmit(e)}>
        {!date ? (
          <input
            open={true ? type == "date" : false}
            autoComplete="off"
            id="datepicker"
            min={`${new Date().getFullYear()}-${new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1).toString():new Date().getMonth()}-${new Date().getDate()}`}
            placeholder="Insert a Date"
            name="date"
            value={date}
            type={type}
            onBlur={() => setType("text")}
            onFocus={() => setType("date")}
            className="date"
            onChange={(e) => handleChange(e)}
          ></input>
        ) : (
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

            <button  onClick={(e)=>setPriority(e)} type='button' value='1' id='c1' style={{backgroundColor:selected=='c1'?"#c8fac8":"#deffde"}}>Low</button>
            <button value='2' onClick={(e)=>setPriority(e)} type='button' id='c2' style={{backgroundColor:selected=='c2'?'#FFF7E6':'#FFFFF0'}}>Moderate</button>
            <button  value='3' onClick={(e)=>setPriority(e)} type='button' id='c3' style={{backgroundColor:selected=='c3'?"#ff9082":"#fabbbb"}}>High</button>
            </div>
            <div className="addTask">
              <button type="button" className="taskBtn" onClick={addTaskChange}>
                Add Task +
              </button>
              

            </div>
            <button className="submitBtn" type="submit">
              Submit Todo list
            </button>
            {empty? <div className='errorDiv'>Please add a title</div>:null}
          </div>
        )}
      </form>

      <div className="bottomPage">
        <div className="tasksQ">
          <h2 style={{ textAlign: "center", fontWeight: "400" }}>
            <span>Task Queue</span>
          </h2>
    
          <TaskQMemo isTodoPage={false} update={null} setUpdate={null} setTodoList = {setTodoList} setSelected={setSelected} selected={selected} range={range} dateFormat={dateFormat} todoList={todoList}></TaskQMemo>
        </div>
      </div>
    </div>
  );
}
