-- First, insert addresses with UUID generation
INSERT INTO addresses (postal_code, city, street_address)
SELECT postal_code, city, street_address
FROM (VALUES
          ('1010', 'Vienna', 'Schönbrunnstraße 12'),
          ('1100', 'Vienna', 'Innere Stadt 34'),
          ('1050', 'Vienna', 'Gumpendorfer Straße 78'),
          ('1030', 'Vienna', 'Hietzinger Hauptstraße 45'),
          ('1110', 'Vienna', 'Oberlaa 23')
     ) AS a(postal_code, city, street_address)
RETURNING id;

-- Then, insert users with UUID generation and link to addresses
WITH address_ids AS (
    SELECT id FROM addresses ORDER BY street_address
)
INSERT INTO users (email, password, address_id)
SELECT

    email,
    password,
    address_id
FROM (
    SELECT
        'john.doe@example.com' as email,
        '$2b$10$F9K/plEt1KiyazPZUvd1muOWllFp2jMHGJEg.jHR3sd8f9Lhmzzhm' as password, -- Password123!
        (SELECT id FROM addresses ORDER BY street_address LIMIT 1 OFFSET 0) as address_id
    UNION ALL
    SELECT
        'emma.wilson@example.com',
        '$2b$10$F9K/plEt1KiyazPZUvd1muOWllFp2jMHGJEg.jHR 3sd8f9Lhmzzhm', -- Password123!
        (SELECT id FROM addresses ORDER BY street_address LIMIT 1 OFFSET 1)
    UNION ALL
    SELECT
        'michael.brown@example.com',
        '$2b$10$F9K/plEt1KiyazPZUvd1muOWllFp2jMHGJEg.jHR3sd8f9Lhmzzhm', -- Password123!
        (SELECT id FROM addresses ORDER BY street_address LIMIT 1 OFFSET 2)
    UNION ALL
    SELECT
        'sarah.parker@example.com',
        '$2b$10$F9K/plEt1KiyazPZUvd1muOWllFp2jMHGJEg.jHR3sd8f9Lhmzzhm', -- Password123!
        (SELECT id FROM addresses ORDER BY street_address LIMIT 1 OFFSET 3)
    UNION ALL
    SELECT
        'david.miller@example.com',
        '$2b$10$F9K/plEt1KiyazPZUvd1muOWllFp2jMHGJEg.jHR3sd8f9Lhmzzhm', -- Password123!
        (SELECT id FROM addresses ORDER BY street_address LIMIT 1 OFFSET 4)
) AS u(email, password, address_id);