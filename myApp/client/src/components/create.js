import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
 const [form, setForm] = useState({
   name: "",
   information: "",
   image: "",
   email:"",
   password:"",
 });
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };

   await fetch("http://localhost:3000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setForm({ name: "", information: "", image: "",email:"",password:"" });
   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="information">Information</label>
         <input
           type="text"
           className="form-control"
           id="information"
           value={form.information}
           onChange={(e) => updateForm({ information: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
         <div className="form-group">
           <label htmlFor="name">Password</label>
           <input
             type="text"
             className="form-control"
             id="password"
             value={form.password}
             onChange={(e) => updateForm({ password: e.target.value })}
           />
         </div>
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="informationOptions"
             id="informationIntern"
             value="Intern"
             checked={form.image === "Intern"}
             onChange={(e) => updateForm({ image: e.target.value })}
           />
           <label htmlFor="informationIntern" className="form-check-label">Intern</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="informationOptions"
             id="informationJunior"
             value="Junior"
             checked={form.image === "Junior"}
             onChange={(e) => updateForm({ image: e.target.value })}
           />
           <label htmlFor="informationJunior" className="form-check-label">Junior</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="informationOptions"
             id="informationSenior"
             value="Senior"
             checked={form.image === "Senior"}
             onChange={(e) => updateForm({ image: e.target.value })}
           />
           <label htmlFor="informationSenior" className="form-check-label">Senior</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
