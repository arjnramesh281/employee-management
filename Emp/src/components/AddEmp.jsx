import { useState } from "react"
import axios from "axios"



const AddDetail=()=>{
    const [empid,setEmpid]=useState("")
    const [name,setName]=useState("")
    const[address, setAddress]=useState("")
    const[position, setPosition]=useState("")
    const[salary, setSalary]=useState("")
    const[experiance, setExperiance]=useState("")
    const[phone, setPhone]=useState("")
    const[email, setEmail]=useState("")



    
    const handleClick=()=>{
        // window.location.reload()
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("https://alan2325.pythonanywhere.com/employe/employees/",{empid,name,address,position,experiance,salary,phone,email})
        .then(response=>{
            console.log(response.data)
            setEmpid("")
            setName("")
            setAddress("")
            setPosition("")
            setSalary("")
            setExperiance("")
            setPhone("")
            setEmail("")
            
        })
        .catch(error=>console.log(error)
        )
        handleClick()

    }



    return(
        <div className="container" >
            <form onSubmit={handleSubmit}>
                <h2 className="text-info">Add Details of New Employee</h2>
                
                <div>
                    <label className="text-dark">Empid</label>
                    <input type="tel" className="form-control" value={empid} onChange={(e)=>setEmpid(e.target.value)} />
                </div>
                <div>
                    <label className="text-dark mt-3">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                    <label className="text-dark mt-3">Address</label>
                    <textarea  className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} />
                </div>
                <div>
                    <label className="text-dark mt-3">Position</label>
                    <input type="text" className="form-control" value={position} onChange={(e)=>setPosition(e.target.value)} />
                </div>
                <div>
                    <label className="text-dark mt-3">Salary</label>
                    <input type="tel" className="form-control" value={salary} onChange={(e)=>setSalary(e.target.value)} />
                </div>
                <div>
                    <label className="text-dark mt-3">Experiecnce</label>
                    <input type="tel" className="form-control" value={experiance} onChange={(e)=>setExperiance(e.target.value)} />
                </div>
                <div>
                    <label className="text-dark mt-3">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="text-dark mt-3">Phone</label>
                    <input type="tel" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-secondary mt-3">Add</button>
            </form>
        </div>
    )



}

export default AddDetail