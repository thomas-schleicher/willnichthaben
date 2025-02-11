-- delete tables if they already exist
DROP TABLE IF EXISTS retail_item_properties CASCADE;
DROP TABLE IF EXISTS retail_categories_properties CASCADE;
DROP TABLE IF EXISTS retail_items CASCADE;
DROP TABLE IF EXISTS retail_categories CASCADE;

-- ##################################
-- #         table creation         #
-- ##################################

-- main categories
CREATE TABLE retail_categories
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE -- retail category label
);

-- additional properties for specific categories
CREATE TABLE retail_categories_properties
(
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL, -- additional property label for specific category
    category_id     INT REFERENCES retail_categories (id), -- corresponding retail category by ID

    -- determines the options of which you can choose the property (true/false (2); "56 cm", "M" ... (or more))
    property_type   VARCHAR(50) DEFAULT 'boolean' 
);

-- items that are listed
CREATE TABLE retail_items
(
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(100) NOT NULL,
    category_id       INT          NOT NULL REFERENCES retail_categories (id), -- category by ID
    description       TEXT,
    price             NUMERIC      NOT NULL,
    delivery_options  VARCHAR(100) NOT NULL,
    condition         VARCHAR(50)  NOT NULL,
    seller_id         INT          NOT NULL,
    status            VARCHAR(20) DEFAULT 'available'
);

-- additional info for items
CREATE TABLE retail_item_properties
(
    id                    SERIAL PRIMARY KEY,
    retail_item_id   INT NOT NULL REFERENCES retail_items (id) ON DELETE CASCADE,
    additional_property_id INT NOT NULL REFERENCES retail_categories_properties (id),
    value                 TEXT NOT NULL
);

-- ##################################
-- #        prefill datasets        #
-- ##################################

INSERT INTO retail_categories (name)
VALUES ('Electronics'),
       ('Furniture'),
       ('Fashion'),
       ('Sports & Outdoors'),
       ('Books & Media');

INSERT INTO retail_categories_properties (name, category_id, property_type)
VALUES ('Brand', 1, 'text'),
       ('Model', 1, 'text'),
       ('Color', 2, 'text'),
       ('Material', 2, 'text'),
       ('Size', 3, 'text');



