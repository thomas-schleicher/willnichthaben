-- delete tables if they already exist
DROP TABLE IF EXISTS marketplace_item_properties CASCADE;
DROP TABLE IF EXISTS additional_properties CASCADE;
DROP TABLE IF EXISTS marketplace_items CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS provinces CASCADE;
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

-- provinces for location of the seller
CREATE TABLE provinces
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(50) NOT NULL UNIQUE,
    plz_range INT4RANGE   NOT NULL
);

-- cities for location of the seller
CREATE TABLE cities
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,
    province_id INT         NOT NULL REFERENCES provinces (id),
    plz         SMALLINT    NOT NULL,
    UNIQUE (name, province_id)
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
    city_id           INT          NOT NULL REFERENCES cities (id),
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

-- provinces thank you Raphael
INSERT INTO provinces (name, plz_range)
VALUES ('Wien', '[1000,2000)'),
       ('Niederösterreich', '[2000,4000)'),
       ('Oberösterreich', '[4000,5000)'),
       ('Salzburg', '[5000,6000)'),
       ('Tirol', '[6000,6700)'),
       ('Vorarlberg', '[6700,7000)'),
       ('Burgenland', '[7000,8000)'),
       ('Steiermark', '[8000,9000)'),
       ('Kärnten', '[9000,10000)');

-- cities thank you Raphael
INSERT INTO cities (name, province_id, plz)
VALUES ('Wien, 01. Bezirk, Innere Stadt', 1, 1010),
       ('Wien, 02. Bezirk, Leopoldstadt', 1, 1020),
       ('Wien, 03. Bezirk, Landstraße', 1, 1030),
       ('Wien, 04. Bezirk, Wieden', 1, 1040),
       ('Wien, 05. Bezirk, Margareten', 1, 1050),
       ('Wien, 06. Bezirk, Mariahilf', 1, 1060),
       ('Wien, 07. Bezirk, Neubau', 1, 1070),
       ('Wien, 08. Bezirk, Josefstadt', 1, 1080),
       ('Wien, 09. Bezirk, Alsergrund', 1, 1090),
       ('Wien, 10. Bezirk, Favoriten', 1, 1100),
       ('Wien, 11. Bezirk, Simmering', 1, 1110),
       ('Wien, 12. Bezirk, Meidling', 1, 1120),
       ('Wien, 13. Bezirk, Hietzing', 1, 1130),
       ('Wien, 14. Bezirk, Penzing', 1, 1140),
       ('Wien, 15. Bezirk, Rudolfsheim-Fünfhaus', 1, 1150),
       ('Wien, 16. Bezirk, Ottakring', 1, 1160),
       ('Wien, 17. Bezirk, Hernals', 1, 1170),
       ('Wien, 18. Bezirk, Währing', 1, 1180),
       ('Wien, 19. Bezirk, Döbling', 1, 1190),
       ('Wien, 20. Bezirk, Brigittenau', 1, 1200),
       ('Wien, 21. Bezirk, Floridsdorf', 1, 1210),
       ('Wien, 22. Bezirk, Donaustadt', 1, 1220),
       ('Wien, 23. Bezirk, Liesing', 1, 1230),

       ('Amstetten', 2, 3300),
       ('Baden', 2, 2500),
       ('Bruck an der Leitha', 2, 2460),
       ('Gänserndorf', 2, 2230),
       ('Gmünd', 2, 3950),
       ('Hollabrunn', 2, 2020),
       ('Horn', 2, 3580),
       ('Korneuburg', 2, 2100),
       ('Krems an der Donau', 2, 3500),
       ('Lilienfeld', 2, 3180),
       ('Melk', 2, 3390),
       ('Mistelbach', 2, 2130),
       ('Mödling', 2, 2340),
       ('Neunkirchen', 2, 2620),
       ('Sankt Pölten', 2, 3100),
       ('Scheibbs', 2, 3270),
       ('Tulln', 2, 3430),
       ('Waidhofen an der Thaya', 2, 3830),
       ('Waidhofen an der Ybbs', 2, 3340),
       ('Wiener Neustadt', 2, 2700),
       ('Zwettl', 2, 3910),

       ('Braunau am Inn', 3, 5280),
       ('Eferding', 3, 4070),
       ('Freistadt', 3, 4240),
       ('Gmunden', 3, 4810),
       ('Grieskirchen', 3, 4710),
       ('Kirchdorf an der Krems', 3, 4560),
       ('Linz', 3, 4020),
       ('Perg', 3, 4320),
       ('Ried im Innkreis', 3, 4910),
       ('Rohrbach', 3, 4150),
       ('Schärding', 3, 4780),
       ('Steyr', 3, 4400),
       ('Vöcklabruck', 3, 4840),
       ('Wels', 3, 4600),

       ('Hallein', 4, 5400),
       ('Salzburg Stadt', 4, 5020),
       ('Sankt Johann im Pongau', 4, 5600),
       ('Tamsweg', 4, 5580),
       ('Zell am See', 4, 5700),

       ('Innsbruck', 5, 6020),
       ('Kitzbühel', 5, 6370),
       ('Landeck', 5, 6500),
       ('Reutte', 5, 6600),
       ('Schwaz', 5, 6130),

       ('Bludenz', 6, 6700),
       ('Bregenz', 6, 6900),
       ('Dornbirn', 6, 6850),
       ('Feldkirch', 6, 6800),

       ('Eisenstadt', 7, 7000),
       ('Güssing', 7, 7540),
       ('Jennersdorf', 7, 8380),
       ('Mattersburg', 7, 7210),
       ('Neusiedl am See', 7, 7100),
       ('Oberwart', 7, 7400),
       ('Rust (Stadt)', 7, 7071),

       ('Graz', 8, 8010),
       ('Bruck-Mürzzuschlag', 8, 8600),
       ('Deutschlandsberg', 8, 8530),
       ('Hartberg', 8, 8230),
       ('Leibnitz', 8, 8430),
       ('Liezen', 8, 8940),
       ('Murau', 8, 8850),
       ('Voitsberg', 8, 8570),
       ('Weiz', 8, 8160),

       ('Klagenfurt', 9, 9020),
       ('Villach', 9, 9500),
       ('Feldkirchen', 9, 9560),
       ('Sankt Veit an der Glan', 9, 9300),
       ('Spittal an der Drau', 9, 9800),
       ('Völkermarkt', 9, 9100),
       ('Wolfsberg', 9, 9400);
