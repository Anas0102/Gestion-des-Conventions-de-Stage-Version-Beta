import React, { useEffect, useState } from "react";
import {db} from '../../firebase'
import {collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase";
import Home from "../Home";
import { RiDeleteBin7Line } from "react-icons/ri";
function Students() {
    const [newMatricule, setNewMatricule] = useState("");
    const [newSite, setNewSite] = useState("");
    const [newPrenom, setNewPrenom] = useState("");
    const [newNom, setNewNom] = useState("");
    const [newFiliere, setNewFiliere] = useState("");
    const [newAnnee, setNewAnnee] = useState("");
    const [newGroupe, setNewGroupe] = useState("");
    const [newTelephone, setNewTelephone] = useState("");
    const [newStage, setNewStage] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    async function handleCreateStudent(e){
        e.preventDefault();
          createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
          })
          .catch((error) => {
            setError(true);
          });
      }

    const [students, setStudents] = useState([]);
    const studentsCollectionRef = collection(db, "InfoEtudiant");


    const infoStudent = async() => {
        await addDoc(studentsCollectionRef, {ID: newMatricule, site: newSite, prenom: newPrenom, nom: newNom,
             filière: newFiliere, année: newAnnee, groupe: newGroupe, téléphone: newTelephone, email: email, password: password, stage: newStage});
    };

    const deleteStudent = async (id) => {
        const studentDoc = doc(db, "InfoEtudiant", id);
        await deleteDoc(studentDoc);
    }

    useEffect(() => {
        const getStudents = async () =>{
            const data = await getDocs(studentsCollectionRef);
            setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getStudents();
    })

    return (
    <div>
      <Home />
        <br/><br/><br/>
    <div className="Students" class=""> 
    <div class="text-center mt-2 name">
    <h1>Gestion des etudiants</h1>
    </div>
    <form class="text-center mt-4 name row" onSubmit={handleCreateStudent}>
    <div class="mb-3 col">
    <input placeholder="Matricule..." onChange={(event) => {setNewMatricule(event.target.value);}}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Site..." onChange={(event) => {setNewSite(event.target.value);}}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Prenom..." onChange={(event) => {setNewPrenom(event.target.value);}}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Nom..." onChange={(event) => {setNewNom(event.target.value);}}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Filière..." onChange={(event) => {setNewFiliere(event.target.value);}}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Année..." onChange={(event) => {setNewAnnee(event.target.value);}}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Groupe..." onChange={(event) => {setNewGroupe(event.target.value);}}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Téléphone..." onChange={(event) => {setNewTelephone(event.target.value);}}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Adresse e-mail professionnelle..." onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div class="mb-3 col">
    <input placeholder="Stage (oui, non)..." onChange={(event) => {setNewStage(event.target.value);}}/>
    </div>
    <button class="btn btn-primary w-25 d-grid gap-2 col-6 mx-auto" onClick={() => {infoStudent();}} >Ajouter Etudiant</button>
        {error}
    </form>
    </div>
          <table class="table table-hover mt-4">
            <thead>
                <tr>
                    <th scope="col">Matricule</th>
                    <th scope="col">Site</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Filière</th>
                    <th scope="col">Année</th>
                    <th scope="col">Groupe</th>
                    <th scope="col">Téléphone</th>
                    <th scope="col">Mot de passe</th>
                    <th scope="col">Adresse e-mail professionnelle</th>
                    <th scope="col">Stage</th>
                    <th scope="col">Actions</th>

                </tr>
            </thead>
            <tbody>
            {students.map((Students) => {
                return(
            <tr>
      <td>{Students.ID}</td>
      <td>{Students.site}</td>
      <td>{Students.prenom}</td>
      <td>{Students.nom}</td>
      <td>{Students.filière}</td>
      <td>{Students.année}</td>
      <td>{Students.groupe}</td>
      <td>{Students.téléphone}</td>
      <td>{Students.password}</td>
      <td>{Students.email}</td>
      <td>{Students.stage}</td>
      <td><button className="btn btn-danger" onClick={() => {deleteStudent(Students.id)}}><RiDeleteBin7Line /></button></td>
    </tr>
                );
       })}
            </tbody>
         </table>
         </div>

    )
}

export default Students;