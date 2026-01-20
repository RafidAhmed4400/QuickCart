# QuickCart

QuickCart is a full-stack e-commerce web application built with Next.js that supports both customers and sellers. The platform includes all essential e-commerce features such as authentication, cart management, order processing, seller dashboards, and product management.

---

## Features

### Authentication & User Management
- Sign up and sign in using Clerk
- Secure authentication and session handling
- Fetch current user data
- User account management

### Customer Features
- Browse available products
- Add products to cart
- Update cart item quantities
- View cart items
- Add delivery addresses
- Retrieve previously saved addresses
- Place and process orders

### Seller Features
- Add new products
- View all products created by the seller
- View all orders the seller needs to process
- Seller-specific order management

### Backend & API
- Event-driven API handling using Inngest
- APIs for:
  - Fetching current user data
  - Managing user accounts
  - Adding and retrieving addresses
  - Cart operations (get/update items)
  - Order processing
  - Seller order listings
- MongoDB for database storage
- Cloudinary for image upload and media management
- Vercel for deployment

---

## Tech Stack

- **Frontend**
  - Next.js
  - React
  - Tailwind CSS

- **Backend / Services**
  - Inngest
  - Clerk
  - MongoDB
  - Cloudinary

- **Other Tools**
  - Axios
  - Node.js
  - Environment variables via `.env`
  - vercel

---

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Public Environment Variables
NEXT_PUBLIC_CURRENCY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

# Private Environment Variables
CLERK_SECRET_KEY=
MONGODB_URI=
INNGEST_SIGNING_KEY=
INNGEST_EVENT_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
## Getting Started
```run
### 1. Clone the repository
- git clone https://github.com/RafidAhmed4400/QuickCart.git
- cd QuickCart

### 2. Install Dependencies
- npm install

### 3. Run application locally
- npm run dev

### 4. App will run on:
- http://localhost:3000
```
