

## E-Commerce Frontend (React)

Building the complete React frontend for your e-commerce project. The API service layer will use mock data so everything works standalone — you'll connect it to your Express+MongoDB backend later by updating the API base URL.

### Pages
1. **Login** — form with email/password, stores JWT token in localStorage
2. **Signup** — registration form with name, email, password
3. **Products** — grid of product cards fetched from API service
4. **Cart** — items added via React state (useState), quantity controls, total calculation
5. **Orders** — list of user's past orders fetched from API
6. **Admin: Add Product** — form to create new products (POST)
7. **Admin: Manage Orders** — view all orders, update status dropdown

### Components
- **Navbar** — links to all pages, shows Login/Logout based on auth state, admin links if isAdmin
- **ProductCard** — displays product name, price, description, "Add to Cart" button

### Services
- **api.js** — Axios instance with base URL config and JWT token interceptor. Functions for all endpoints: `register()`, `login()`, `getProducts()`, `createProduct()`, `createOrder()`, `getOrders()`, `updateOrderStatus()`
- **Mock data** — built-in sample products/orders so the app works without a backend

### Auth Flow
- JWT token stored in localStorage after login
- Axios interceptor attaches token to all requests
- Protected routes redirect to login if no token
- Admin routes check `isAdmin` flag from stored user data

### Styling
- Clean CSS using Flexbox and Grid (no UI libraries)
- Responsive design with media queries
- Simple, minimal design easy to explain in viva

### Routing (React Router)
- `/login`, `/signup`, `/products`, `/cart`, `/orders`, `/admin/add-product`, `/admin/orders`

