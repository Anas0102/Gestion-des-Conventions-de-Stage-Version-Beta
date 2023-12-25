import React, { useEffect, useState } from "react";
import {db} from '../../firebase'
import {collection, getDocs} from 'firebase/firestore'
import Home from "../Home";

function StudentInternship() {
    const [stages, setStages] = useState([]);
    const stagesCollectionRef = collection(db, "Stage")
    useEffect(() => {
        const getStages = async () =>{
            const data = await getDocs(stagesCollectionRef);
            setStages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getStages();
    })

    return (
            <div>
                <Home />
                <br/><br/><br/><br/><br/>
                
                <h1 style={{textAlign:'center'}}>Stages des etudiants</h1>
         <table class="StudentInternship table table-hover">
            <thead>
                <tr>
                    <th scope="col">Entreprise</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Duree</th>
                    <th scope="col">Date Debut</th>
                    <th scope="col">Date Fin</th>
                    <th scope="col">Theme</th>
                    <th scope="col">Sujet</th>
                </tr>
            </thead>
            <tbody>
            {stages.map((internship) => {
                return(
            <tr>
      <td>{internship.entreprise}</td>
      <td>{internship.adresse}</td>
      <td>{internship.duree}</td>
      <td>{internship.date_debut}</td>
      <td>{internship.date_fin}</td>
      <td>{internship.theme}</td>
      <td>{internship.sujet}</td>
    </tr>
                );
       })}
            </tbody>
         </table>
         </div>
    )
}

export default StudentInternship;