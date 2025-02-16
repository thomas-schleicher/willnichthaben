# **willnichthaben**

## **Overview**
A clone of Willhaben designed to provide marketplaces for retail, vehicles, and real estate rentals.

---

## **Checklist of Functionalities**

### **Shared Functionality**
- [x] Authentication. **(Thomas Schleicher)**
- [x] Listing Previews / Detailed Listing View. **(Thomas Schleicher)**
- [x] Image Upload / Placeholders / Image Reel. **(Elias Wassertheurer)**
- [x] Communicate with prospective buyers/sellers (chat function). **(Raphael Walcher)**

---

### **Retail Marketplace** - **(Elias Wassertheurer)**

#### Seller View:
- [ ] Add, update, and delete product listings.
    - Product Properties: Name, category, description, price, delivery options, condition, pictures, and additional category-specific properties.

#### Buyer View:
- [x] Browse product categories.
- [x] Search products using criteria:
    - [x] Title/description substring.
    - [x] Category and subcategories.
    - [x] Price range.
    - [x] Seller address (city).
    - [x] Condition.
    - [x] Delivery method.
    - [x] Additional properties.

---

### **Vehicle Marketplace** - **(Thomas Schleicher)**
#### Seller View:
- [ ] Add, update, and delete vehicle listings.
    - **Vehicle Properties**: Name, model, type, description, price, registration date, mileage, fuel type, color, condition, pictures.

#### Buyer View:
- [x] Browse vehicle categories (marks, models, types).
- [x] Search vehicles using criteria:
    - [x] Name/description substring.
    - [x] Mark/model hierarchy.
    - [x] Vehicle type.
    - [x] Price range.
    - [x] Seller address (city).
    - [x] Registration date, mileage, fuel type, color, condition.
- [x] Open detailed vehicle views.

---

### **Real Estate Rental Marketplace** - **(Raphael Walcher)**
#### Owner View:
- [ ] Add, update, and delete real estate listings.
    - **Real Estate Properties**: Name, type, description, address (city), price, rental period, deposit, availability, pictures, additional category-specific properties.

#### Buyer View:
- [x] Browse real estate categories.
- [x] Search real estate using criteria:
    - [x] Name/description substring.
    - [x] Real estate type.
    - [x] Price range.
    - [x] Rental period.
    - [x] Address (province or city).
    - [x] Availability.
    - [x] Additional properties.

## **How to Run**
To run the backend, use the following commands:
```sh
npm install && npm run dev
```
To deploy the database, use:
```sh
docker-compose up
```
To run the frontend, use:
```sh
ng serve
``` 