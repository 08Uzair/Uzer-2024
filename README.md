# 🛒 E-commerce Website
## Description:
This e-commerce website is built using the MERN stack (MongoDB, Express.js, React, and Node.js) along with Tailwind CSS for styling. It offers a seamless shopping experience with a focus on security, user-friendly interfaces, and efficient management.

## Features:

### 🔒 Secured Authentication:

Users can securely sign up, log in, and log out.
Passwords are encrypted using industry-standard practices to ensure user data protection.
Session management and token-based authentication to prevent unauthorized access.

### 🛍️ Cart Page:

Users can add products to their cart and manage quantities.
Real-time updates to the cart total based on the products selected.
Option to remove items from the cart.
Validation to ensure the quantity does not exceed the available stock or drop below one.

### 👤 Profile Page:

Users can view and update their personal information, including name, address, and contact details.
Option to change passwords and update profile pictures.
Order history section showing past purchases and their statuses.
📩 Message to the Admin Option:

Users can send messages or inquiries directly to the admin from their profile page.
Admin can view and respond to user messages through the admin panel.
Notification system to alert users when their messages are replied to.

### 🛒 All Products:

Comprehensive product listing with sorting and filtering options.
Search functionality to quickly find specific products.
Detailed product pages with descriptions, reviews, and related products.
🖼️ Product Image Gallery at Home Page:

# 🛠️ Admin Page:

### 📊 Dashboard :  Overview of key metrics such as total sales, number of users, and order statuses.
### 📦 Product Management :  Add, edit, and delete products, manage product categories, and update stock levels.
### 👥 User Management :  View, edit, and manage user profiles, including resetting passwords and assigning roles.
### 📈 Order Management :  Track and manage customer orders, update order statuses, and view order details.
### 📨 Message Management :  Read and respond to messages from users, ensuring timely communication.
### 👤 Admin Profile :  View and update admin profile information, including name, contact details, and password.

Attractive image gallery showcasing featured products on the homepage.
Hover effects and animations for a dynamic browsing experience.
Quick view options to see product details without leaving the homepage.
📸 Category Selection through Clicking the Photos of Image Gallery:

Users can select product categories by clicking on category images in the gallery.
Smooth transitions and intuitive navigation to category-specific pages.
Each category page displays relevant products with sorting and filtering options.

# 🌐 Live Demo:
Link to Live Demo

# 🎥 Demo Video:
Link to Demo Video


# REST API's ENDOINTS

🌐 BASE_URL = http://localhost:8000/api/v1/

 ## Users
➡️ GET : `/users`

🚮 DELETE : `/users/:userId`

⬆️ POST : `/users/signIn`

⬆️ POST : `/users/signUp`

## Products
➡️ GET :`/products`

⬆️ POST :`/products`

🔃 PUT : `/products/:id`

🚮 DELETE : `/products/:id`

