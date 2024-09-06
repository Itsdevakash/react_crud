
import { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import "./App.css"
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const App=()=>{

  const model ={
    fullname: '' ,
    class_name: '' ,
    roll_no: '' ,
    subject: '' ,
    dob: '' ,
    mobile: '' ,
    address: '' 

  }

  const [editindex,setEditIndex] = useState(null);
  const [right,setRight] = useState(-389);
  const [student,setStudent]= useState([]);
  const [form,setForm] =useState(model);
  const [show, setShow] = useState(null);
  const [openModels, setopenModels] = useState(null);


  const asiderShow=()=>{
    if(right === -389){
    setRight(0)
    }else{
      setRight(-389)
    }
    setForm(model)
    setEditIndex(null)
  }
  




  const  handleInput=(e)=>{
 const Input = e.target
 const value = Input.value
 const key = Input.name
 setForm({
  ...form,
  [key]:value
 })


  }

  const createStudent=(e)=>{
   
    e.preventDefault()
    setStudent([
      ...student,
      form
    ])
      setForm(model)
      setRight(-389)
      Swal.fire({
        title: "Success!",
        text: "Student Add Successfully !",
        icon: "success"
      });
  }

const studentdelete=()=>{
  const copyarry = [...student]
  copyarry.splice(show,1)
  setStudent(copyarry)
  setopenModels(null)
  Swal.fire({
    title: "Success!",
    text: " Student Delete Successfully !",
    icon: "success"
  });

}

const editStudent=(index)=>{
  setRight(0)
  setForm(student[index])
  setEditIndex(index)

}

const updateStudent=(e)=>{
  e.preventDefault()
  const copyarry = [...student]
  copyarry[editindex] = form
  setStudent(copyarry)
  setForm(model)
  setRight(-389)
  Swal.fire({
    title: "Success!",
    text: " Student Update Successfully !",
    icon: "success"
  });
}


const handleClose = () => setopenModels(null);
const handleShow = (index) => {
  setShow(index); 
  setopenModels(index+1)

}
 return(

  <div  style={{ 
    background:"#ddd",
    minHeight:"100vh"
   }}>
    <div style={{ 
      width:"70%",
      background:"White",
      margin: "32px auto",
      padding:32
     }}>
      <div>
        <h1  style={{ 
        padding:0,margin:0,textAlign:"center",
       }}>Student Details </h1>

        <button style={{ 
          border:'none',
          background:"blue",
          color:"#fff",
          padding:"14px 18px",
          borderRadius:"15px",
          fontSize:16,
          margin: '24px 0'
         }}
         onClick={()=>asiderShow()}
         ><i className="ri-add-circle-line"></i> New Student</button>

<table className='crud_app' border={1}>
  <thead>
  <tr>
  <th>S.no</th>
    <th>Name</th>
    <th>Class</th>
    <th>Roll No</th>
    <th>Subject</th>
    <th>Dob</th>
    <th>Mobile</th>
    <th>Address</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>


    {
      student.map((item,index)=>(

  
    <tr key={index}>
      <td>{index+1}</td>
      <td>{item.fullname}</td>
      <td>{item.class_name}</td>
      <td>{item.roll_no}</td>
      <td>{item.subject}</td>
      <td>{item.dob}</td>
      <td>{item.mobile}</td>
      <td>{item.address}</td>
      <td>
        <div>
          <button         
          onClick={()=>editStudent(index)}
          style={{ 
            border:"none",
            width:32,
            height:32,
            background:"#07c65d",
            color:"#fff",
            borderRadius:5,
            marginRight:12
           }}><i className="ri-edit-box-line"></i></button>

          {/* <button 
          onClick={()=>studentdelete(index)}
           style={{ 
            border:"none",
            width:32,
            height:32,
            background:"red",
            color:"#fff",
            borderRadius:5,
           }}><i className="ri-delete-bin-line"></i></button> */}

        <button 
         style={{ 
          border:"none",
          width:32,
          height:32,
          background:"red",
          color:"#fff",
          borderRadius:5,
         }}
         onClick={()=>handleShow(index) }>
        <i className="ri-delete-bin-line"></i>
      </button>  


        </div>
      </td>
    </tr>
        ))
}

  </tbody>
</table>


<Modal   size="sm" show={openModels} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={studentdelete}>
         yes 
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

         <div  style={{ 
             position:'fixed',
             top:0,
             right:right,
             width:300,
             background:'white',
             height:"100%",
             boxShadow:'0 0 40px rgba(0,0,0,0.2)',
             padding:32,
             boxSizing:'border-b0x'
          }}>
              <h2 style={{ 
                marginTop: '-7%',
                borderBottom: '1px solid',
               }}>  { editindex === null ? 'Add Student': 'Update Student ' }</h2>
             <button type="button" className="close" data-dismiss="modal" aria-label="Close" 
             style={{ 
              background: '#ffff',
              border: 'none',
              padding: '8px',
              position: 'absolute',
              top: '2px',
              right:'-4px'
              }}
              onClick={()=>asiderShow()}
              >
            <i className="ri-close-large-line"></i>
        </button>

        <form  
        onSubmit={editindex === null ? createStudent : updateStudent }
        style={{ 
          display:"flex",
          flexDirection: "column",
          gap:24
         }}>
         
          <input type='text' 
          value={form.fullname}
          onChange={handleInput}
          name='fullname'
          placeholder='Enter Your Full Name' 
          required
          style={{ 
             border: "1px solid #ccc",
             borderRadius:4,
             padding:10
           }}          
          />


           <input type='text' 
            value={form.class_name}
            onChange={handleInput}
          placeholder='Enter Your Class' 
          name='class_name'
          required
          style={{ 
             border: "1px solid #ccc",
             borderRadius:4,
             padding:10
           }}          
          />  

           <input type='number'
            onChange={handleInput} 
          placeholder='Enter Your Roll No' 
          name='roll_no'
          required         
          value={form.roll_no}      
          style={{ 
             border: "1px solid #ccc",
             borderRadius:4,
             padding:10
           }}          
          />  

           <input type='text' 
            value={form.subject}
            onChange={handleInput}
          placeholder='Enter Your Subject here' 
          name='subject'
          required
          style={{ 
             border: "1px solid #ccc",
             borderRadius:4,
             padding:10
           }}          
          />  

           <input type='date' 
              value={form.dob}
            onChange={handleInput}
          name='dob'
          required
          style={{ 
             border: "1px solid #ccc",
             borderRadius:4,
             padding:10
           }}          
          /> 

         <input type='number' 
              value={form.mobile}
          onChange={handleInput}
          name='mobile'
          placeholder='Enter Your Mobile here' 
          required
          style={{ 
             border: "1px solid #ccc",
             borderRadius:4,
             padding:10
           }}          
          />  

            <input type='text' 
               value={form.address}
             onChange={handleInput}
          name='address'
          placeholder='Enter Your Address here' 
          required
          style={{ 
             border: "1px solid #ccc",
             borderRadius:4,
             padding:16
           }}          
          /> 
          { editindex === null ?  
        
        <button type="submit"   
             style={{ 
              color: '#ffff',
              border: 'none',
              padding: '8px',  
              background:"blue",          
              }}
              >
          Submit
        </button>   

          :

        <button type="submit"   
             style={{ 
              color: '#ffff',
              border: 'none',
              padding: '8px',  
              background:"blue",          
              }}
              >
          Update
        </button>   

    
            }

          </form>

        
         </div >

      </div>


    </div>

     
  </div>

 )


}

export default App