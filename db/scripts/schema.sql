CREATE TABLE addresses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    postal_code     VARCHAR(20)  NOT NULL,
    city            VARCHAR(100) NOT NULL,
    street_address  VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(100) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    address_id  UUID REFERENCES addresses(id)
);

CREATE TABLE listing_images (
    id          SERIAL PRIMARY KEY,
    listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    image_url   VARCHAR(255) NOT NULL,
);

CREATE TABLE listings (
    id          SERIAL PRIMARY KEY,
    seller_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type        VARCHAR(10) NOT NULL CHECK (type IN ('retail', 'property', 'vehicle')),
    description TEXT,
    price       NUMERIC(10, 2) NOT NULL,
    is_sold     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);