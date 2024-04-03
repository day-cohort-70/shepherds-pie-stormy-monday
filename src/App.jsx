import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Login />} />
    {/* <Route path="/register" element={<Register />} /> 
    <Route path="*" element={
      <Authorized>
        <ApplicationViews />
      </Authorized>
    } /> */}
    </Routes>
    </>
   );
}

export default App;
