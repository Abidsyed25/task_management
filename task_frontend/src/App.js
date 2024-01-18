import { Box } from '@mui/material';
import Layout from './Layout.';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';
import Navbar2 from './Navbar2';
import Signup from './Signup';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';
function App() {
  let [cookies, setcookies,remove] = useCookies();
  return (
    <>


      <Box sx={{ width: '95%', margin: 'auto' }}>
        {cookies && cookies.id ? <><Navbar rm={remove}/><Layout /></> :
          <>

            <Navbar2 />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Login cookies={cookies} setcookies={setcookies} />} />
            </Routes>
          </>
        }




      </Box>

    </>
  );
}

export default App;
