-- delete tables if they already exist
DROP TABLE IF EXISTS marketplace_item_properties CASCADE;
DROP TABLE IF EXISTS additional_properties CASCADE;
DROP TABLE IF EXISTS marketplace_items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- ##################################
-- #         table creation         #
-- ##################################

-- main categories
CREATE TABLE categories
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- additional properties for categories
CREATE TABLE additional_properties
(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    category_id     INT REFERENCES categories (id),
    property_type   VARCHAR(50) DEFAULT 'boolean'
);

-- items that are listed
CREATE TABLE marketplace_items
(
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(100) NOT NULL,
    category_id       INT          NOT NULL REFERENCES categories (id),
    description       TEXT,
    price             NUMERIC      NOT NULL,
    delivery_options  VARCHAR(100) NOT NULL,
    condition         VARCHAR(50)  NOT NULL,
    seller_id         INT          NOT NULL,
    status            VARCHAR(20) DEFAULT 'available'
);

-- additional info for items
CREATE TABLE marketplace_item_properties
(
    id                    SERIAL PRIMARY KEY,
    marketplace_item_id   INT NOT NULL REFERENCES marketplace_items (id) ON DELETE CASCADE,
    additional_property_id INT NOT NULL REFERENCES additional_properties (id),
    value                 TEXT NOT NULL
);

-- ##################################
-- #        prefill datasets        #
-- ##################################

INSERT INTO categories (name)
VALUES ('Electronics'),
       ('Furniture'),
       ('Fashion'),
       ('Sports & Outdoors'),
       ('Books & Media');

INSERT INTO additional_properties (name, category_id, property_type)
VALUES ('Brand', 1, 'text'),
       ('Model', 1, 'text'),
       ('Color', 2, 'text'),
       ('Material', 2, 'text'),
       ('Size', 3, 'text');



