# Booking System Frontend

Frontend application for the test assignment: **Booking with PDF Export**.

This project provides a user interface for creating bookings and downloading a PDF confirmation document.

---

## Functional Requirements

- Booking form input interface  
- Submission of booking data to backend REST API  
- PDF confirmation download functionality  

---

## Technology Stack

- JavaScript (ES6)  
- React (Vite)  
- Axios (HTTP client)  

---

## Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/DonBigBon/booking-system-frontend.git
cd booking-system-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Application
```bash
npm run dev
```

#### Frontend will run at: http://localhost:5173

---

## Backend Integration

This frontend requires the backend service running separately.

#### Backend URL: http://127.0.0.1:8000
#### API Endpoints used:
- POST /api/bookings
- GET /api/bookings/{id}/pdf

---

## Usage

1. Open the frontend application in browser
2. Fill in booking details (name, email, date, time)
3. Click Book to create a booking
4. Download the generated PDF confirmation document

---

## Notes
- Backend must be started before using the frontend
- PDF generation is handled полностью на стороне Laravel backend
