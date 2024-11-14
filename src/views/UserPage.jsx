import React , { useState }from 'react'
import "../assets/css/UserPage.scss"

const UserPage=()=>{
    const [FormData, setFormData]= useState({
        UserId:'',
        FirstName:'',
        LastName:'',
        Email:'',
        Password:'',
        RoleId:'',
        ContactNumber:'',
        Address:'',
        DepartmentId:''
    });

    //handle form input
    const handleChange=(e)=>{
        e.preventDefault();

        const {name:value}=e.target;
        setFormData({
            ...FormData,
            [name]:value
        })   
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        //logic here using api call
        // console.log("Form Submitted !")
        alert("Form Submitted !")
    };

    return (
        <div class="main-body">
            <h2>User Creation Form</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="FirstName" value={FormData.FirstName} onChange={handleChange}/>
                </label>

                <label >
                    Last Name: 
                    <input type="text" name="LastName" value={FormData.LastName} onChange={handleChange}/>
                </label>

                <label >
                    Email:
                    <input type="email" name="Email" value={FormData.Email} onChange={handleChange}/>
                </label>

                <label >
                    Password:
                    <input type="password" name='Password' value={FormData.Password} onChange={handleChange}/>
                </label>
                
                <label >
                    Role Id:
                    <input type="number" name="RoleId" value={FormData.RoleId} onChange={handleChange}/>
                </label>

                <label>
                    Contact Number:
                    <input type="tel" name="ContactNumber" value={FormData.ContactNumber} onChange={handleChange}/>
                </label>


                <label>
                    Address:
                    <input type="text" name="Address" value={FormData.Address} onChange={handleChange}/>                  
                </label>

                <label>
                    Department:
                    <select name="DepartmentId" value={FormData.DepartmentId} onChange={handleChange}>
                        <option value="">Select Department</option> {/* Default option */}
                        <option value="Nurse">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Doctor">Technician</option>
                    </select>
                </label>
                <button type='submit'>Submit</button>
            </form>

        </div>
    );
}

export default UserPage;