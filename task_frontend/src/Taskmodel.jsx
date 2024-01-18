import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Taskmodel({task,set}) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [status, setStatus] = React.useState('');
  const [cookies, setCookie] = useCookies(['id']);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async() => {
    const formattedStartDate = startDate?.format('YYYY-MM-DD'); // Adjust the format as needed
  const formattedEndDate = endDate?.format('YYYY-MM-DD'); // Adjust the format as needed
  console.log(cookies.id);
  // Log the formatted date strings
  console.log('Formatted Start Date:', formattedStartDate);
  console.log('Formatted End Date:', formattedEndDate);

    // Here you can use title, description, startDate, endDate, and status
    console.log('Title:', title);
    console.log('Description:', description);
    
    console.log('Status:', status);

    // Add your logic to handle the data, such as sending it to an API, etc.

    // Close the dialog
    if(title!=''){
      const data = { token:cookies.id,
        task:{
        title: title,
        description: description,
        dateStart: formattedStartDate,
        dateEnd: formattedEndDate,
        status: status, }};
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify that you're sending JSON
  },
  body: JSON.stringify(data), // Convert the object to a JSON string
};
      try{
        let api = await fetch('https://ol-naom.onrender.com/add',options);
        let tokenn = await api.json();
        console.log(tokenn);
        if(!tokenn.email){
            
        }
        else{
            
        }
       }catch(e){
        console.log(e);
       }
    set([
      ...task,
      {
        id: task.length + 1,
        title: title,
        description: description,
        dateStart: formattedStartDate,
        dateEnd: formattedEndDate,
        status: status,
      },
    ]);
  }
    setOpen(false);
    setTitle('');
    setDescription('');
    setStatus('');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{margin:'20px',marginTop:'50px'}}>
        Add New Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Title</DialogContentText>
          <TextField
            id="outlined-basic"
            required="true"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogContentText>Description</DialogContentText>
          <TextField
            id="outlined-basic"
            required="true"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DialogContentText>Start Date</DialogContentText>
              <DatePicker
                label="Start Date"
                required='true'
                slotProps={{ textField: { size: 'small' } }}
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DialogContentText>End Date</DialogContentText>
              <DatePicker
                label="End Date"
                required="true"
                slotProps={{ textField: { size: 'small' } }}
                value={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <DialogContentText>Status</DialogContentText>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={'In Progress'}>In Progress</MenuItem>
            <MenuItem value={'Pending'}>Pending</MenuItem>
            <MenuItem value={'Completed'}>Completed</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
