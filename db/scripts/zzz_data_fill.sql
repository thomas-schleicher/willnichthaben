-- Insert listings data
INSERT INTO listings (seller_id, type, title, description, price, is_sold, created_at)
VALUES
    ('81b140cd-cd2f-45e1-8216-1ccda393c5af', 'property', 'Luxurious Penthouse in Vienna Center', 'Stunning penthouse with panoramic city views, high-end finishes throughout', 850000.00, false, '2024-02-01'),
    ('81b140cd-cd2f-45e1-8216-1ccda393c5af', 'property', 'Modern 3-Room Apartment in Leopoldstadt', 'Newly renovated apartment with balcony and parking', 420000.00, false, '2024-02-05'),
    ('81b140cd-cd2f-45e1-8216-1ccda393c5af', 'property', 'Cozy Studio near University', 'Perfect for students or young professionals', 180000.00, false, '2024-02-10'),
    ('e7c46b4e-29ba-41c2-9a10-57b3d0041a5c', 'property', 'Villa with Garden in Döbling', 'Elegant villa with large garden and pool', 1250000.00, false, '2024-02-15'),
    ('e7c46b4e-29ba-41c2-9a10-57b3d0041a5c', 'property', 'Modern Family House in Mödling', 'Contemporary design with smart home features', 750000.00, false, '2024-02-01');

-- Insert real_estate_objects data with merged property columns
INSERT INTO real_estate_objects (
    listing_id, name, type_id, description, city_id, address,
    price_per_month, renting_period, advance_payment,
    immediate_availability, owner_id, status, living_area,
    room_count, availability, term_type, kitchen, cellar,
    balcony, balcony_size, garden, parking, storage_room, land_plot_size, num_floors
)
VALUES
    -- Penthouse in Vienna Center (type_id 3 for penthouse)
    (6, 'Luxury City Penthouse', 3, 'Stunning penthouse featuring premium finishes, floor-to-ceiling windows, and a wrap-around terrace',
     1, 'Stephansplatz 15', 2500.00, '2 years minimum', 5000.00, false,
     1, 'open', 180.5, 4, '2024-04-01', 'long-term', true, true,
     true, 45.0, null, true, true, null, null),

    -- Modern Apartment in Leopoldstadt (type_id 2 for apartment)
    (7, 'Leopoldstadt Modern Apartment', 2, 'Contemporary 3-room apartment with high-quality amenities',
     2, 'Praterstraße 67', 1400.00, '1 year minimum', 2800.00, true,
     2, 'open', 95.0, 3, '2024-03-15', 'long-term', true, true,
     true, 12.0, null, true, true, null, null),

    -- Studio near University (type_id 1 for room)
    (8, 'Central Student Studio', 1, 'Well-designed studio apartment in prime location',
     8, 'Josefstädter Straße 23', 800.00, '6 months minimum', 1600.00, true,
     3, 'open', 35.0, 1, '2024-03-01', 'student', true, false,
     null, null, null, null, null, null, null),

    -- Villa in Döbling (type_id 4 for villa)
    (9, 'Döbling Luxury Villa', 4, 'Prestigious villa with panoramic views of Vienna',
     19, 'Grinzinger Allee 48', 4500.00, '3 years minimum', 9000.00, false,
     4, 'open', 320.0, 8, '2024-06-01', 'long-term', true, true,
     null, null, true, null, null, 1200.0, 3),

    -- Modern House in Mödling (type_id 5 for detached house)
    (10, 'Smart Home Mödling', 5, 'Modern family house with latest technology',
     37, 'Hauptstraße 45', 2800.00, '2 years minimum', 5600.00, true,
     5, 'open', 210.0, 6, '2024-04-15', 'long-term', true, true,
     null, null, true, null, null, 800.0, 2);