🛍️ ShoppyGlobe E-commerce Application

This project is a modern, fully responsive e-commerce application built with React and Redux Toolkit. It fulfills all the requirements set forth in the project brief, focusing on efficient state management, performance optimization, and robust routing.

✨ Core Features & Technical Stack

Feature

Technology / Implementation

Project Requirement Status

Foundation

Vite (for fast development)

✅ Required

Styling

Tailwind CSS (Utility-first, responsive design)

✅ Required

State Management

Redux Toolkit (Slices, Actions, Selectors)

✅ Required (70 Marks)

Routing

React Router (createBrowserRouter)

✅ Required (20 Marks)

Data Source

https://dummyjson.com/products

✅ Implemented

Performance

React.lazy & Suspense, Lazy Image Loading

✅ Required (20 Marks)

Currency

Indian Rupee (₹)

✅ Customization Complete

📐 Project Structure

The application follows a standard feature-based folder structure, isolating concerns for Redux, Hooks, and Component Types:

shoppy-globe/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Cart/         # Cart, CartItem
│   │   ├── Common/       # Header, Footer, NotFound, FallbackLoader
│   │   ├── Products/     # ProductList, ProductItem
│   │   └── (Checkout.jsx, ProductDetail.jsx)
│   │
│   ├── hooks/            # Custom reusable hooks
│   │   └── useProductFetcher.js
│   │
│   ├── pages/            # Top-level components for Routing (Lazy Loaded)
│   │   ├── HomePage.jsx
│   │   ├── CartPage.jsx
│   │   └── CheckoutPage.jsx
│   │
│   ├── redux/            # Redux Slices and Store
│   │   ├── cartSlice.js
│   │   ├── productSlice.js
│   │   └── store.js
│   │
│   ├── App.jsx           # Main Router Configuration
│   └── main.jsx          # Root Provider Setup
└── ...


⚙️ Setup and Installation

Clone the Repository:

git clone [Your GitHub Repository Link]
cd shoppy-globe


Install Dependencies:

npm install
npm install react-icons # Required for modern icons in Header


Start Development Server:

npm run dev


🧱 Component Breakdown and Implementation Details

1. Header (Header.jsx)

Logic: Displays the ShoppyGlobe logo, navigation links (Home, Shop), and the Cart icon with a dynamic badge showing the totalQuantity retrieved via useSelector(selectTotalQuantity).

Styling: Uses React Icons (react-icons) for the navigation elements.

2. Product Listing (ProductList.jsx / HomePage.jsx)

Data Fetching: Utilizes the custom hook useProductFetcher to initiate data retrieval from the API into the Redux store on mount.

Search Feature: Implements product filtering by title and description using the selectFilteredProducts selector based on the searchQuery stored in Redux.

Currency: Prices are displayed in ₹ (Rupees).

3. Product Item (ProductItem.jsx)

Interactivity: Implements the "Add to Bag" button using dispatch(addToCart(product)) (Redux Event Handling).

Styling: Implements the required aesthetic hover effect: The entire card background turns indigo, and the text turns white (group-hover:bg-indigo-600), providing clear visual feedback.

Optimization: Images use the native HTML attribute loading="lazy".

4. Product Detail (ProductDetail.jsx)

Data Fetching: Uses local state (useState) and useEffect to fetch individual product data based on the dynamic id parameter from the URL (useParams).

Error Handling: Displays specific error messages for failed API requests or invalid product IDs.

5. Cart (Cart.jsx / CartItem.jsx)

State: Renders items retrieved via selectCartItems and calculates the final total price.

Event Handling: CartItem.jsx dispatches removeFromCart and adjustQuantity. The quantity adjustment logic ensures the count never drops below 1.

6. Checkout (Checkout.jsx)

Flow: Contains a dummy shipping form and the order summary.

Order Placement: Clicking "PLACE ORDER" triggers the final flow: displays "Order Placed Successfully," dispatches clearCart(), and automatically redirects the user to the Home page after a 3-second delay using useNavigate and setTimeout.

7. Performance and Routing

Code Splitting: All top-level components (HomePage, CartPage, CheckoutPage, ProductDetail) are wrapped in React.lazy and rendered within <Suspense fallback={<FallbackLoader />}> in App.jsx, ensuring minimal initial bundle size.

Routing: All routes (/, /products, /product/:id, /cart, /checkout) are correctly defined using the modern createBrowserRouter approach.

8. Footer (Footer.jsx)

Placement: The <Footer /> component is placed outside the main routing outlet in App.jsx, ensuring it is rendered consistently at the bottom of every page.

Styling: Clean, two-toned design using standard Tailwind gray and indigo colors.