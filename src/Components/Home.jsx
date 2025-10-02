import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let [details,setDetails]=useState(null)
  let navigate=  useNavigate()
  let fetchData=async ()=>{
  let  {data}= await axios.get("http://localhost:3000/employee")
    setDetails(data)
  }
  useEffect(()=>{
       fetchData()
  },[])
  let handleDelete=(id)=>{
    axios.delete(`http://localhost:3000/employee/${id}`)
    location.reload()
  }
  return (
    <section id='home_page'>
       <nav>
        <h1>Employee Registry</h1>
        <button onClick={()=>{navigate("/create-employee")}}> + Create Employee</button>
       </nav>
       <br />
        <header></header>
       <main>
        {details==null ? "loading....." : details.map((employee)=>{
             return <article key={employee.id}>
              <img src={employee.photo} alt={employee.name} height="200" width="200" id='image' />
              <h1 id='home_name'>{employee.name}</h1>
              <p id='home_email'>{employee.email}</p>
              <p id='home_phone'> 📞+91 {employee.phone}</p>
              <p id='home_dob'> 🎂 {employee.dob}</p>
              <h3 id='home_designation'>{employee.designation}</h3>
              <div id='btn_change'>
              <button onClick={()=>navigate(`/view-employee/${employee.id}`)} id='view'>View</button>
              <button  id='update' onClick={()=>navigate(`/update-employee/${employee.id}`)}>Update</button>  {/* step-2 update */}
               <button onClick={()=>handleDelete(employee.id)}  id='delete'>Delete</button>
              </div>
              </article>
        })}
       </main>
    </section>
  )
}

export default Home