# Nexus Express - Delivery Management System

## Project Overview
Nexus Express is a delivery management platform connecting customers, riders, and administrators with features like real-time tracking, Stripe payments, multi-role authentication, and analytics dashboards.

# Live link for client : https://nexus-express-client.web.app/
# Server Link : https://github.com/MOBASSHIR07/Nexus_Express_Server



**Key Highlights**
- Real-time parcel tracking
- Stripe payment integration
- Interactive coverage map (Leaflet)
- Multi-role authentication (User, Rider, Admin)
- Analytics dashboards
- Modern UI with Tailwind CSS & DaisyUI

---

## Features

### For Customers
- Book parcel deliveries with automatic tracking
- Multiple parcel types (documents/parcels)
- Dynamic fare calculation
- Online payment via Stripe
- View payment history
- Real-time parcel tracking
- Coverage area checking

### For Riders
#### Gmail: rider2@gmail.com
#### Password : 123456
- View assigned deliveries
- Accept/reject delivery requests
- Update delivery status
- Track earnings & cash-out
- Performance dashboard


### For Admins
#### Gmail: pasha@gmail.com
#### Password : 123456
- Approve/reject rider applications
- Assign riders to parcels
- View analytics and system statistics
- Manage users and roles
- Track regional performance


---

## Tech Stack

**Frontend**
- React 18, React Router DOM
- Tailwind CSS, DaisyUI, Framer Motion

**State Management**
- TanStack Query, Axios

**Maps & Location**
- Leaflet, React Leaflet

**Forms**
- React Hook Form

**Payment**
- Stripe, @stripe/react-stripe-js

**Notifications**
- React Toastify, SweetAlert2

**Authentication**
- Firebase Authentication, Google OAuth

**Charts & Animations**
- Recharts, AOS

---

## Authentication & Roles
- Firebase Authentication (Email/Password + Google OAuth)
- **Roles & Permissions**
  - **User:** Book parcels, view own parcels, payments, track parcels
  - **Rider:** Manage assigned deliveries, update status, request cashout
  - **Admin:** Approve/reject riders, assign parcels, manage users, view analytics

---

## API Endpoints

### Parcels
- `POST /nexus/api/parcels` - Create new parcel (auto-tracking, initial status: Processing)
- `DELETE /parcels/{id}` - Delete parcel
- `GET /parcel/{id}` - Parcel details
- `PUT /parcels/assign/{id}` - Assign rider to parcel
- `PUT /parcels/update-status/{id}` - Update delivery status
- `GET /parcels/tracking/{id}` - Get tracking steps
- `GET /parcels/pending?rider_email={email}` - Pending deliveries for rider
- `GET /parcels/completed?rider_email={email}` - Completed deliveries for rider
- `GET /parcels?email={email}` - User-specific parcels

### Riders
- `POST /nexus/api/riders` - Submit rider application
- `PATCH /nexus/api/riders/{id}` - Approve/Reject rider
- `GET /nexus/api/riders/pending` - Pending rider applications
- `GET /nexus/api/riders/active` - Active riders
- `GET /riders?district={district}` - Riders by district
- `PUT /riders/update-status` - Update rider availability
- `GET /riders/pending-payments?rider_email={email}` - Pending cashouts
- `PUT /riders/cashout` - Process cashout
- `GET /rider/stats/{email}` - Rider dashboard statistics
- `GET /riders/earnings-analysis?rider_email={email}` - Rider earnings analysis

### Users
- `POST /nexus/users` - Create user
- `GET /nexus/api/users/role?email={email}` - Get user role
- `GET /nexus/api/users/search?email={email}` - Search users by email
- `PATCH /nexus/api/users/{id}/role` - Update role

### Payments
- `POST /create-payment-intent` - Stripe payment intent
- `POST /payments` - Save payment record
- `GET /paymentHistory?email={email}` - User payment history

### Analytics
- `GET /admin/stats` - Admin dashboard statistics

---

## Core Features

### Parcel Booking & Fare Calculation
- Dynamic fare based on type & weight  
- Tracking number generated as `TRK-XXXXXX`  

### Real-Time Tracking Steps
| Step | Status |
|------|--------|
| Order Placed | Processing |
| Payment Completed | Processing |
| Rider Assigned | Rider-assign |
| In Transit | In-Transit |
| Delivered | Delivered |

### Coverage Map
- Interactive Leaflet map
- District search & custom markers
- Fly-to animation on selection

### Rider Application System
- Users can apply to be riders
- Admin reviews applications and approves/rejects
- Status and role updated automatically

### Payment Integration
- Stripe for secure online payments
- Payment history tracking
- Parcel status updated automatically on payment success

---

## Project Structure (Important Parts)

# Project Structure :
```
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
    ├── service-centers.json
    └── vite.svg
├── src
    ├── App.css
    ├── App.jsx
    ├── Context
    │   └── AuthContext
    │   │   ├── AuthContext.jsx
    │   │   └── AuthProvider.jsx
    ├── Firebase
    │   └── Firebase_inIt.js
    ├── Hooks
    │   ├── useAuth.jsx
    │   ├── useAxiosInstance.jsx
    │   └── useRole.jsx
    ├── Layout
    │   ├── AuthLayout.jsx
    │   ├── DashBoardLayout.jsx
    │   └── MainLayout.jsx
    ├── Pages
    │   ├── Authentication
    │   │   ├── LogIn
    │   │   │   └── Login.jsx
    │   │   ├── Register
    │   │   │   └── Register.jsx
    │   │   └── SocialLogin
    │   │   │   └── GoogleLogin.jsx
    │   ├── BeARider
    │   │   └── BeARider.jsx
    │   ├── Coverage
    │   │   └── Coverage.jsx
    │   ├── DashBoard
    │   │   ├── AdminHome.jsx
    │   │   ├── DashBoardPage.jsx
    │   │   └── RiderHome.jsx
    │   ├── Forbidden
    │   │   └── Forbidden.jsx
    │   ├── HomePage.jsx
    │   ├── SendParcel
    │   │   └── SendParcel.jsx
    │   └── Shared
    │   │   ├── Footer.jsx
    │   │   └── Navbar.jsx
    ├── Routes
    │   ├── AdminRoute.jsx
    │   ├── PrivateRoute.jsx
    │   ├── RiderRoute.jsx
    │   └── Router.jsx
    ├── Utils
    │   └── DeliveryLoader.jsx
    ├── assets
    │   └── assets
    │   │   ├── banner
    │   │       ├── agent-pending.png
    │   │       ├── authImage.png
    │   │       ├── banner1.png
    │   │       ├── banner2.png
    │   │       ├── banner3.png
    │   │       ├── be-a-merchant-bg.png
    │   │       ├── bookingIcon.png
    │   │       ├── location-merchant.png
    │   │       └── logo.png
    │   │   ├── big-deliveryman.png
    │   │   ├── brand.png
    │   │   ├── brands
    │   │       ├── amazon.png
    │   │       ├── amazon_vector.png
    │   │       ├── casio.png
    │   │       ├── moonstar.png
    │   │       ├── randstad.png
    │   │       ├── start-people 1.png
    │   │       └── start.png
    │   │   ├── customer-top.png
    │   │   ├── delivery-van.png
    │   │   ├── download.png
    │   │   ├── icons8-running.gif
    │   │   ├── image-upload-icon.png
    │   │   ├── json
    │   │       ├── construct.json
    │   │       ├── forbidden.json
    │   │       ├── loading.json
    │   │       ├── login.json
    │   │       ├── register.json
    │   │       └── rider.json
    │   │   ├── live-tracking.png
    │   │   ├── react.svg
    │   │   ├── reviewQuote.png
    │   │   ├── safe-delivery.png
    │   │   ├── service.png
    │   │   ├── tiny-deliveryman.png
    │   │   └── warehouses.json
    ├── components
    │   ├── DashBoard
    │   │   ├── ActiveRider.jsx
    │   │   ├── AssignRider.jsx
    │   │   ├── CompletedDelivery.jsx
    │   │   ├── MakeAdmin.jsx
    │   │   ├── MyEarnings.jsx
    │   │   ├── MyParcels.jsx
    │   │   ├── ParcelCard.jsx
    │   │   ├── Payment.jsx
    │   │   ├── PaymentForm.jsx
    │   │   ├── PaymentHistory.jsx
    │   │   ├── PendingDelivery.jsx
    │   │   ├── SeePendingRiders.jsx
    │   │   └── TraceParcel.jsx
    │   └── Home
    │   │   ├── Banner.jsx
    │   │   ├── Benefit.jsx
    │   │   ├── HowItWorksSection.jsx
    │   │   ├── Marchent.jsx
    │   │   ├── Partners.jsx
    │   │   └── Services.jsx
    ├── data
    │   ├── division.json
    │   ├── reviews.json
    │   ├── services.json
    │   └── warehouses.json
    ├── index.css
    └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

