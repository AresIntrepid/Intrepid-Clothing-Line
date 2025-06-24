# INTREPID Streetwear E-commerce Platform

INTREPID is a modern streetwear e-commerce platform built with React, Node.js, Express, MongoDB, and Handlebars. It features a clean, responsive UI, dynamic product filtering, a shopping cart, and a drops showcase.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Data Model](#data-model)
- [Routes & Endpoints](#routes--endpoints)
- [Frontend Overview](#frontend-overview)
- [Styling](#styling)
- [Screens & Templates](#screens--templates)
- [Seeding the Database](#seeding-the-database)
- [License](#license)

---

## Features

- Product catalog with filtering and sorting
- Shopping cart (client-side, localStorage)
- Upcoming and past drops showcase
- About page with brand story and contact info
- Responsive, modern UI
- MongoDB-backed product data
- Handlebars templating

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** Handlebars, Vanilla JS, CSS
- **Templating:** express-handlebars
- **Dev Tools:** nodemon, dotenv

---

## Project Structure

```
intrepid/
  app.js                  # Main server entry point
  data.js                 # Database seeding script
  models/
    Product.js            # Mongoose Product schema
  modules/
    config.js             # App configuration (env, port, Mongo URI)
  routes/
    index.js              # Main route definitions
  public/
    images/               # Product images
    scripts/
      main.js             # Frontend JS (filtering, cart, etc.)
    styles/
      styles.css          # Main CSS
  views/
    layouts/
      main.handlebars     # Main HTML layout
    home.handlebars       # Home page
    shop.handlebars       # Shop page
    cart.handlebars       # Cart page
    drops.handlebars      # Drops page
    about.handlebars      # About page
  package.json
  package-lock.json
```

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd intrepid
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/intrepid
     ```

4. **Seed the database with initial products:**
   ```bash
   node data.js
   ```

5. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Visit the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Configuration

- All configuration is managed via `modules/config.js` and environment variables.
- Required env vars:
  - `PORT` (default: 3000)
  - `MONGODB_URI` (your MongoDB connection string)

---

## Available Scripts

- `npm start` — Start the server
- `npm run dev` — Start the server with nodemon (auto-reload)
- `node data.js` — Seed the database with initial products

---

## Data Model

**Product Schema (`models/Product.js`):**
```js
{
  name: String,
  price: Number,
  category: String,
  imageUrl: String
}
```

---

## Routes & Endpoints

**Main routes (`routes/index.js`):**

| Route            | Method | Description                                 |
|------------------|--------|---------------------------------------------|
| `/`              | GET    | Home page, shows latest products            |
| `/shop`          | GET    | Shop page, all products, filter/sort        |
| `/drops`         | GET    | Upcoming and past drops                     |
| `/about`         | GET    | About page, brand story, contact info       |
| `/cart`          | GET    | Shopping cart page                          |
| `/api/products`  | GET    | Returns all products as JSON (for frontend) |

---

## Frontend Overview

- **Filtering & Sorting:**  
  Implemented in `public/scripts/main.js`. Users can filter products by category and sort by price.
- **Cart:**  
  Cart is managed in localStorage and updated dynamically on the cart page and header.
- **Dynamic Rendering:**  
  Handlebars templates render product lists, drops, and other dynamic content.

---

## Styling

- **CSS:**  
  All styles are in `public/styles/styles.css`.  
  Uses CSS variables, grid/flexbox, and media queries for responsive design.
- **Design:**  
  Clean, modern, and minimal, with a focus on usability and streetwear aesthetics.

---

## Screens & Templates

- **Home (`views/home.handlebars`):**  
  Hero section, latest drops/products, CTA to shop.

- **Shop (`views/shop.handlebars`):**  
  Product grid, filter bar (All, Tops, Bottoms, Accessories), sort dropdown, "Add to Cart" buttons.

- **Cart (`views/cart.handlebars`):**  
  Cart items (from localStorage), quantity controls, remove, total, checkout button.

- **Drops (`views/drops.handlebars`):**  
  Upcoming drops (with notify button), past drops (marked sold out).

- **About (`views/about.handlebars`):**  
  Brand story, mission, values (innovation, sustainability, community), contact info.

- **Layout (`views/layouts/main.handlebars`):**  
  Shared header (logo, nav, cart), footer (copyright, social).

---

## Seeding the Database

- Run `node data.js` to populate MongoDB with initial products.
- The script connects to the database, clears existing products, and inserts a default set.

---

**INTREPID — Pushing Boundaries in Street Culture**
