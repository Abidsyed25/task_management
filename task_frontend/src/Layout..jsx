import Tasks from "./Tasks";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
function Layout() {
    const [cook, setCook] = useCookies(['id']);
    let [data,setdata] = useState([
        // {id:1,title:'sd',description:'sdf',date_started:'2343-01-01',deadline:'2344-01-01',status:'ok'}
         // Add more tasks as needed
       ]);
       useEffect(() => {
        const fetchData = async () => {
          const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token':cook.id,
            },
          };
    
          try {
            const response = await fetch('https://ol-naom.onrender.com/get', options);
            const result = await response.json();
            console.log(result);
            // Assuming result is an array, update state accordingly
            setdata(result);
          } catch (error) {
            console.log("hi" + error);
          }
        };
    
        fetchData();  // Call the fetchData function
      }, [cook.id]); 
    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>    
            <Route path="/task" element={<Tasks data={data} setdata={setdata}/>}/>
            
        </Routes>
        
        </>
    );
}
export default Layout;