import React, { useEffect, useState } from "react";
import {db} from '../../firebase'
import {collection, getDocs, addDoc} from 'firebase/firestore'
import Home from "../Home";

function SubjectSupervisor() {
  const [newIntitule, setNewIntitule] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [subjectsupervisor, setSubjectsupervisor] = useState([]);
  const subjectsupervisorCollectionRef = collection(db, "SujetEncadrant");

  const createSubjectSupervisor = async() => {
    await addDoc(subjectsupervisorCollectionRef, {intitule: newIntitule, description: newDescription });
};

useEffect(() => {
  const getSubjectsupervisor = async () =>{
      const data = await getDocs(subjectsupervisorCollectionRef);
      setSubjectsupervisor(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  getSubjectsupervisor();
})

return (
  <div>
    <Home />
    <br/><br/><br/>
    
    <h1 style={{textAlign:"center"}}>Sujets des encadrants</h1>
<div className="SubjectSupervisor"> 
    <input placeholder="Intitule..." class="ms-3" onChange={(event) => {setNewIntitule(event.target.value);}}/>
    <input placeholder="Description..." class="ms-3" onChange={(event) => {setNewDescription(event.target.value);}}/>
    <button class="btn btn-primary ms-3" onClick={createSubjectSupervisor}>Ajouter le Sujet</button>
    <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Intitule</th>
                    <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
            {subjectsupervisor.map((SubjectSupervisor) => {
                return(
            <tr>
      <td>{SubjectSupervisor.intitule}</td>
      <td>{SubjectSupervisor.description}</td>
      </tr>
                );
       })}
            </tbody>
            </table>
  </div>
  </div>
)
}

export default SubjectSupervisor;