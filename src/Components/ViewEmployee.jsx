import axios from "axios"
import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"


const ViewEmployee = () => {

   let {id}= useParams()
   console.log(id)
   let [employee,setEmployee]=useState(null)
  let fetchData= async ()=>{
    let {data}= await axios.get(`http://localhost:3000/employee/${id}`)
    // console.log(data)
    setEmployee(data)
  }
  useEffect(()=>{
     fetchData()
  },[])
  return (
    <div id="outside_view_page">
    {employee==null ? "loading...." : 
              <article id="view_page">
                <img src={employee.photo} alt={employee.name} height="200" width="200" />
              <h1>{employee.name}</h1>
              <p id="view_email">{employee.email}</p>
              <p id="view_phone">📞+91 {employee.phone}</p>
              <p id="view_dob">🎂{employee.dob}</p>
              <h2>{employee.designation}</h2>
             
    </article>}
    </div>
  )
}

export default ViewEmployee