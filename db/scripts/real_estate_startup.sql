drop table if exists real_estate_object_properties cascade;
drop table if exists additional_properties cascade;
drop table if exists real_estate_objects cascade;
drop table if exists cities cascade;
drop table if exists real_estate_provinces cascade;
drop table if exists real_estate_types cascade;
drop table if exists real_estate_top_level_categories cascade;

create table real_estate_top_level_categories
(
    id   serial primary key,
    name varchar(50) not null unique
);

create table real_estate_types
(
    id                    serial primary key,
    name                  varchar(50) not null unique,
    top_level_category_id int         not null references real_estate_top_level_categories (id)
);

-- provinces
-- for simplicity plz of given state will be its capital
create table real_estate_provinces
(
    id        serial primary key,
    name      varchar(50) not null unique,
    plz_range int4range   not null
);

-- cities
create table cities
(
    id          serial primary key,
    name        varchar(50) not null,
    province_id int         not null references real_estate_provinces (id),
    plz         smallint    not null,
    unique (name, province_id)
);

-- additional properties
create table additional_properties
(
    id                    serial primary key,
    name                  varchar(50) not null,
    top_level_category_id int references real_estate_top_level_categories (id),
    property_type         varchar(50) default 'boolean'
);

create table real_estate_object_properties
(
    id                     serial primary key,
    real_estate_object_id  int  not null,
    additional_property_id int  not null references additional_properties (id),
    value                  text not null
);

-- real estate objects
create table real_estate_objects
(
    id                     serial primary key,
    listing_id             INT          NOT NULL REFERENCES listings (id) ON DELETE CASCADE,
    name                   varchar(100) not null,
    type_id                int          not null references real_estate_types (id),
    description            text,
    city_id                int          not null references cities (id),
    address                text         not null,
    price_per_month        numeric      not null,
    renting_period         varchar(50),
    advance_payment        numeric,
    immediate_availability boolean,
    owner_id               int          not null,
    status                 varchar(20) default 'open',
    living_area            numeric,
    room_count             integer,
    availability           date,
    term_type              varchar(50),
    kitchen                boolean,
    cellar                 boolean
);

-- top-level categories
insert into real_estate_top_level_categories (name)
values ('houses'),
       ('rooms/apartments');

-- real estate types
insert into real_estate_types (name, top_level_category_id)
values ('room', 2),
       ('apartment', 2),
       ('penthouse', 2),
       ('villa', 1),
       ('detached house', 1);

insert into real_estate_provinces (name, plz_range)
values ('Wien', '[1000,2000)'),
       ('Niederösterreich', '[2000,4000)'),
       ('Oberösterreich', '[4000,5000)'),
       ('Salzburg', '[5000,6000)'),
       ('Tirol', '[6000,6700)'),
       ('Vorarlberg', '[6700,7000)'),
       ('Burgenland', '[7000,8000)'),
       ('Steiermark', '[8000,9000)'),
       ('Kärnten', '[9000,9999)');


-- cities thank you chatgpt
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


-- additional properties
insert into additional_properties (name, top_level_category_id, property_type)
values ('balcony', 2, 'boolean'),
       ('balcony_size', 2, 'numeric'),
       ('garden', 2, 'boolean'),
       ('parking', 2, 'boolean'),
       ('storage_room', 2, 'boolean'),
       ('land plot size', 1, 'numeric'),
       ('num_floors', 1, 'numeric');