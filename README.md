# CampusCart: Smart Vendor Dashboard

CampusCart is a full-stack MERN application built as a mini-project for a Web Technologies course. It functions as a "Digital Smart Vendor Dashboard," allowing students to register as either a **student** (buyer) or a **vendor** (seller) to trade items like used textbooks, class notes, or homemade goods on campus.

The application features a complete RESTful API backend with secure JWT authentication and a separate React frontend built with Vite, utilizing React Context for global state management.

---

## Tech Stack

* **Frontend:**
    * React.js (with Vite)
    * React Router
    * Axios (for API requests)
    * React Context API (for Auth and Cart state)
    * CSS Modules
* **Backend:**
    * Node.js
    * Express.js
    * MongoDB (with Mongoose)
    * JSON Web Tokens (JWT) (for authentication)
    * bcrypt.js (for password hashing)

---

## Key Features

### Public Features
* **Browse Products:** A homepage that displays all available products from all vendors.
* **Browse Vendors:** A dedicated page to list all registered vendors.
* **View Storefront:** Click on any vendor to see their specific "store" page, listing only their products.

### Student (Buyer) Features
* **Secure Registration & Login:** Register as a 'student' and log in with a secure, token-based session.
* **Shopping Cart:** A persistent client-side cart (using Context) to add/remove items.
* **Checkout:** A checkout process that intelligently groups cart items by vendor and creates separate orders for each.
* **Order History:** A profile page that lists all past orders placed by the student.

### Vendor (Seller) Features
* **Secure Registration & Login:** Register with a 'vendor' role to unlock special permissions.
* **Vendor Dashboard:** A private, protected dashboard that shows a summary of recent orders received.
* **Inventory Management:** A private page to view, add, and delete products from your store.

---

## Getting Started

Follow these instructions to get the project running locally on your machine.

### Prerequisites

  * [Node.js](https://nodejs.org/) (v18 or later)
  * [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)

### 1\. Clone the Repository

```bash
git clone https://github.com/PiyushShiv26/web-tech-project.git
cd web-tech-project
```

### 2\. Backend Setup (`backend` folder)

1.  **Navigate to the backend:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install express mongoose dotenv cors bcryptjs jsonwebtoken express-async-handler
    ```

3.  **Create a `.env` file** in the `backend` folder and add your environment variables:

    ```.env
    PORT=3000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_long_random_jwt_secret>
    ```

    *Use `crypto.randomBytes(64).toString("hex")` in a Node terminal to generate a strong `JWT_SECRET`.*

4.  **Run the Seeder (Optional but Recommended):**
    To populate your database with sample users and products, run:

    ```bash
    node seeder.js
    ```

    *To destroy all data, run `node seeder.js -d`.*

5.  **Start the backend server:**

    ```bash
    node index.js
    ```

    *Your backend will be running at `http://localhost:3000`.*

### 3\. Frontend Setup (`client` folder)

1.  **Open a new terminal** and navigate to the frontend:

    ```bash
    cd client 
    ```

    *(If you named it `frontend`, `cd frontend`)*

2.  **Install dependencies:**

    ```bash
    npm install axios react-router-dom
    ```

3.  **Start the frontend server:**

    ```bash
    npm run dev
    ```

    *Your React app will open and run at `http://localhost:5173`.*
-----

## API Endpoints

A brief overview of the main API routes implemented.

| Method | Endpoint                 | Description                                | Access   |
| :----- | :----------------------- | :----------------------------------------- | :------- |
| `POST` | `/api/auth/register`     | Register a new user (student or vendor)    | Public   |
| `POST` | `/api/auth/login`        | Log in a user and get a JWT                | Public   |
| `GET`  | `/api/products`          | Get all products                           | Public   |
| `GET`  | `/api/products/:id`      | Get a single product by its ID             | Public   |
| `GET`  | `/api/users/vendors`     | Get a list of all vendors (name and ID)    | Public   |
| `GET`  | `/api/users/store/:id`   | Get a vendor's details and their products  | Public   |
| `POST` | `/api/products`          | Create a new product                       | Vendor   |
| `PUT`  | `/api/products/:id`      | Update your own product                    | Vendor   |
| `DEL`  | `/api/products/:id`      | Delete your own product                    | Vendor   |
| `POST` | `/api/orders`            | Create a new order (from checkout)         | Student  |
| `GET`  | `/api/orders/my-orders`  | Get all orders for the logged-in user      | Private  |
| `GET`  | `/api/orders/:id`        | Get a single order by its ID               | Private  |
