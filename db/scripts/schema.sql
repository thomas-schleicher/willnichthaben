CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    street_address VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address_id UUID REFERENCES addresses(id)
);

CREATE TABLE listing_images (
    id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
);

CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('retail', 'property', 'vehicle')),
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    is_sold BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicle_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE vehicle_marks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL REFERENCES vehicle_categories(id) ON DELETE CASCADE
);

CREATE TABLE vehicle_models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mark_id INT NOT NULL REFERENCES vehicle_marks(id) ON DELETE CASCADE
);

CREATE TABLE vehicle_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category_id INT NOT NULL REFERENCES vehicle_categories(id) ON DELETE CASCADE
);

CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    model_id INT NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
    type_id INT NOT NULL REFERENCES vehicle_types(id) ON DELETE CASCADE,
    date_of_first_registration DATE NOT NULL,
    mileage INT NOT NULL,
    fuel_type VARCHAR(10) NOT NULL CHECK (fuel_type IN ('diesel', 'benzin', 'electric', 'hybrid')),
    color VARCHAR(50),
    condition VARCHAR(50) CHECK (condition IN ('new', 'used', 'broken'))
);