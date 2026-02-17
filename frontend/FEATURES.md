# InvestaAdvisory - Banking Advisory Management System

## Features Implemented

### 🔐 Authentication
- User Login & Registration
- JWT-based authentication
- Role-based access control (Admin, Advisor, Investor)

### 👨‍💼 Admin Features
- **Dashboard**: View statistics (total users, requests, companies)
- **User Management**: View all users with role filtering
- **Request Management**: View all advisory requests and assign advisors
- **Sector Management**: Create, update, delete sectors
- **Company Management**: Create, update, delete companies with sector mapping

### 💼 Investor Features
- **Dashboard**: Quick access to all features
- **Create Advisory Request**: Submit investment advisory requests with:
  - Investment amount
  - Risk preference (Low/Moderate/High)
  - Sector preference
  - Description
- **My Requests**: View all submitted requests and their status
- **Recommendations**: View advisor recommendations for each request
- **Meetings**: View and manage scheduled meetings (Confirm/Cancel)

### 🎯 Advisor Features
- **Dashboard**: Quick access to assigned work
- **Assigned Requests**: View all requests assigned by admin
- **Create Recommendations**: Provide investment recommendations with:
  - Company selection
  - Expected returns
  - Detailed notes
- **Schedule Meetings**: Schedule meetings with investors
- **My Meetings**: View and manage meetings (Mark as complete)

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast (notifications)
- Lucide React (icons)

### Backend
- Spring Boot
- Spring Security with JWT
- JPA/Hibernate
- MySQL Database

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- Java 17+
- MySQL

### Backend Setup
1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Configure database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/advisory_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to frontend folder:
   ```bash
   cd AdvisoryBank-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open browser at `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/users` - Get all users (Admin only)

### Advisory Requests
- POST `/api/advisory-requests` - Create request (Investor)
- GET `/api/advisory-requests/my` - Get investor's requests
- GET `/api/advisory-requests/assigned` - Get advisor's assigned requests
- GET `/api/advisory-requests` - Get all requests (Admin)
- POST `/api/advisory-requests/{id}/assign/{advisorId}` - Assign advisor (Admin)

### Recommendations
- POST `/recommendations` - Create recommendation (Advisor)
- GET `/recommendations/request/{requestId}` - Get recommendations by request

### Meetings
- POST `/api/meetings/request/{requestId}` - Schedule meeting (Advisor)
- GET `/api/meetings/advisor/{advisorId}` - Get advisor's meetings
- GET `/api/meetings/investor/{investorId}` - Get investor's meetings
- PUT `/api/meetings/{meetingId}/status` - Update meeting status

### Sectors
- GET `/api/sectors` - Get all sectors
- POST `/api/sectors` - Create sector (Admin)
- PUT `/api/sectors/{id}` - Update sector (Admin)
- DELETE `/api/sectors/{id}` - Delete sector (Admin)

### Companies
- GET `/api/companies` - Get all companies
- POST `/api/companies` - Create company (Admin)
- PUT `/api/companies/{id}` - Update company (Admin)
- DELETE `/api/companies/{id}` - Delete company (Admin)

## User Roles & Permissions

### ADMIN
- Manage all users
- Manage sectors and companies
- View all advisory requests
- Assign advisors to requests

### ADVISOR
- View assigned requests
- Create recommendations
- Schedule meetings with investors
- Mark meetings as complete

### INVESTOR
- Create advisory requests
- View own requests and status
- View recommendations from advisors
- Confirm/Cancel meetings

## Default Credentials (After Seeding)
- Admin: admin@example.com / password
- Advisor: advisor@example.com / password
- Investor: investor@example.com / password

## Project Structure
```
InvestaAdvisory/
├── AdvisoryBank-main/          # Frontend React App
│   ├── src/
│   │   ├── api/                # API integration
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   │   ├── admin/          # Admin pages
│   │   │   ├── advisor/        # Advisor pages
│   │   │   └── investor/       # Investor pages
│   │   └── routes/             # Protected routes
│   └── package.json
└── backend/                    # Spring Boot Backend
    └── src/main/java/com/project/backend/
        ├── controller/         # REST Controllers
        ├── entity/             # JPA Entities
        ├── repository/         # Data repositories
        ├── service/            # Business logic
        └── security/           # JWT & Security config
```

## Features Completed ✅
- [x] User authentication & authorization
- [x] Admin dashboard with statistics
- [x] User management with role filtering
- [x] Sector CRUD operations
- [x] Company CRUD operations
- [x] Advisory request creation (Investor)
- [x] Request assignment to advisors (Admin)
- [x] Recommendation creation (Advisor)
- [x] Meeting scheduling (Advisor)
- [x] Meeting management (Investor & Advisor)
- [x] Responsive UI with Tailwind CSS
- [x] Toast notifications
- [x] Protected routes by role

## Notes
- Make sure backend is running on port 8081
- Frontend runs on port 5173 (Vite default)
- All API calls include JWT token in Authorization header
- User data is stored in localStorage after login
