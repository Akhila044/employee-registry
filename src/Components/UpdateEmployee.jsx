// @step-3 same create employee form we are bringing here
import { useFormik } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { ToastContainer,toast } from "react-toastify"
import { useEffect } from "react"

const UpdateEmployee = () => {
let {id}=  useParams()           //@ step-5 this hook used to define id
     let navigate= useNavigate()
  let formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      phone:"",
      dob:"",
      designation:"",
      photo:""
     },
    onSubmit:(details,{resetForm})=>{
           axios.put(`http://localhost:3000/employee/${id}`,details)    //@putting data into form
          resetForm()
          toast.success("Employee Updated Successfully")
          setTimeout(()=>{
            navigate("/")
          },4000)
    }
  })
  let handleImageChange=(e)=>{
     let file=e.target.files[0]
     
     if(file){
     let reader= new FileReader()
        reader.onload=()=>{
           formik.setFieldValue("photo",reader.result)
        }
          reader.readAsDataURL(file)
     }
    
  }
  // @step-4 update
  let fetchData=async ()=>{
     let {data}= await axios.get(`http://localhost:3000/employee/${id}`)  
       formik.setValues(data)    //@step-6 already existing data should bring to make modifications  thats why we are using something called as formik.setvalues(data)
  }
  
    
  //  # actually this will return promise if we get that by async and await it will give response inside response there is something called data that data we are destrcturing here
   
  useEffect(()=>{            //@we are using use effect hook and calling function inside to avoid  calling of multiple request
         fetchData()
  },[])
  
  let {name,email,phone,dob,designation,photo}=formik.values
  let {handleChange,handleSubmit}=formik
  
  return (
    <>
    
    <div className="form_container">
    
    <h2 id="heading">Update Employee Details</h2>
    <fieldset>
    <form onSubmit={handleSubmit} >
    
    <label htmlFor="name">Name:</label>
    <input type="text" name="name" id="name" placeholder="Enter Your Name" value={name} onChange={handleChange}/>
    <br />
    <label htmlFor="email">Email:</label>
    <input type="email" name="email" id="email" placeholder="Enter Your Email" value={email} onChange={handleChange}/>
     <br />
    <label htmlFor="phone">Phone:</label>
    <input type="tel" name="phone" id="phone" placeholder="Enter Your Phone Number" value={phone} onChange={handleChange}/>
     <br />
    <label htmlFor="dob">Date Of Birth:</label>
    <input type="date" name="dob" id="dob" value={dob} onChange={handleChange}/>
    <br /> 
    <label htmlFor="designation">Designation:</label>
    <input type="text" name="designation" id="designation" placeholder="Enter Your Designation" value={designation} onChange={handleChange}/>
     <br /> 
    <label htmlFor="photo">Photo:</label>
    <input type="file" name="photo" id="photo"onChange={handleImageChange} />
    <br /><br />
    <input type="submit" id="submit" value="Update Employee"/>
    <br /> <br />
    <button onClick={()=>{navigate("/")}} id="returnHome">Go To Home Page</button>
    </form>
     </fieldset>
     <br />
     
    </div>
   <ToastContainer/>
   
  
   
   </>
  )
}

export default UpdateEmployee