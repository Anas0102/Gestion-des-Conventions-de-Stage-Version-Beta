import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import './Home.css'
import { doc, getDoc } from 'firebase/firestore';

import { PiStudentBold } from "react-icons/pi";
import { FaNetworkWired } from "react-icons/fa6";
import { MdOutlineSubject } from "react-icons/md";
import { FaFileContract } from "react-icons/fa6";
import { SiGotomeeting } from "react-icons/si";
import { FaHome } from "react-icons/fa";


import img from "../../src/images/emsilogo.png"
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
function Home() {
  const history = useNavigate()
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    // Fetch the user's role from Firebase when the component mounts
    const user = auth.currentUser;
    const fetchUserRole = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'Users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
        }
      }
    };

    fetchUserRole();
  }, []);

  const handleClick = () => {
    signOut(auth).then(val=>{
      console.log(val,"val")
      history('/')
    })
  }
  return (
    <div >
      <Navbar className="navbar fixed-top" data-bs-theme="light">
        <Container fluid>
        <div>
            <Navbar.Brand>
              <img className="image-menu" src={img} alt="React Bootstrap logo" />
            </Navbar.Brand>
          </div>
          
          <Nav className="d-flex">
          <Link to="/home" className="nav-link mr-2"> 
    <FaHome className="Icons" /> Home
  </Link>
  {userRole === 'responsable stage' && (
          <Link to="/students" className="nav-link mr-2">
            <PiStudentBold className="Icons" /> Gestion des etudiants
          </Link>
        )}
        {userRole === 'encadrant' && (
  <>
    <Link to="/studentsinternship" className="nav-link mr-2">
      <FaNetworkWired className="Icons" /> Stages des etudiants
    </Link>
    <MdOutlineSubject className="Icon-subject" />
    <NavDropdown title="Sujets" id="navbarScrollingDropdown">
      <NavDropdown.Item href="#action4">
        <Link to="/subjectstudent" className="nav-link mr-2">
          Sujets des etudiants
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to="/subjectsupervisor" className="nav-link mr-2">
          Sujets des encadrants
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
    <Link to="/meetings" className="nav-link mr-2">
    <SiGotomeeting className="Icons" /> Meetings
  </Link>
  </>
)}
  {userRole === 'responsable convention' && (
  <Link to="/convention" className="nav-link mr-2"> {/* Add mr-3 for margin-right */}
    <FaFileContract className="Icons" /> Conventions
  </Link>
  )}
 
  <button type="button"  className='nav-link mr-3'class="btn btn-light " onClick={handleClick}>Signout</button>
</Nav>
            
          
          
        </Container>
      </Navbar>
      
       
       </div>
  )
}

export default Home