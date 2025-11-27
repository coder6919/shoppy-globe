# ShoppyGlobe Backend API

GitHub Link: [https://github.com/coder6919/shoppy-globe/tree/master/shoppy-globe-api]

This is the Node.js & Express backend for the ShoppyGlobe E-commerce application. It handles user authentication, product management, and shopping cart operations using MongoDB.

## 🚀 Features
- **Authentication:** JWT-based User Registration & Login.
- **Products:** Fetch product lists and details (Public access).
- **Cart:** Protected routes to Add, Update, and Remove items (Logged-in users only).
- **Database:** MongoDB Atlas integration.

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)

## ⚙️ Installation & Setup

1. **Clone the repository**
2. **Install Dependencies:**
   npm install

**Environment Variables:** Create a .env file in the root directory with the following:
    PORT=8000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secret_key

**Start the Server:** npm start

**API Endpoints**

**Authentication**
POST /api/register - Register a new user

POST /api/login - Login and receive JWT Token

**Products**
GET /api/products - Get all products

GET /api/products/:id - Get single product details

Cart (Protected - Requires Bearer Token)
POST /api/cart - Add item to cart

PUT /api/cart/:id - Update item quantity (use Product ID)

DELETE /api/cart/:id - Remove item from cart (use Product ID)

### ✅ Phase 2: Evidence Gathering (Screenshots)
Screenshots for **MongoDB Integration** and **Testing**.

MongoDB Atlas Cart, here we can see the product added in our cart for the logged in user
[MongoDB Atlas Cart](screenshots/atlascart.png)

MongoDB Atlas Products, here we can see the products that are in our database
[MongoDB Atlas Products](screenshots/atlasprod.png)

MongoDB Atlas User, here we can see the user loggend in
[MongoDB Atlas User](screenshots/atlasuser.png)

### API Testing Evidence

**1. User Registration (201 Created)**
[Register Test](screenshots/registerapitest.png)

**2. Login Success (Token Received)**
[Login Test](screenshots/loginapitest.png)

**3. Get All Products (200 OK)**
[Get Products Test](screenshots/prodtestapi.png)

**4. Add to Cart (201 Created)**
[Add to Cart Test](screenshots/cartapi.png)

**5. Update Cart Quantity (200 OK)**
[Update Cart Test](screenshots/putapi.png)

**6. Delete from Cart (200 OK)**
[Delete Cart Test](screenshots/delapi.png)

**Get Product With ID (200 OK)**
[Get Product with Id](screenshots/idprodapitest.png)