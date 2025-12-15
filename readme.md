# DevCamper API

> A comprehensive RESTful API for a bootcamp directory platform, built with Node.js, Express, and MongoDB.

DevCamper is a fully-featured backend management system that allows users to publish bootcamps, courses, and reviews. It demonstrates advanced backend concepts including geospatial searching, role-based access control (RBAC), and automated data calculations.

## 🚀 Key Features

- **Advanced Authentication & Security**

  - JWT-based authentication with Access and Refresh tokens (HttpOnly cookies).
  - Role-Based Access Control (RBAC): `User`, `Publisher`, `Admin`.
  - Third-party login via **Google OAuth 2.0**.
  - Password reset flow via email tokens.
  - Secure password hashing using Argon2.

- **Bootcamps & Locations**

  - **Geospatial Search**: Find bootcamps within a specific radius (km/miles) of a zipcode.
  - **File Upload**: Upload and manage bootcamp profile photos.
  - **Filtering**: Advanced filtering, sorting, and pagination for API resources.

- **Intelligent Data Handling**

  - **Virtuals**: Reverse population to show courses inside bootcamps.
  - **Aggregations**: Automatically calculate `Average Cost` of courses and `Average Rating` of bootcamps whenever data changes.

- **Dashboard & UI**
  - Server-side rendered views using **EJS**.
  - Dynamic dashboards for Publishers and Admins to manage content.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: Passport.js, JWT, Argon2
- **Templating**: EJS
- **Utilities**: Geocoder, express-fileupload (File Upload)

## 📚 Learning Outcomes

Building this project provided deep hands-on experience with:

- **Architecture**: Structuring a scalable REST API using Controllers, Routes, and Middleware.
- **Database Design**: Implementing complex Mongoose schemas with pre/post hooks, virtuals, and static methods for aggregation.
- **Security Best Practices**: Implementing secure cookie policies (`sameSite`, `httpOnly`), preventing NoSQL injection, and managing secrets.
- **API Design**: Creating a flexible query handler for filtering, selecting, and sorting data.

## 📝 Usage

### Install Dependencies

```bash
npm install
```

### Run Server (Dev Mode)

```bash
npm run dev
```

### Seeding Data

Import or destroy sample data using the seeder script:

```bash
node seeder -i  # Import
node seeder -d  # Destroy
```

---

_This project is a demonstration of advanced backend development skills._
