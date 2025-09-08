import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer,toast } from "react-toastify"

const CreateEmployee = () => {
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
      axios.post("http://localhost:3000/employee",details)
      resetForm()
      toast.success("Employee Created Successfully")
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
  let {name,email,phone,dob,designation,photo}=formik.values
  let {handleChange,handleSubmit}=formik
  
  return (
    <>
    
    <div className="form_container">
    
    <h2 id="heading">Employee Form Registration</h2>
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
    <input type="submit" id="submit" value="Create Employee" />
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

export default CreateEmployee