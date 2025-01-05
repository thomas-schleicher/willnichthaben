CREATE TABLE addresses
(
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    postal_code    VARCHAR(20)  NOT NULL,
    city           VARCHAR(100) NOT NULL,
    street_address VARCHAR(255) NOT NULL
);

CREATE TABLE users
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    address_id UUID REFERENCES addresses (id)
);
