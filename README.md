# Food Ordering Platform

## Design

The application is structured with a front-end and back-end, following a client-server architecture.

- **Front-End:** Developed with React.js and styled using Tailwind CSS. It handles user interaction, including browsing the inventory, managing the cart, and authentication. The front-end communicates with the back-end via API requests.
  
- **Back-End:** The server is built using Node.js and Express, with a MongoDB database. It manages user authentication (with JWT), handles inventory, cart persistence, and order history. RESTful APIs are used for communication between the front-end and back-end.

### Key Features:
1. **User Registration and Authentication:**
   - Users can sign up and log in securely.
   - JWT-based authentication for session management.
   
2. **Browse Item Inventory:**
   - Users can browse items by category (e.g., Fruit, Vegetables, etc.).
   - User-friendly item display with categories and search options.
   
3. **Cart Management:**
   - Add/remove items from the cart.
   - Cart persistence across devices (logged-in state).
   - Real-time stock checking during checkout.

4. **Order Checkout:**
   - View order summary before confirming.
   - Successful checkout results in an order confirmation with tracking information.
   - Inventory is updated based on successful orders.

5. **Order History:**
   - Users can view previous orders and their status (delivered or not).

### Security Considerations:
- User passwords are hashed for secure storage.
- JWT tokens are used for secure authentication and session management.
- Input validation and error handling ensure security and prevent vulnerabilities.

## Implementation

### Tech Stack:
- **Front-End:** React.js, Tailwind CSS, React Router
- **Back-End:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **API Client:** Axios


## How to Run

### Prerequisites:

1. **Node.js** and **npm** installed.
2. **MongoDB** instance (local or cloud).


### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ALW-N/Akasa_Air-Food_Ordering_Platform.git
   cd food-ordering-platform
   ```

2. **Install dependencies for both client and server:**

   For the client:
   ```bash
   cd food-ordering-backend
   npm install
   ```

   For the server:
   ```bash
   cd food-ordering-frontend
   npm install
   ```

3. **Set up environment variables:**

   In the `food-ordering-backend` folder, create a `.env` file with the following:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=supersecretpassword
   ```

4. **Run the server:**

   ```bash
   cd food-ordering-backend
   modemon server.js
   ```

5. **Run the frontend:**

   Open a new terminal window:
   ```bash
   cd food-ordering-frontend
   npm start
   ```

6. **Access the application:**

   The client will run on `http://localhost:3000`, and the API server will be on `http://localhost:5000`.

7. **To get JWT Secert**
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
