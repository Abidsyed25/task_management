import { Box, Paper } from "@mui/material";

export default function Home(){
    return (
        <>
        <Box sx={{display:'flex',height:'50vh',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>

            <Paper elevation={3} sx={{margin:3,height:'50px',display:'flex',padding:'20px',justifyContent:'center',alignItems:'center'}}>
        
                Total Number of Tasks - 1
        
                </Paper>
                <Paper elevation={3} sx={{margin:3,height:'50px',display:'flex',padding:'20px',justifyContent:'center',alignItems:'center'}}>
                                        Number of Tasks pending - 0
                        </Paper>
                        <Paper elevation={3} sx={{margin:3,height:'50px',display:'flex',padding:'20px',justifyContent:'center',alignItems:'center'}}>
                                        Number of Tasks Completed - 1
                        </Paper>
        </Box>
        </>
    );
}