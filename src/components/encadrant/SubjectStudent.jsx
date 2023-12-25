import React, { useEffect, useState } from "react";
import {db} from '../../firebase'
import {collection, getDocs} from 'firebase/firestore'
import Home from "../Home";

function SubjectStudent() {
    const [sujets, setSujets] = useState([]);
    const stagesCollectionRef = collection(db, "SujetEtudiant")
    useEffect(() => {
        const getSujets = async () =>{
            const data = await getDocs(stagesCollectionRef);
            setSujets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getSujets();
    })



  return (
    <div>
      <Home />
      <br/><br/><br/>
      
    <h1 style={{textAlign:"center"}}>Sujets des etudiants</h1>
         <table class="SubjectStudent table table-hover">
            <thead>
                <tr>
                    <th scope="col">Intitule</th>
                    <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
            {sujets.map((SubjectStudent) => {
                return(
            <tr>
      <td>{SubjectStudent.intitule}</td>
      <td>{SubjectStudent.description}</td>
    </tr>
                );
       })}
            </tbody>
         </table>
         </div>
  )
}

export default SubjectStudent