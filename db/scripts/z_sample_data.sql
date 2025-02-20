INSERT INTO
    addresses (id, city, postal_code, street_address)
VALUES
    ('8677a8ab-0347-4db9-a442-1a7c4cef6fff', 'Klagenfurt', '9020', 'Universitäts Straße 1');

INSERT INTO 
    users (id, email, password, address_id)
VALUES
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'sample@gmail.com', '123', '8677a8ab-0347-4db9-a442-1a7c4cef6fff');

INSERT INTO 
    listings (seller_id, type, title, description, price, is_sold)
VALUES
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Very new Audi (for sale)!', 'Sample Description: Very Cool!', 12000.00, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Also a very new cool Audi (cash only).', 'Sample Description: Very Cool!', 14000.00, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Luxury BMW - Low Mileage!', 'Sample Description: Well-maintained and runs great!', 25000.00, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'BMW iX2 - Reliable & Affordable', 'Sample Description: Great condition, fuel-efficient!', 8000.00, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'KIA Sorento - Electric Power!', 'Sample Description: Fast acceleration, low maintenance!', 35000.00, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Nissan Ariya - Strong & Dependable', 'Sample Description: Perfect for work and road trips!', 18000.00, false);

INSERT INTO 
    vehicles (listing_id, name, model_id, type_id, date_first_registration, mileage, fuel_type, color, condition)
VALUES
    (1, 'Peter', 1, 1, '2024-12-17 07:37:16-08', 1002, 'diesel', 'gray', 'new'),
    (2, 'Anne', 2, 3, '2025-01-01 10:15:00-08', 402, 'diesel', 'blue', 'new'),
    (3, 'John', 36, 2, '2023-09-05 09:30:00-08', 5000, 'diesel', 'black', 'used'),
    (4, 'Emily', 50, 4, '2022-05-20 12:45:00-08', 32000, 'hybrid', 'white', 'used'),
    (5, 'Michael', 204, 5, '2024-06-15 15:00:00-08', 200, 'electric', 'red', 'new'),
    (6, 'Sophia', 305, 6, '2021-11-25 08:10:00-08', 45000, 'diesel', 'silver', 'used');