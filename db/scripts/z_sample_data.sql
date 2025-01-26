INSERT INTO
    addresses (id, city, postal_code, street_address)
VALUES
    ('8677a8ab-0347-4db9-a442-1a7c4cef6fff', 'Klagenfurt', '9020', 'Universitäts Straße 1');

INSERT INTO 
    users (id, email, password, address_id)
VALUES
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'test@gmail.com', '123', '8677a8ab-0347-4db9-a442-1a7c4cef6fff');

INSERT INTO 
    listings (seller_id, type, title, description, price, is_sold)
VALUES 
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Gratis A2 zum verschänken! 1', 'Sample Description: Very Cool!', 120, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Gratis A2 zum verschänken! 2', 'Sample Description: Very Cool!', 120, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Gratis A2 zum verschänken! 3', 'Sample Description: Very Cool!', 120, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Gratis A2 zum verschänken! 4', 'Sample Description: Very Cool!', 120, false),
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Gratis A2 zum verschänken! 5', 'Sample Description: Very Cool!', 120, false);

INSERT INTO 
    vehicles (listing_id, name, model_id, type_id, date_first_registration, mileage, fuel_type, color, condition)
VALUES
    (1, 'Very Big Boy A2', 2, 2, '1997-12-17 07:37:16-08', 20030, 'diesel', 'gray', 'used'),
    (2, 'Speedy Car B1', 3, 1, '2005-06-21 10:15:00-08', 15000, 'benzin', 'red', 'new'),
    (3, 'Eco Friendly C3', 4, 3, '2010-09-11 08:45:00-08', 5000, 'electric', 'blue', 'new'),
    (4, 'Family Van D4', 5, 4, '2015-03-25 12:00:00-08', 30000, 'hybrid', 'white', 'used'),
    (5, 'Sporty Coupe E5', 6, 5, '2018-07-30 09:30:00-08', 10000, 'benzin', 'black', 'new');