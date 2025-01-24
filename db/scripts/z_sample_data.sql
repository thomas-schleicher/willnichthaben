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
    ('4ff81fe4-f62d-4a05-a86e-a2572840e6bb', 'vehicle', 'Gratis A2 zum verschänken!', 'Sample Description: Very Cool!', 120, false);

INSERT INTO 
    vehicles (name, model_id, type_id, date_first_registration, mileage, fuel_type, color, condition)
VALUES
    ('Very Big Boy A2', 2, 2, '1997-12-17 07:37:16-08', 20030, 'diesel', 'gray', 'used');