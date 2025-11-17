import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'

import './style.css'

const App = () => {
 
const [note,setNote]=useState([])
const [toggle,setToggle]=useState(false)
  const titleref=useRef('')
  const noteref=useRef('')
  const findId=useRef('')



  const getData=async()=>{
    try {
        const data=await axios.get('https://notes-api-backend-vinq.onrender.com/home/Note')
        setNote(data.data.message)
    } catch (error) {
      console.log('error from getData')
    }

  }
  const postData=async()=>{
        try {
          const data={
            title:titleref.current.value,
            notes:noteref.current.value
          }
          const AddNote=await axios.post('https://notes-api-backend-vinq.onrender.com/home/AddNote',data,{
            headers:{"Content-Type":"application/json"}
          })
         
          
        } catch (error) {
           console.log('error from postData')
        }
         getData()
         titleref.current.value="",
         noteref.current.value=""
  }
  const editData=(cur)=>{
     findId.current=cur._id
      titleref.current.value=cur.title
      noteref.current.value=cur.notes
   
      
setToggle(!toggle)
  }
  const putData=async()=>{
    try {
      const data={
        title:titleref.current.value,
        notes:noteref.current.value
      }
      const UpdateNote=await axios.put(`https://notes-api-backend-vinq.onrender.com/home/UpdateNote/${findId.current}`,data,{
          headers:{"Content-Type":"application/json"}

          
      })
      titleref.current.value="",
       noteref.current.value=""
       getData()
       setToggle(!toggle)
       
    } catch (error) {
      console.log('error from putData')
    }
    
  }
  const deleteData=async(cur)=>{
    try {
      const DeleteNote=await axios.delete(`https://notes-api-backend-vinq.onrender.com/home/DeleteNote/${cur._id}`)
        
    } catch (error) {
       console.log('error from deletedata')
    }
    getData()
  }





  useEffect(()=>{
    getData()
  },[])





  return (
    <div className='main-container'>
      {/* <div  className='titlenotes'> */}
      <div className='input-box'> 
        <h1>Title And Notes</h1>
        <input className='title' type="text" placeholder='title' ref={titleref} />
        <textarea className='notes' name="add new story" id="" ref={noteref} />
        {toggle?( <button className='up-but' onClick={putData}><img style={{width:'40px',height:'40px'}}  src="https://cdn-icons-png.flaticon.com/128/10695/10695869.png" alt="" /></button>):(<button className='add-but' onClick={postData}><img style={{width:'60px',height:'60px'}} src="https://cdn-icons-png.flaticon.com/128/992/992482.png" alt="" /></button>)}
        
       
      </div>
     <div className='result'>
  {
    note.map((cur, i) => (
      <div key={i} className='notes-item'>
        <div className="button-group">
          <button className='edit-but' onClick={() => editData(cur)}>
            <img style={{ width: "20px", height: '20px' }} src='https://cdn-icons-png.flaticon.com/128/9356/9356210.png' alt='' />
          </button>
          <button className='del-but' onClick={() => deleteData(cur)}>
            <img style={{ width: "20px", height: '20px' }} src='https://cdn-icons-png.flaticon.com/128/6997/6997199.png' alt='' />
          </button>
        </div>
        <h4 className='title-name'>{cur.title}</h4>
        <h4 className='notes-name'>{cur.notes}</h4>
         
            <p>Created:{new Date(cur.createdAt).toLocaleString()}</p>
            

      </div>
    ))
  }
</div>
  
      {/* </div> */}
    </div>
  )
}

export default App