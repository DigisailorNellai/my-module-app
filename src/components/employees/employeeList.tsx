import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Avatar, IconButton, Card, CardContent, Typography, Box, TextField
} from '@mui/material';




interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  role: string;
  initials?: string;
}



const EmployeeList: React.FC = () => {


  const handleAddEmployee = (employeeData: any) => {
    // Implement logic to add new employee
    console.log('New employee data:', employeeData);
  };


  const employees: Employee[] = [
    { id: 'LA-0215', name: 'Marshall Nichols', email: 'marshall-n@gmail.com', phone: '+ 264-625-1526', joinDate: '12 Jun, 2015', role: 'Web Designer', initials: 'MN' },
    { id: 'LA-0216', name: 'Debra Stewart', email: 'marshall-n@gmail.com', phone: '+ 264-625-4613', joinDate: '28 July, 2015', role: 'Web Developer' },
    { id: 'LA-0215', name: 'Jane Hunt', email: 'jane-hunt@gmail.com', phone: '+ 264-625-4512', joinDate: '13 Jun, 2015', role: 'Web Designer', initials: 'JH' },
    { id: 'LA-0116', name: 'Susie Willis', email: 'sussie-w@gmail.com', phone: '+ 264-625-4152', joinDate: '9 May, 2016', role: 'Web Developer' },
    { id: 'LA-0215', name: 'Darryl Day', email: 'darryl.day@gmail.com', phone: '+ 264-625-8596', joinDate: '24 Jun, 2015', role: 'Web Developer', initials: 'DD' },
    { id: 'LA-0215', name: 'Marshall Nichols', email: 'marshall-n@gmail.com', phone: '+ 264-625-7845', joinDate: '11 Jun, 2015', role: 'Web Designer', initials: 'MN' },
    { id: 'LA-0216', name: 'Debra Stewart', email: 'marshall-n@gmail.com', phone: '+ 264-625-2583', joinDate: '28 Jun, 2018', role: 'Web Developer' },
    { id: 'LA-0215', name: 'Marshall Nichols', email: 'marshall-n@gmail.com', phone: '+ 264-625-2583', joinDate: '24 Feb, 2019', role: 'Android Developer', initials: 'MN' },
    { id: 'LA-0216', name: 'Debra Stewart', email: 'marshall-n@gmail.com', phone: '+ 264-625-2589', joinDate: '28 Jun, 2015', role: 'IOS Developer' },
  ];

  return (
    <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: '10px' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="div" sx={{ color: '#444', fontWeight: 'bold' }}>
            EMPLOYEE LIST
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search something..."
            
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
          />

        </Box>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ borderBottom: '1px solid #e0e0e0' }}>
                <TableCell padding="checkbox"></TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 'bold' }}>#</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 'bold' }}>NAME</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 'bold' }}>EMPLOYEE ID</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 'bold' }}>PHONE</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 'bold' }}>JOIN DATE</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 'bold' }}>ROLE</TableCell>
                <TableCell sx={{ color: '#666', fontWeight: 'bold' }}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(even)': { bgcolor: '#f8fafc' } }}>
                  <TableCell padding="checkbox">
                    <input type="checkbox" style={{ marginRight: '8px' }} />
                  </TableCell>
                  <TableCell>
                    {employee.initials ? (
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: '#e0e7ff', color: '#3b82f6' }}>
                        {employee.initials}
                      </Avatar>
                    ) : (
                      <Avatar src={`/path-to-avatar-image-${index + 1}.jpg`} sx={{ width: 32, height: 32 }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>{employee.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>{employee.email}</Typography>
                  </TableCell>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      {/* <VisibilityIcon fontSize="small" sx={{ color: '#9e9e9e' }} /> */}
                    </IconButton>
                    <IconButton size="small">
                      {/* <EditIcon fontSize="small" sx={{ color: '#9e9e9e' }} /> */}
                    </IconButton>
                    <IconButton size="small">
                      {/* <DeleteIcon fontSize="small" sx={{ color: '#9e9e9e' }} /> */}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

    </Card>
  );
};

export default EmployeeList;