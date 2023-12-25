import React, { useState } from "react";
import { auth, db} from "../../firebase";
import {useNavigate} from "react-router-dom"
import '../../../src/style.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import img from "../../images/emsilogo.png"
import "../../components/auth/Login.css"
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';


const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const [userRole, setUserRole] = useState("");
    async function handleLogin(e){
        e.preventDefault();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        
            // Maintenant que l'utilisateur est connecté, récupérez son rôle depuis la collection "users"
            const userDoc = await getDoc(doc(db, 'Users', user.uid));
        
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const userRole = userData.role;
              setUserRole(userRole);
              // Rediriger l'utilisateur en fonction de son rôle
              switch (userRole) {
                case 'encadrant':
                  nav('/studentsinternship');
                  nav('/subjectsupervisor');
                  nav('/subjectstudent');
                  break;
                case 'responsable stage':
                  nav('/students');
                  break;
                case 'responsable convention':
                  nav('/convention');
                  break;
                default:
                  nav('/home');
            }
          }
        }
        catch (error) {
          setError(true);
        }
      }

    return (
    <div className="login"> 
    <img class="image" src={img} alt="" />
      <div class="wrapper">
      <h2 className="text-center mt-0.2 name">Veuillez saisir vos coordonnées d'accès:</h2>
      <form class="p-3 mt-5" onSubmit={handleLogin}>
          <div class="form-field d-flex align-items-center">
          <FaEnvelope className="icon" />
              <input type="text" name="email" id="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div class="form-field d-flex align-items-center">
          <FaLock className="icon" />
              <input type="password" name="password" id="pwd" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button class="btn mt-3" type="submit">Login</button>
          {error && <span>Wrong email or password!</span>}
      </form>
  </div>
  </div>
      );
    };
    
    export default Login;  
