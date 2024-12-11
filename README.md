# **willnichthaben**

## **Overview**
A clone of Willhaben designed to provide marketplaces for retail, vehicles, and real estate rentals. The application implements a responsive, user-friendly interface with robust security measures.

---

## **Project Requirements**

### **General Application Requirements**
-  **Database**: Use PostgreSQL to store data.
-  **Backend**: Implement in Node.js; expose functionality via REST API.
-  **Frontend**: Use Angular to access the REST API.
-  **Authentication**: Support user authentication.
-  **Concurrency**: Allow multiple users to access their data simultaneously.
-  **Data Privacy**: Users can only access their own data.
-  **Responsive Design**: Ensure the UI is intuitive and mobile-friendly.
-  **Security**: Use prepared statements and validate all inputs to prevent vulnerabilities.

### **Documentation**
-  Document the solution in a PDF and include it with the project files.

---


## **Checklist of Functionalities**

### **User Management**
- [x] User registration (email, password, address).
- [ ] Account maintenance (update password, address).
- [ ] Unified user interface for both buyers and sellers.
- [ ] Store above Data in a Postgres Table accessible by all three Marketplaces
- [ ] Landing Page which allows to access the different Marketplaces

---

### Retail Marketplace

#### Seller View:
- [ ] Add, update, and delete product listings.
    - Product Properties: Name, category, description, price, delivery options, condition, pictures, and additional category-specific properties.
- [ ] View all listings (current and sold).
- [ ] Communicate with prospective buyers (chat-like functionality).
- [ ] Mark listings as sold (retained in the system but hidden from buyers).

#### Buyer View:
- [ ] Browse product categories hierarchically.
- [ ] Search products using criteria:
    - [ ] Title/description substring.
    - [ ] Category and subcategories.
    - [ ] Price range.
    - [ ] Seller address (city).
    - [ ] Condition.
    - [ ] Delivery method.
    - [ ] Additional properties.
- [ ] Open detailed product views.
- [ ] Communicate with sellers (chat-like functionality).

---

### **Vehicle Marketplace**
#### Seller View:
- [ ] Add, update, and delete vehicle listings.
    - **Vehicle Properties**: Name, model, type, description, price, registration date, mileage, fuel type, color, condition, pictures.
- [ ] View all listings (current and sold).
- [ ] Communicate with prospective buyers (chat-like functionality).
- [ ] Mark listings as sold (retained in the system but hidden from buyers).

#### Buyer View:
- [ ] Browse vehicle categories hierarchically (marks, models, types).
- [ ] Search vehicles using criteria:
    - [ ] Name/description substring.
    - [ ] Mark/model hierarchy.
    - [ ] Vehicle type.
    - [ ] Price range.
    - [ ] Seller address (city).
    - [ ] Registration date, mileage, fuel type, color, condition.
- [ ] Open detailed vehicle views.
- [ ] Communicate with sellers (chat-like functionality).

---

### **Real Estate Rental Marketplace**
#### Owner View:
- [ ] Add, update, and delete real estate listings.
    - **Real Estate Properties**: Name, type, description, address (city), price, rental period, deposit, availability, pictures, additional category-specific properties.
- [ ] View all listings (current and rented).
- [ ] Communicate with prospective tenants (chat-like functionality).
- [ ] Mark listings as rented (retained in the system but hidden from tenants).

#### Tenant View:
- [ ] Browse real estate categories hierarchically (provinces, cities).
- [ ] Search real estate using criteria:
    - [ ] Name/description substring.
    - [ ] Real estate type.
    - [ ] Price range.
    - [ ] Rental period.
    - [ ] Address (province or city).
    - [ ] Availability.
    - [ ] Additional properties.
- [ ] Open detailed real estate views.
- [ ] Communicate with owners (chat-like functionality).

---

## **Additional Notes**
- All listings and categories (e.g., product, vehicle, real estate) must be pre-populated in the database where required.
- Payments are not supported; sellers/owners manually mark listings as sold/rented.

---

## **How to Use**
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd willnichthaben
   ```
2. Install dependencies for backend and frontend:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:4200`.

---

## **Planned Features (Optional Enhancements)**
- Add user ratings for transactions.
- Include filtering by location radius.
- Integrate analytics for user activity.

---