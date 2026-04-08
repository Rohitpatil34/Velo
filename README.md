🚴 VELO – Sports Venue Booking Platform

Velo is a full-stack sports venue booking web application that allows users to discover, view, and book sports venues easily. 
The platform provides real-time slot availability, secure authentication, and online payment integration, creating a smooth booking experience similar to platforms like Playo.

✨ Key Features

👤 User Authentication

- Secure signup and login

- JWT-based authentication

- Protected routes for authenticated users

 🏟 Venue Browsing
  
- Explore different sports venues
- View venue details such as:
  - Location
  
  - Sports available
  
  - Pricing
  
  - Available slots

    
📅 Slot Booking System

- Select preferred date and time slot
  
- Prevent double booking of the same slot
- Store booking details in the database

💳 Payment Integration

- Razorpay payment gateway
- Secure transaction handling
- Payment verification on the backend

📊 Booking Management
- View booking history
- Track booking status
- Manage reservations

🛠 Tech Stack
| Layer           | Technology                      |
| --------------- | ------------------------------- |
| Frontend        | React.js, HTML, CSS, JavaScript |
| Backend         | Node.js, Express.js             |
| Database        | MongoDB                         |
| Authentication  | JWT (JSON Web Token)            |
| Payment Gateway | Razorpay                        |


⚙️ Installation & Setup

1️⃣ Clone the Repository
```bash
git clone : https://github.com/your-username/velo.git

cd velo

```
2️⃣ Install Dependencies

Backend

```bash
cd server

npm install
