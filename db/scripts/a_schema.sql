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

CREATE TABLE listings (
    id          SERIAL PRIMARY KEY,
    seller_id   UUID NOT NULL,
    type        VARCHAR(10) NOT NULL CHECK (type IN ('retail', 'property', 'vehicle')),
    title       VARCHAR(255),
    description TEXT,
    price       NUMERIC(10, 2) NOT NULL,
    is_sold     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE listing_images (
    id          SERIAL PRIMARY KEY,
    listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    image_url   VARCHAR(255) NOT NULL
);

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    listing_id int NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    chat_id int NOT NUll REFERENCES chat(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)