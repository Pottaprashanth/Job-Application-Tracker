# Job Application Tracker

A Full-Stack Web Application developed to manage and track job applications efficiently. Users can add, view, update, delete, search, and filter their job application records through a user-friendly interface.

## Technologies Used

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Maven

**Database**
- MySQL

**Tools**
- Eclipse IDE
- Visual Studio Code
- Postman
- Git and GitHub

## Features

- Add new job application details.
- View all job applications.
- Update existing application information.
- Delete job application records.
- Search applications by applicant name, company, job role, and location.
- Filter applications based on application status.
- View dashboard statistics.
- Manage application details through a React frontend.
- Store application information in a MySQL database.

## Project Structure

```text
Job-Application-Tracker/
│
├── JobApplicationManagement/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/prashanth/
│   │   │   │       └── JobApplicationManagement/
│   │   │   │           ├── controller/
│   │   │   │           ├── model/
│   │   │   │           ├── repository/
│   │   │   │           └── service/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── job-application-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Backend Setup

1. Clone the repository.

```bash
git clone https://github.com/Pottaprashanth/Job-Application-Tracker.git
```

2. Open the backend folder in Eclipse or your preferred Java IDE.

3. Create a MySQL database.

```sql
CREATE DATABASE jobapplication;
```

4. Configure your database credentials in `application.properties`. Use your own local credentials and do not publish passwords.

```properties
spring.application.name=JobApplicationManagement
server.port=8822

spring.datasource.url=jdbc:mysql://localhost:3306/jobapplication
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

5. Run the Spring Boot application.

Backend URL:

```text
http://localhost:8822
```

## Frontend Setup

1. Open the frontend folder in VS Code.

2. Install dependencies.

```bash
npm install
```

3. Start the React development server.

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## REST API Endpoints

Base URL: `/api/applications`

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/add` | Add an application |
| GET | `/getall` | Get all applications |
| GET | `/getbyid/{id}` | Get application by ID |
| PUT | `/update/{id}` | Update an application |
| DELETE | `/delete/{id}` | Delete an application |
| GET | `/status/{status}` | Filter by status |
| GET | `/company?name={name}` | Search by company |
| GET | `/jobrole?role={role}` | Search by job role |
| GET | `/date-range?startDate={date}&endDate={date}` | Filter by date range |

## Application Status

- APPLIED
- SHORTLISTED
- INTERVIEW
- REJECTED

## Learning Outcomes

- Understanding full-stack application development.
- Building RESTful APIs using Spring Boot.
- Implementing CRUD operations.
- Integrating React with Spring Boot.
- Connecting Java applications with MySQL.
- Working with Spring Data JPA and Hibernate.
- Managing project versions using Git and GitHub.

## Author

**Prashanth Potta**

GitHub: [Pottaprashanth](https://github.com/Pottaprashanth)

---

If you find this project useful, feel free to explore the repository.
