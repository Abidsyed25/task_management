import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Modifymodel from './Modifymodel';
import { useState } from 'react';
const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Task', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'dateStart', label: 'Date Started', minWidth: 120 },
  { id: 'dateEnd', label: 'Deadline', minWidth: 120 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 },
];




export default function Tasktable({task,set}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [id,setid] = useState(0);
  console.log(task);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleActionClick = (taskId) => {
    // Implement your action logic here, e.g., navigate to a specific task, open a modal, etc.
    console.log(`Clicked on action for Task ID: ${taskId}`);
    const updatedTask = task.filter((item) => item.id !== taskId);
    const sortedTask = updatedTask.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    set(sortedTask);
  
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    task && 
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.id === 'action' ? 'center' : 'left'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {task
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.id === 'action' ? 'center' : 'left'}>
                          {column.id === 'action' ? (
                            <>
                            
                          <Modifymodel task={task} set={set} id={row.id-1}/>
                          <Button size="small" onClick={() => handleActionClick(row.id)} variant="outlined" color="error">
                            Delete
                          </Button>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
