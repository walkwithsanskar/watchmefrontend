import {BrowserRouter,Navigate,Routes,Route} from "react-router-dom"
import Home from "./pages/homepage/Home"
import Login from "./pages/login/Login"
import NavBar from "./components/NavBar"
import ProfilePage from "./pages/profile page/ProfilePage"
import OpenRoute from "./components/OpenRoute"

function App() {
  
  return (
    <div className="App bg-neutral-900 h-[100vh] w-[100vw] overflow-y-scroll overflow-x-hidden text-white">

       
  
          <NavBar/>
         
          <div className="mt-5">
            
          <Routes>
          <Route path="/" element={<Login/>}/>

         
                
            <Route path="/home" element={
                  <OpenRoute>
                        <Home/>
                  </OpenRoute>}/>

          
          <Route path="/profile/:userId" element = { <OpenRoute><ProfilePage/></OpenRoute>}/>
         
          <Route path="*"  element={<div className="text-center"> 404 Not Found <br></br> Goli Beta Masti Nai</div>}/>

          </Routes>
          </div>

        
 
    </div>
  );
}

export default App;
