import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Import your custom CSS file for additional styling

function Employee() {
  // State variables
  const [employeeList, setEmployeeList] = useState([]); // State to store the list of employees
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]); // State to store the filtered list of employees
  const [name, setName] = useState(''); // State to store the name input value
  const [id, setId] = useState(''); // State to store the ID input value
  const [email, setEmail] = useState(''); // State to store the email input value
  const [editId, setEditId] = useState(null); // State to store the ID of the employee being edited

  // Fetch employees from API when component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to fetch employees from API
  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployeeList(data.data); // Set the employee list state with fetched data
      setFilteredEmployeeList(data.data); // Initialize filtered list with all employees
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Function to add a new employee to the list
  const handleAddEmployee = () => {
    // Create a new employee object with the provided values
    const newEmployee = {
      id: parseInt(id), // Convert id to a number
      first_name: capitalizeFirstLetter(name), // Assuming the first name is entered in the 'name' input
      email: email // Assuming the email is entered in the 'email' input
    };
  
    // Update the employee list state by adding the new employee
    setEmployeeList([...employeeList, newEmployee]);
    setFilteredEmployeeList([...employeeList, newEmployee]); // Add new employee to filtered list
    setEditId(null); // Reset edit ID state

    // Clear input fields
    setName('');
    setId('');
    setEmail('');
  };

  // Function to delete an employee from the list
  const handleDeleteEmployee = (employeeId) => {
    // Filter out the employee with the provided ID
    const updatedEmployeeList = employeeList.filter(employee => employee.id !== employeeId);
    const updatedFilteredEmployeeList = filteredEmployeeList.filter(employee => employee.id !== employeeId);
    
    // Update the state with the new list (excluding the deleted employee)
    setEmployeeList(updatedEmployeeList);
    setFilteredEmployeeList(updatedFilteredEmployeeList);
  };

  // Function to edit an employee
  const handleEditEmployee = (employeeId) => {
    setEditId(employeeId); // Set the edit ID state to the ID of the employee being edited

    // Find the employee with the given ID and populate the input fields with its details
    const employeeToEdit = employeeList.find(employee => employee.id === employeeId);
    if (employeeToEdit) {
      setName(employeeToEdit.first_name);
      setId(employeeToEdit.id);
      setEmail(employeeToEdit.email);
    }
  };

  // Function to save the edited employee details
  const handleSaveEdit = () => {
    // Update the employee details with the modified values
    const updatedEmployeeList = employeeList.map(employee => {
      if (employee.id === editId) {
        return {
          ...employee,
          first_name: capitalizeFirstLetter(name),
          email: email
        };
      }
      return employee;
    });

    // Update the state with the modified employee list and exit edit mode
    setEmployeeList(updatedEmployeeList);
    setFilteredEmployeeList(updatedEmployeeList); // Update filtered list with modified details
    setEditId(null);
   

    // Clear input fields
    setName('');
    setId('');
    setEmail('');
  };

  // Function to handle search by name or email
  const handleSearch = (searchTerm) => {
    const filteredEmployees = employeeList.filter(employee => {
      const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase()) || employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredEmployeeList(filteredEmployees);
  };
 
  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Render the component
  return (
    <div className="container">
      {/* Employee Directory title */}
      <h1 className="mt-5 mb-4 text-center">Employee Directory</h1>

      {/* Search input */}
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by name or email"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Employee table */}
      <div className="row mb-4">
        <div className="col">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render each employee row */}
              {filteredEmployeeList.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  {/* Editable fields for name and email */}
                  <td>{editId === employee.id ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : employee.first_name}</td>
                  <td>{editId === employee.id ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> : employee.email}</td>
                  <td>
                    {/* Render different actions based on edit mode */}
                    {editId === employee.id ? (
                      <Button variant="success" onClick={handleSaveEdit}>Save</Button>
                    ) : (
                      <div>
                        <Button variant="primary" onClick={() => handleEditEmployee(employee.id)}>Edit</Button>{' '}
                        <Button variant="danger" onClick={() => handleDeleteEmployee(employee.id)}>Delete</Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee form */}
      <div className="row">
        <div className="col">
          <h2 className="mb-3">Add Employee</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="number" id="id" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button variant="primary" onClick={handleAddEmployee}>Add Employee</Button>
        </div>
      </div>
    </div>
  );
}

// Render the Employee component inside the Router
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/Employee-Directory-Application" element={<Employee />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
