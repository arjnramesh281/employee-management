import { useState, useEffect } from "react"
import axios from "axios"


const EmpList=()=>{
    const [details, setDetails]=useState([])
    const [seremp, setSerEmp]=useState([])
    const [filteredemp, setFilteredEmp]=useState([])
    const [editing, setEditing]=useState(false)
    const [currentDetail, setCurrentDetail]=useState({id:null, empid:null,name:"", address:"", position:"" , salary:null,experiance:null, email:"" , phone:null})


    useEffect(()=>{
        axios.get("https://alan2325.pythonanywhere.com/employe/employees/")
        .then(response=>{
            setDetails(response.data)
            setFilteredEmp(response.data)

        })
        .catch(error=>console.log(error)
        )
    },[])
 


    const deleteDetail =(id)=>{
        axios.delete(`https://alan2325.pythonanywhere.com/employe/employees/${id}/`)
        .then(response=>{
            setTasks(details.filter(detail.id !==id))
        })
        .catch(error=>console.log(error)
        )

    }





    const editDetail=(detail)=>{

            setEditing(true)
            setCurrentDetail(detail)

        

    }

    const updateDetail=(id,updateDetail)=>{
        setEditing(false)
        axios.put(`https://alan2325.pythonanywhere.com/employe/employees/${id}/`,updateDetail)
        .then(response=>{
            setDetails(details.map(detail=>(detail.id === id ? response.data :detail)))
        })
        .catch(error=>console.log(error)
        )
    }



    useEffect(()=>{
        const result=details.filter(detail=>
            detail.name.includes(seremp)  ||  detail.address.includes(seremp) || detail.position.includes(seremp)
            || detail.empid.toString().includes(seremp) ||  detail.salary.toString().includes(seremp)  
        )
        setFilteredEmp(result)
    },[seremp,details])





    return(
        <div className="container-mt-3">
            <h2 className="text-center">Employee Management</h2>
            <input type="text" placeholder="Search" value={seremp} onChange={(e)=>setSerEmp(e.target.value)} />
            <table className="table table-border table-hover">
                    <thead className="text-decoration-underline">
                        <tr>
                        <td>Empid</td>
                        <td>Name</td>
                        <td>Address</td>
                        <td>Position</td>
                        <td>Salary</td>
                        <td>Experiance</td>
                        <td>Email</td>
                        <td>Phone</td>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredemp.map(detail=>(
                    <tr key={detail.id}>                     
                       <td>{detail.empid}</td>
                        <td>{detail.name}</td>
                        <td>{detail.address}</td>
                        <td>{detail.position}</td>
                        <td>{detail.salary}</td>
                        <td>{detail.experiance}</td>
                        <td>{detail.email}</td>
                        <td>{detail.phone}</td>
                        <td><button className="btn btn-primary px-3" onClick={()=>editDetail(detail)}>Edit</button></td>
                        <td><button className="btn btn-danger" onClick={()=>deleteDetail(detail.id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {editing ?(
                <EditDetailForm currentDetail={currentDetail} updateDetail={updateDetail}/>
            ):null}
        </div>
    )


}

const EditDetailForm=({ currentDetail,updateDetail})=>{
    const [detail,setDetail]=useState(currentDetail)


    useEffect(()=>{
        setDetail(currentDetail)
    },[currentDetail])


    const handleInputChange=(e)=>{
        const{name, value}=e.target;
        setDetail({...detail,[name]:value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        updateDetail(detail.id, detail)
    }


    return(
        <div className="container">
        <form className="" onSubmit={handleSubmit}>
            <h2 className="my-5">Edit Details</h2>
            <div>
                <label className="text-dark">Emp ID</label>
                <input className="form-control" type="tel" name="empid" value={detail.empid} onChange={handleInputChange} />
            </div>
            <div>
                <label>Name</label>
                <input className="form-control" type="text" name="name" value={detail.name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Address</label>
                <textarea className="form-control" name="address" value={detail.address} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Position</label>
                <input className="form-control" type="text" name="position" value={detail.position} onChange={handleInputChange} />
            </div>
            <div>
                <label>Salary</label>
                <input className="form-control" type="tel" name="salary" value={detail.salary} onChange={handleInputChange} />
            </div>
            <div>
                <label>Experience</label>
                <input className="form-control" type="text" name="experiance" value={detail.experiance} onChange={handleInputChange} />
            </div>
            <div>
                <label>Phone</label>
                <input className="form-control" type="tel" name="phone" value={detail.phone} onChange={handleInputChange} />
            </div>
            <div>
                <label>Email</label>
                <input  className="form-control" type="email" name="email" value={detail.email} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-success mt-2">Update Details</button>
        </form>
        </div>
    )
}

export default EmpList