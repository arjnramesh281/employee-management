import { useState, useEffect } from "react"
import axios from "axios"


const EmpList=()=>{
    const [details, setDetails]=useState([])
    const [editing, setEditing]=useState(false)
    const [currentDetail, setCurrentDetail]=useState({id:null,name:"", address:"", position:"" , salary:null,experience:null, email:"" ,empid:null})


    useEffect(()=>{
        axios.get("https://aiswarya2325.pythonanywhere.com/employemanagement/employees/")
        .then(response=>setDetails(response.data))
        .catch(error=>console.log(error)
        )
    },[])
 

    const editDetail=(detail)=>{

            setEditing(true)
            setCurrentDetail(detail)

        

    }

    const updateDetail=(id,updateDetail)=>{
        setEditing(false)
        axios.put(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees/${id}/`,updateDetail)
        .then(response=>{
            setDetails(details.map(detail=>(detail.id === id ? response.data :detail)))
        })
        .catch(error=>console.log(error)
        )
    }


    return(
        <div className="container-mt-3">
            <h2 className="text-center">Employee Management</h2>
            <table className="table table-border table-hover">
                <thead>
                {details.map(detail=>(
                    <tr key={detail.id}>
                        <td>{detail.name}</td>
                        <td>{detail.address}</td>
                        <td>{detail.position}</td>
                        <td>{detail.salary}</td>
                        <td>{detail.experience}</td>
                        <td>{detail.email}</td>
                        <td>{detail.empid}</td>
                        <td><button className="btn btn-primary px-3" onClick={()=>editDetail(detail)}>Edit</button></td>
                        <td><button className="btn btn-danger" onClick={()=>deleteDetail(detail.id)}>Delete</button></td>
                    </tr>
                ))}
                </thead>
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
        <form onSubmit={handleSubmit}>
            <h2>Edit Details</h2>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={detail.name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Address</label>
                <textarea name="address" value={detail.address} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Position</label>
                <input type="text" name="" value={detail.name} onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-success">Update Details</button>
        </form>
        </div>
    )
}

export default EmpList