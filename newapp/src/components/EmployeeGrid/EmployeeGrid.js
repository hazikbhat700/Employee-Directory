const EmployeeGrid =({ employeeId, employeeName, department, position }) => {
    return (
        //create a grid using html tags to show the above details, in different columns using html
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Employee Details</title>
        <style>
            .grid-container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr; /* Four equal columns */
                border: 1px solid #dddddd;
            }
            .grid-item {
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                padding: 8px;
            }
            .grid-item:last-child {
                border-right: none; /* Remove border for last column */
            }
        </style>
        </head>
        <body>
        
        <div class="grid-container">
            <div class="grid-item">Employee ID</div>
            <div class="grid-item">Employee Name</div>
            <div class="grid-item">Department</div>
            <div class="grid-item">Position</div>
            <div class="grid-item">1</div>
            <div class="grid-item">John Doe</div>
            <div class="grid-item">HR</div>
            <div class="grid-item">Manager</div>
            <div class="grid-item">2</div>
            <div class="grid-item">Jane Smith</div>
            <div class="grid-item">Marketing</div>
            <div class="grid-item">Assistant</div>
            <div class="grid-item">3</div>
            <div class="grid-item">Michael Johnson</div>
            <div class="grid-item">IT</div>
            <div class="grid-item">Developer</div>
            <!-- Add more grid items as needed -->
        </div>
        
        </body>
        </html>
    
    
    
        )
}