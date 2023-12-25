import './App.css';
import Login from './components/auth/Login';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import StudentInternship from './components/encadrant/StudentInternship';
import Students from './components/responsable_conv/Students';
import SubjectSupervisor from './components/encadrant/SubjectSupervisor';
import Home from './components/Home';
import SubjectStudent from './components/encadrant/SubjectStudent';
import Convention from './components/responsable_conv/Convention';
import Meeting from './components/encadrant/meeting';


function App() {
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"/studentsinternship",
      element:<StudentInternship/>
    },
    {
      path:"/students",
      element:<Students/>
    },
    {
      path:"/subjectsupervisor",
      element:<SubjectSupervisor/>
    },
    {
      path:"/subjectstudent",
      element:<SubjectStudent/>
    },
    {
      path:"/convention",
      element:<Convention/>
    },
    {
      path:"/meetings",
      element:<Meeting/>
    },
  
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
