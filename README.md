# School Management System Documentation

## 1. Project Overview

The School Management System is a comprehensive solution designed to address challenges in the educational management sector. It aims to streamline various administrative tasks, including student admissions, teacher registration, transaction management, attendance tracking, result management, and class routine creation. The system is intended to provide a centralized platform for managing all aspects of school administration.

## 2. Project Team

The project team consists of:

- **Najmus Sakib Rashid:** Responsible for designing the database, front-end, and back-end development.
- **Jamil Ahmed:** Responsible for UI design.

## 3. Project Planning

The project planning involves several key milestones:

- **Week 1:** Project scope fixation
- **Week 2:** Connecting to the database
- **Week 3:** Providing Entity Relationship Diagram (ERD)
- **Week 4:** Describing the relational scheme
- **Week 5:** Full-stack development milestone 1
- **Week 6:** Full-stack development milestone 2

## 4. Technical Details

### 4.1 Database (MySQL)

The database consists of several tables:

- `student`: Stores information about students.
- `teacher`: Contains details about teachers.
- `attendance`: Records student attendance.
- `parents`: Manages information about parents.
- ... (and other tables as described in the provided schema)

### 4.2 Backend (Node.js)

The backend is developed using Node.js, and it includes APIs for various functionalities:

- **Student API:**
  ```javascript
  app.get('/StudentAdmission', function (req, res) {
      params = url.parse(req.url, true).query;
      if (params.role != 'admin')
          res.send('unauthorized');
      else
          res.sendFile(__dirname + '/' + 'StudentAdmitForm.html');
  })
  ```

- **Attendance API:**
  ```javascript
  app.get('/Attendance', function (req, res) {
    params = url.parse(req.url, true).query;
    if (params.role != 'teacher') 
        return res.send('unauthorized');
    var sql = 'select * from section where class_teacher=' + params.id;
    connection.query(sql, function (err, result) {
        if (result.length)
            res.sendFile(__dirname + '/' + 'Attendance.html');
        else
            res.send('you are not a class teacher');
    })
  })
  ```

### 4.3 Frontend (HTML, CSS, JS)

The frontend is designed using HTML, CSS, and JavaScript to ensure a user-friendly interface.

## 5. Installation

### Step 1: 
Clone the directory to your local machine
### Step 2:
Create a new database in mysql and run the sql scripts in School Management System Database directory to populate the database
### Step 2.1:
Create a .env file enter password and name of the database in the following format
  ```ini
  DATABASE_PASSWORD=database password here
  DATABASE=database name here
  ```
### Step 3:
Run the following bash 
  ```bash
  npm i
  node app.js
  ```
### Step 4:
Open the localhost port in the browser showed in the command prompt

## 6. System Architecture

The system follows a three-tier architecture:

- **Frontend:** HTML, CSS, JS for the user interface.
- **Backend:** Node.js for server-side logic and API endpoints.
- **Database:** MySQL for data storage.

This architecture ensures modularity and scalability.
