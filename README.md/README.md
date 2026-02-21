# 🛒 MERN E-Commerce Application

A full-stack E-Commerce web application built using the MERN stack (MongoDB, Express, React, Node.js) with Razorpay payment integration and WhatsApp order notifications.

---

## 🚀 Features

### 🧾 Product Catalog

* Display products with images, descriptions, and prices
* Product search functionality
* Add to cart

### 🛍️ Shopping Cart

* View cart items
* Increase / decrease quantity
* Remove items automatically when quantity reaches zero
* Dynamic total calculation

### 📦 Order Management

* Place orders after successful Razorpay payment
* Order confirmation page
* Order history
* Cancel order within 2 days
* Cancellation status display

### 💳 Payment Integration

* Razorpay payment gateway
* Payment success & cancellation handling
* Secure payment verification
* Payment transaction stored in database

### 📲 WhatsApp Notifications

* Order success message after payment
* Order cancellation message
* Click-to-Chat WhatsApp integration

### 🧠 Redux State Management

* Cart state management
* Quantity updates
* Global cart synchronization

---

## 🏗️ Tech Stack

**Frontend**

* React (Vite)
* Redux Toolkit
* React Router
* Bootstrap 5
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Razorpay SDK

---

### 2️⃣ Backend Setup

```
cd backend
npm install
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```
cd frontend
cd neuronest
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 💳 Payment Flow

1. User clicks **Checkout**
2. Razorpay payment popup opens
3. Payment verified in backend
4. Order marked as **paid**
5. WhatsApp confirmation link generated

---

## 📲 WhatsApp Integration

WhatsApp Click-to-Chat is triggered after:

* Payment success
* Order cancellation



## 👩‍💻 Author

Priyanka S
MERN Stack Developer

---