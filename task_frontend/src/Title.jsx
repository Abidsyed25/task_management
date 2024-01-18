import { Typography,Box } from "@mui/material";
import LogoDevIcon from '@mui/icons-material/LogoDev';
function Title() {
  return (
    
    <>
       <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
       <LogoDevIcon fontSize='large'/><Typography variant="h5" >Task System</Typography>

       </Box>
    </>
  );
}

export default Title;