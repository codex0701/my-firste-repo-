# 🥬 Vegetable Market — Digital Mandi Marketplace Prototype

> **Academic Mini-Project / Hackathon Showcase (2026)**  
> **Course / Track:** Web Application Development & Human-Computer Interaction (HCI)  
> **Built by:** Student Developer Team (Department of Computer Science & Engineering)

---

## 📌 Project Overview & Motivation

Visiting traditional vegetable markets (*mandis*) is an essential daily routine across millions of households. While local markets offer fresh farm produce at competitive prices, customers regularly face practical hurdles:

1. **Opaque Pricing:** Prices fluctuate hour-by-hour with no clear baseline, often requiring bargaining.
2. **Exhaustive Manual Comparison:** Buyers must physically walk past 10+ crowded stalls just to compare basic staples like tomatoes, onions, and potatoes.
3. **Uncertain Daily Stock:** Items are often out of stock or sold out before arriving at the market.
4. **Unpredictable Basket Costs:** Hard to know your complete grocery expenditure until everything is weighed at checkout.

**Vegetable Market** is a modern, student-designed digital prototype that demonstrates how a local vegetable market can be made transparent, predictable, and convenient without replacing the traditional local vendors.

---

## ✨ Key Features & Functionality

- **🥦 22 Regional Vegetables Catalog:** Realistic Indian produce with ₹ (INR) pricing, units (`/kg`, `/bunch`, `/piece`, `/250g`), and seller badges.
- **🔎 Real-Time Search & Filtering:**
  - Instant name and keyword search (e.g., typing *"tom"* shows Tomato).
  - Category filters: Root, Fruits & Vegetables, Leafy Greens, Green Vegetables, Bulbs, Seasonal.
  - Price range slider up to ₹150.
  - Stock availability filter (In Stock, Limited Stock).
  - Seller dropdown filter (Green Farm, Local Harvest, Fresh Basket, Organic Corner, Kisan Mandi Direct).
  - Sorting: Price (Low/High), Name (A-Z), and Availability.
- **🛒 Smart Shopping Basket:**
  - Real-time quantity increment/decrement (`- / +`) per item.
  - Live calculation of subtotal and delivery fee.
  - Free delivery milestone progress indicator (Free delivery above ₹200).
  - Client-side persistence using `localStorage`.
- **💳 Simulated Checkout Experience:**
  - Collects customer name, 10-digit mobile number, delivery address, and time slot.
  - Demo payment options: Cash on Delivery, UPI (Simulation), and Card (Simulation).
  - Clear academic disclaimer ensuring no real money or credentials are processed.
- **📦 4-Stage Visual Order Tracker:**
  - Visual status line: `Order Confirmed ✓` → `Preparing Order 🥬` → `Out for Delivery 🛵` → `Delivered 🎉`.
  - Interactive *"Simulate Next Stage"* button allowing demonstrators to step through live order fulfillment on stage!
- **💰 Multi-Seller Price Comparison Tool:**
  - Select any vegetable (e.g., Tomato, Potato, Onion, Carrot, Spinach) to view side-by-side rates from multiple local mandi vendors.
  - Highlights the lowest price / best value vendor with direct 1-click addition to cart.
- **📊 Market Dashboard & Interactive Price Chart:**
  - Real-time KPI counters (catalog count, in-stock count, demo orders placed, dynamic average basket value).
  - Custom responsive SVG price chart with toggles for Current Price (₹), Last Week (₹), and Price Change (%).
- **🏷️ Stock Badges & Low Stock Alerts:**
  - 🟢 *In Stock*
  - 🟡 *Limited Stock* (e.g., "Only 4 kg left today!")
  - 🔴 *Out of Stock* (disables Add to Cart button and marks item gracefully).
- **✉️ Evaluator Feedback Form:**
  - Allows faculty, judges, or peers to submit feedback, which is stored in `localStorage` with confirmation alerts.

---

## 🛠️ Technology Stack & Design Decisions

- **Markup:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Styling:** Modern CSS3 with CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, and responsive viewports without external heavy frameworks.
- **Interactivity:** Vanilla JavaScript (ES6+), decoupled event-driven DOM updates, and zero external build tool friction.
- **State Storage:** Browser `localStorage` for cart persistence, order histories, and evaluator feedback.
- **Resilience:** Automatic fallback handling for images (custom SVG emoji cards if external images are blocked or offline).

---

## 🚀 How to Run the Project

No Node.js, npm, or complex build steps are required. This project runs directly in any modern web browser!

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer or open it in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Local Python Server (Recommended)
From the project folder, run:
```bash
python -m http.server 3000
```
Then navigate to:
```
http://localhost:3000
```

---

## 👥 Project Team (Editable Academic Placeholders)

- **[Team Member 1]** — Frontend & UI Development
- **[Team Member 2]** — Backend / Data Management
- **[Team Member 3]** — Research & Market Analysis
- **[Team Member 4]** — Testing & Documentation

*Department of Computer Science & Engineering • Academic Project Showcase 2026*
