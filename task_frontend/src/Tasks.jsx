import Taskmodal from "./Taskmodel";
import Tasktable from "./Tasktable";
import { Box,Button } from "@mui/material";
import { useState } from "react";
export default function Tasks({data,setdata}){
   
    
    return (
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

        
        <Taskmodal task={data} set={setdata}/>
        <Tasktable task={data} set={setdata}/>
        </Box>
    );
}
