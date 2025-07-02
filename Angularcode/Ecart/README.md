![Screenshot 2025-06-28 222457](https://github.com/user-attachments/assets/e4bc6575-cbdb-410d-9f72-0bba95445227)# 🛒 Full-Stack E-Commerce Platform

This is a full-featured e-commerce platform built with **Angular 15** (frontend) and **Spring Boot 3** (backend). It supports secure user authentication, product management, dynamic cart functionality, order processing, image upload support, and feedback management.

---

## 🚀 Features

### 👥 Authentication & Roles
- 🔐 JWT-based login and registration
- Separate roles for **admin** and **customer**

### 🛍 Customer Features
- View searchable product catalog
- Add to cart, remove from cart
- Place orders with delivery tracking
- Submit feedback for products
- View past order history

### ⚙️ Admin Features
- Add / edit / delete products
- Toggle product status (active/inactive)
- View and manage customer feedback
- Monitor orders

### 📸 Image Management
- Product images uploaded via Angular
- Stored in the file system
- Served through REST API

### 🧾 Order & Delivery Logic
- Orders tied to user accounts
- Order statuses integrated with delivery system
- Historical tracking of all orders and their feedback

---

## 🖼 Screenshots

Below are screenshots of the homepage and features:

> 📸 *Add your screenshots in the repository under `screenshots/` folder and embed them here.*

| Home Page | Product Listing | Cart Page |
|-----------|-----------------|-----------|

![Screenshot 2025-06-28 222457](https://github![Screenshot 2025-06-28 222625](https://github.com/user-attachments/assets/75c17a99-06fc-468d-a5bf-14ace270b9c8)
.com/user-attachments/assets/4c5ca834-98a4-487c-a86a-0664523703![Screenshot 2025-06-28 222645](https://github.com/user-attachments/assets/c65c692b-ab57-48a3-8a1d-3570ca100668)
a3)
![Screenshot 2025-06-28 222514](https://github.com/user-attachments/assets/df524467-778d-4d9a-81e9-2d4986d7e024)![Screenshot 2025-06-28 222601](https://github.com/user-attachments/assets/fd3299e2-fd1d-48f3-8b61-4d97bfb3d8d5)
![Screenshot 2025-06-28 222539](https://github.com/user-attachments/assets/66f7b5a5-d836-4401-8d5e-cd15483ee768)

| ![Home](screenshots/homepage.png) | ![Products](screenshots/products.png) | ![Cart](screenshots/cart.png) |

---

## 🛠️ Tech Stack

**Frontend**  
- Angular 15  
- Bootstrap  

**Backend**  
- Spring Boot 3  
- ModelMapper  
- H2 Database (for dev/testing)

---

## 📦 Installation & Setup

### 🔧 Backend (Spring Boot)
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/ecommerce-platform.git
   cd ecommerce-platform/backend
