CREATE TABLE vehicle_categories (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE vehicle_marks (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    category_id INT NOT NULL REFERENCES vehicle_categories(id) ON DELETE CASCADE
);

CREATE TABLE vehicle_models (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    mark_id INT NOT NULL REFERENCES vehicle_marks(id) ON DELETE CASCADE
);

CREATE TABLE vehicle_types (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(50) NOT NULL
);

CREATE TABLE vehicles (
    id                      SERIAL PRIMARY KEY,
    name                    VARCHAR(150) NOT NULL,
    model_id                INT NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
    type_id                 INT REFERENCES vehicle_types(id) ON DELETE CASCADE,
    date_first_registration  DATE NOT NULL,
    mileage                 INT NOT NULL,
    fuel_type               VARCHAR(10) NOT NULL CHECK (fuel_type IN ('diesel', 'benzin', 'electric', 'hybrid')),
    color                   VARCHAR(50),
    condition               VARCHAR(50) CHECK (condition IN ('new', 'used', 'broken'))
);

INSERT INTO
    vehicle_categories (name)
VALUES
    ('Cars'),
    ('Motorbikes');

INSERT INTO
    vehicle_types (name)
VALUES
    ('Limousine'),
    ('SUV Geländewagen'),
    ('Kombi Family Van'),
    ('Klein- und Kompaktwagen'),
    ('Sportwagen Coupe'),
    ('Cabrio Roadster'),
    ('Kleinbus');

INSERT INTO
    vehicle_marks (name, category_id)
VALUES
    ('Audi', 1),
    ('BMW', 1),
    ('Citroën', 1),
    ('Fiat', 1),
    ('Ford', 1),
    ('Hyundai', 1),
    ('KIA', 1),
    ('Mazda', 1),
    ('Mercedes-Benz', 1),
    ('Mitsubishi', 1),
    ('Nissan', 1),
    ('Opel', 1),
    ('Peugeot', 1),
    ('Porsche', 1),
    ('Renault', 1),
    ('Seat', 1),
    ('Skoda', 1),
    ('Suzuki', 1),
    ('Toyota', 1),
    ('VW', 1),
    ('Volvo', 1),
    ('Aprilia', 2),
    ('Derbi', 2),
    ('Ducati', 2),
    ('Harley-Davidson', 2),
    ('Honda', 2),
    ('Husqvarna', 2),
    ('Kawasaki', 2),
    ('KTM', 2),
    ('Piaggio', 2),
    ('Puch', 2),
    ('Suzuki', 2),
    ('Triumph', 2),
    ('Vespa', 2),
    ('Yamaha', 2),
    ('BMW', 2),
    ('Sonstige', 1),
    ('Sonstige', 2);

INSERT INTO
    vehicle_models (name, mark_id)
VALUES
    ('A1', 1),
    ('A2', 1),
    ('A3', 1),
    ('A4', 1),
    ('A4 allroad', 1),
    ('A5', 1),
    ('A6', 1),
    ('A6 allroad', 1),
    ('A7', 1),
    ('A8', 1),
    ('Q2', 1),
    ('Q3', 1),
    ('Q4', 1),
    ('Q5', 1),
    ('Q6', 1),
    ('Q7', 1),
    ('Q8', 1),
    ('R8', 1),
    ('TT', 1),
    ('e-tron', 1),
    ('e-tron GT25', 1),
    ('Sonstige', 1),
    ('1er-Reihe', 2),
    ('2002', 2),
    ('2er-Reihe', 2),
    ('3er-Reihe', 2),
    ('4er-Reihe', 2),
    ('5er-Reihe', 2),
    ('6er-Reihe', 2),
    ('7er-Reihe', 2),
    ('8er-Reihe', 2),
    ('X1', 2),
    ('X2', 2),
    ('X3', 2),
    ('X4', 2),
    ('X5', 2),
    ('X6', 2),
    ('X7', 2),
    ('XM', 2),
    ('Z1', 2),
    ('Z3', 2),
    ('Z4', 2),
    ('i3', 2),
    ('i4', 2),
    ('i5', 2),
    ('i7', 2),
    ('i8', 2),
    ('iX', 2),
    ('iX1', 2),
    ('iX2', 2),
    ('iX3', 2),
    ('Sonstige', 2),
    ('2CV', 3),
    ('AX', 3),
    ('BX', 3),
    ('Berlingo', 3),
    ('C-Crosser', 3),
    ('C-Zero', 3),
    ('C1', 3),
    ('C2', 3),
    ('C3', 3),
    ('C3 Aircross', 3),
    ('C3 Picasso', 3),
    ('C4', 3),
    ('C4 Aircross', 3),
    ('C4 Cactus', 3),
    ('C4 Picasso', 3),
    ('C4 Spacetourer', 3),
    ('C4 X', 3),
    ('C5', 3),
    ('C5 Aircross', 3),
    ('C5 X', 3),
    ('C6', 3),
    ('C8', 3),
    ('DS3', 3),
    ('DS4', 3),
    ('DS5', 3),
    ('Evasion', 3),
    ('Grand C4 Spacetourer', 3),
    ('Jumper', 3),
    ('Jumpy', 3),
    ('Nemo', 3),
    ('Saxo', 3),
    ('Spacetourer', 3),
    ('XM', 3),
    ('Xantia', 3),
    ('Xsara', 3),
    ('Xsara Picasso', 3),
    ('ZX', 3),
    ('Sonstige', 3),
    ('124 Spider', 4),
    ('500', 4),
    ('500 E', 4),
    ('500C', 4),
    ('500L', 4),
    ('500X', 4),
    ('600', 4),
    ('Barchetta', 4),
    ('Brava', 4),
    ('Bravo', 4),
    ('Cinquecento', 4),
    ('Coupé', 4),
    ('Croma', 4),
    ('Doblò', 4),
    ('Ducato', 4),
    ('Fiorino', 4),
    ('Fiorino Qubo', 4),
    ('Freemont', 4),
    ('Grande Punto', 4),
    ('Idea', 4),
    ('Marea', 4),
    ('Multipla', 4),
    ('Palio', 4),
    ('Panda', 4),
    ('Punto', 4),
    ('Scudo', 4),
    ('Sedici', 4),
    ('Seicento', 4),
    ('Stilo', 4),
    ('Talento', 4),
    ('Tempra', 4),
    ('Tipo', 4),
    ('Ulysse', 4),
    ('Uno', 4),
    ('Sonstige', 4),
    ('B-MAX', 5),
    ('Bronco', 5),
    ('C-MAX', 5),
    ('Cougar', 5),
    ('EcoSport', 5),
    ('Edge', 5),
    ('Escort', 5),
    ('Explorer', 5),
    ('Fiesta', 5),
    ('Focus', 5),
    ('Fusion', 5),
    ('Galaxy', 5),
    ('Ka', 5),
    ('Kuga', 5),
    ('Maverick', 5),
    ('Mondeo', 5),
    ('Mustang', 5),
    ('Mustang Mach-E', 5),
    ('Probe', 5),
    ('Puma', 5),
    ('S-MAX', 5),
    ('Scorpio', 5),
    ('Sierra', 5),
    ('Taunus', 5),
    ('Thunderbird', 5),
    ('Tourneo', 5),
    ('Transit', 5),
    ('Transit Custom', 5),
    ('Sonstige', 5),
    ('Accent', 6),
    ('Atos', 6),
    ('Bayon', 6),
    ('Elantra', 6),
    ('Galloper', 6),
    ('Genesis', 6),
    ('Getz', 6),
    ('Grandeur', 6),
    ('H-1', 6),
    ('H100', 6),
    ('Ioniq', 6),
    ('Ioniq 5', 6),
    ('Ioniq 6', 6),
    ('Kona', 6),
    ('Lantra', 6),
    ('Matrix', 6),
    ('Santa Fe', 6),
    ('Sonata', 6),
    ('Starex', 6),
    ('Staria', 6),
    ('Terracan', 6),
    ('Tiburon', 6),
    ('Trajet', 6),
    ('Tucson', 6),
    ('Veloster', 6),
    ('i10', 6),
    ('i20', 6),
    ('i30', 6),
    ('i40', 6),
    ('iX20', 6),
    ('iX35', 6),
    ('iX5', 6),
    ('Sonstige', 6),
    ('Carens', 7),
    ('Carnival', 7),
    ('Ceed', 7),
    ('Cerato', 7),
    ('EV3', 7),
    ('EV6', 7),
    ('EV9', 7),
    ('Magentis', 7),
    ('Niro', 7),
    ('Opirus', 7),
    ('Optima', 7),
    ('Picanto', 7),
    ('ProCeed', 7),
    ('Rio', 7),
    ('Sephia', 7),
    ('Shuma', 7),
    ('Sorento', 7),
    ('Soul', 7),
    ('Sportage', 7),
    ('Stinger', 7),
    ('Stonic', 7),
    ('Venga', 7),
    ('XCeed', 7),
    ('e-Niro', 7),
    ('Sonstige', 7),
    ('121', 8),
    ('323', 8),
    ('626', 8),
    ('929', 8),
    ('CX-3', 8),
    ('CX-30', 8),
    ('CX-5', 8),
    ('CX-60', 8),
    ('CX-7', 8),
    ('CX-8', 8),
    ('CX-9', 8),
    ('Demio', 8),
    ('MPV', 8),
    ('MX-3', 8),
    ('MX-30', 8),
    ('MX-5', 8),
    ('Mazda2', 8),
    ('Mazda3', 8),
    ('Mazda5', 8),
    ('Mazda6', 8),
    ('Premacy', 8),
    ('RX-7', 8),
    ('RX-8', 8),
    ('Tribute', 8),
    ('Xedos 9', 8),
    ('Sonstige', 8),
    ('190', 9),
    ('280', 9),
    ('A-Klasse', 9),
    ('AMG GT', 9),
    ('B-Klasse', 9),
    ('C-Klasse', 9),
    ('CL-Klasse', 9),
    ('CLA-Klasse', 9),
    ('CLC-Klasse', 9),
    ('CLE-Klasse', 9),
    ('CLK-Klasse', 9),
    ('CLS-Klasse', 9),
    ('Citan', 9),
    ('E-Klasse', 9),
    ('EQA', 9),
    ('EQB', 9),
    ('EQC', 9),
    ('EQE', 9),
    ('EQS', 9),
    ('EQT', 9),
    ('EQV', 9),
    ('G-Klasse', 9),
    ('GL-Klasse', 9),
    ('GLA-Klasse', 9),
    ('GLB', 9),
    ('GLC-Klasse', 9),
    ('GLE-Klasse', 9),
    ('GLK-Klasse', 9),
    ('GLS-Klasse', 9),
    ('M-Klasse', 9),
    ('R-Klasse', 9),
    ('S-Klasse', 9),
    ('SL-Klasse', 9),
    ('SLC-Klasse', 9),
    ('SLK-Klasse', 9),
    ('SLS AMG', 9),
    ('Sprinter', 9),
    ('T-Klasse', 9),
    ('V-Klasse', 9),
    ('Vaneo', 9),
    ('Viano', 9),
    ('Vito', 9),
    ('Sonstige', 9),
    ('3000', 10),
    ('ASX', 10),
    ('Attrage', 10),
    ('Carisma', 10),
    ('Colt', 10),
    ('Eclipse', 10),
    ('Galant', 10),
    ('Grandis', 10),
    ('L300', 10),
    ('Lancer', 10),
    ('Outlander', 10),
    ('Pajero', 10),
    ('Sigma', 10),
    ('Space Star', 10),
    ('Space Wagon', 10),
    ('Starion', 10),
    ('iMiEV', 10),
    ('Sonstige', 10),
    ('100 NX', 11),
    ('200 SX', 11),
    ('350 Z', 11),
    ('370 Z', 11),
    ('Almera', 11),
    ('Ariya', 11),
    ('Bluebird', 11),
    ('GT-R', 11),
    ('Juke', 11),
    ('Leaf', 11),
    ('Maxima', 11),
    ('Micra', 11),
    ('Murano', 11),
    ('NV200', 11),
    ('Note', 11),
    ('Pathfinder', 11),
    ('Patrol', 11),
    ('Pixo', 11),
    ('Primastar', 11),
    ('Primera', 11),
    ('Pulsar', 11),
    ('Qashqai', 11),
    ('Serena', 11),
    ('Skyline', 11),
    ('Sunny', 11),
    ('Terrano', 11),
    ('Tiida', 11),
    ('Townstar', 11),
    ('X-TRAIL', 11),
    ('Sonstige', 11),
    ('Adam', 12),
    ('Agila', 12),
    ('Ampera', 12),
    ('Antara', 12),
    ('Ascona', 12),
    ('Astra', 12),
    ('Calibra', 12),
    ('Cascada', 12),
    ('Combo', 12),
    ('Corsa', 12),
    ('Crossland', 12),
    ('Crossland X', 12),
    ('Frontera', 12),
    ('GT', 12),
    ('Grandland', 12),
    ('Grandland X', 12),
    ('Insignia', 12),
    ('Kadett', 12),
    ('Karl', 12),
    ('Meriva', 12),
    ('Mokka', 12),
    ('Monterey', 12),
    ('Movano', 12),
    ('Omega', 12),
    ('Rekord', 12),
    ('Signum', 12),
    ('Sintra', 12),
    ('Speedster', 12),
    ('Tigra', 12),
    ('Vectra', 12),
    ('Vivaro', 12),
    ('Vivaro-e', 12),
    ('Zafira', 12),
    ('Sonstige', 12),
    ('1007', 13),
    ('106', 13),
    ('107', 13),
    ('108', 13),
    ('2008', 13),
    ('205', 13),
    ('206', 13),
    ('207', 13),
    ('208', 13),
    ('3008', 13),
    ('306', 13),
    ('307', 13),
    ('308', 13),
    ('309', 13),
    ('4007', 13),
    ('4008', 13),
    ('405', 13),
    ('406', 13),
    ('407', 13),
    ('408', 13),
    ('5008', 13),
    ('505', 13),
    ('508', 13),
    ('605', 13),
    ('607', 13),
    ('806', 13),
    ('807', 13),
    ('Boxer', 13),
    ('Expert', 13),
    ('Partner', 13),
    ('RCZ', 13),
    ('Rifter', 13),
    ('Traveller', 13),
    ('e-2008', 13),
    ('e-208', 13),
    ('e-Rifter', 13),
    ('iOn', 13),
    ('Sonstige', 13),
    ('718', 14),
    ('911', 14),
    ('914', 14),
    ('918', 14),
    ('924', 14),
    ('928', 14),
    ('944', 14),
    ('968', 14),
    ('Boxster', 14),
    ('Cayenne', 14),
    ('Cayman', 14),
    ('Macan', 14),
    ('Panamera', 14),
    ('Taycan', 14),
    ('Sonstige', 14),
    ('Arkana', 15),
    ('Austral', 15),
    ('Avantime', 15),
    ('Captur', 15),
    ('Clio', 15),
    ('Espace', 15),
    ('Fluence', 15),
    ('Grand Espace', 15),
    ('Grand Scénic', 15),
    ('Kadjar', 15),
    ('Kangoo', 15),
    ('Koleos', 15),
    ('Laguna', 15),
    ('Latitude', 15),
    ('Master', 15),
    ('Modus', 15),
    ('Mégane', 15),
    ('R 11', 15),
    ('R 19', 15),
    ('R 25', 15),
    ('R 5', 15),
    ('R 4', 15),
    ('Rafale', 15),
    ('Scénic', 15),
    ('Spider', 15),
    ('Symbioz', 15),
    ('Talisman', 15),
    ('Trafic', 15),
    ('Twingo', 15),
    ('Twizy', 15),
    ('Vel Satis', 15),
    ('Wind', 15),
    ('Zoe', 15),
    ('Sonstige', 15),
    ('Alhambra', 16),
    ('Altea', 16),
    ('Altea XL', 16),
    ('Arona', 16),
    ('Arosa', 16),
    ('Ateca', 16),
    ('Cordoba', 16),
    ('Cupra', 16),
    ('Exeo', 16),
    ('Ibiza', 16),
    ('Leon', 16),
    ('Mii', 16),
    ('Tarraco', 16),
    ('Toledo', 16),
    ('Sonstige', 16),
    ('Citigo', 17),
    ('Enyaq', 17),
    ('Fabia', 17),
    ('Favorit', 17),
    ('Felicia', 17),
    ('Kamiq', 17),
    ('Karoq', 17),
    ('Kodiaq', 17),
    ('Octavia', 17),
    ('Rapid', 17),
    ('Roomster', 17),
    ('Scala', 17),
    ('Superb', 17),
    ('Yeti', 17),
    ('Sonstige', 17),
    ('Across', 18),
    ('Alto', 18),
    ('Baleno', 18),
    ('Carry', 18),
    ('Celerio', 18),
    ('Ignis', 18),
    ('Jimny', 18),
    ('Kizashi', 18),
    ('Liana', 18),
    ('S-Cross', 18),
    ('SJ 413', 18),
    ('SX4', 18),
    ('SX4 S-Cross', 18),
    ('Samurai', 18),
    ('Splash', 18),
    ('Swace', 18),
    ('Swift', 18),
    ('Vitara', 18),
    ('Wagon R+', 18),
    ('Sonstige', 18),
    ('4-Runner', 19),
    ('Auris', 19),
    ('Avensis', 19),
    ('Aygo', 19),
    ('C-HR', 19),
    ('Camry', 19),
    ('Carina', 19),
    ('Celica', 19),
    ('Corolla', 19),
    ('Corolla Cross', 19),
    ('Crown', 19),
    ('GR86', 19),
    ('GT86', 19),
    ('Hi Ace', 19),
    ('Highlander', 19),
    ('IQ', 19),
    ('Land Cruiser', 19),
    ('MR2', 19),
    ('Mirai', 19),
    ('Paseo', 19),
    ('Previa', 19),
    ('Prius', 19),
    ('Proace', 19),
    ('RAV4', 19),
    ('Starlet', 19),
    ('Supra Katarga', 19),
    ('Urban Cruiser', 19),
    ('Verso', 19),
    ('Yaris', 19),
    ('Yaris Cross', 19),
    ('bZ4X', 19),
    ('Sonstige', 19),
    ('Arteon', 20),
    ('Beetle', 20),
    ('Bora', 20),
    ('Caddy', 20),
    ('Caravelle', 20),
    ('Corrado', 20),
    ('Crafter', 20),
    ('Eos', 20),
    ('Fox', 20),
    ('Golf', 20),
    ('ID. Buzz', 20),
    ('ID.3', 20),
    ('ID.4', 20),
    ('ID.5', 20),
    ('ID.7', 20),
    ('Jetta', 20),
    ('Käfer', 20),
    ('LT', 20),
    ('Lupo', 20),
    ('Multivan', 20),
    ('Passat', 20),
    ('Passat CC', 20),
    ('Phaeton', 20),
    ('Polo', 20),
    ('Scirocco', 20),
    ('Sharan', 20),
    ('Shuttle', 20),
    ('T-Cross', 20),
    ('T-Roc', 20),
    ('T1', 20),
    ('T2', 20),
    ('T3', 20),
    ('T4', 20),
    ('T5', 20),
    ('T6', 20),
    ('Taigo', 20),
    ('Tiguan', 20),
    ('Touareg', 20),
    ('Touran', 20),
    ('Vento', 20),
    ('Volkswagen CC', 20),
    ('e-up!', 20),
    ('up!', 20),
    ('Sonstige', 20),
    ('C30', 21),
    ('C40', 21),
    ('C70', 21),
    ('EC40', 21),
    ('EX30', 21),
    ('EX40', 21),
    ('EX90', 21),
    ('S40', 21),
    ('S60', 21),
    ('S70', 21),
    ('S80', 21),
    ('S90', 21),
    ('Serie 200', 21),
    ('Serie 400', 21),
    ('Serie 700', 21),
    ('Serie 800', 21),
    ('Serie 900', 21),
    ('V40', 21),
    ('V50', 21),
    ('V60', 21),
    ('V70', 21),
    ('V90', 21),
    ('XC40', 21),
    ('XC60', 21),
    ('XC70', 21),
    ('XC90', 21),
    ('Sonstige', 21);

INSERT INTO
    vehicle_models (name, mark_id)
VALUES
    ('Atlantic', 22),
    ('Caponord', 22),
    ('Classic', 22),
    ('Dorsoduro', 22),
    ('ETX', 22),
    ('Gulliver', 22),
    ('Habana', 22),
    ('Leonardo', 22),
    ('MX', 22),
    ('Mana', 22),
    ('Moto', 22),
    ('Pegaso', 22),
    ('RS', 22),
    ('RSV', 22),
    ('RX', 22),
    ('Rally', 22),
    ('SL', 22),
    ('SR', 22),
    ('SRV', 22),
    ('SX', 22),
    ('SXV', 22),
    ('Scarabeo', 22),
    ('Shiver', 22),
    ('Sportcity', 22),
    ('Tuareg', 22),
    ('Tuono', 22),
    ('Sonstige', 22),
    ('Atlantis', 23),
    ('Boulevard', 23),
    ('DXR', 23),
    ('GPR', 23),
    ('Hunter', 23),
    ('Mulhacen', 23),
    ('Predator', 23),
    ('Rambla', 23),
    ('Senda', 23),
    ('Terra', 23),
    ('Variant', 23),
    ('X-Race', 23),
    ('X-Treme', 23),
    ('Sonstige', 23),
    ('Diavel', 24),
    ('Hypermotard', 24),
    ('Monster', 24),
    ('Multistrada', 24),
    ('Panigale', 24),
    ('Scrambler', 24),
    ('Streetfighter', 24),
    ('SuperSport', 24),
    ('Sonstige', 24),
    ('CVO', 25),
    ('Dyna', 25),
    ('Electra', 25),
    ('Nightster', 25),
    ('Pan America', 25),
    ('Pan America Special', 25),
    ('Panhead', 25),
    ('RA 1250 Pan America', 25),
    ('RA1250S Pan America Special', 25),
    ('RH1250S Sportster S', 25),
    ('Road Glide', 25),
    ('Road King', 25),
    ('Softail', 25),
    ('Sportster', 25),
    ('Sportster S', 25),
    ('Street Glide', 25),
    ('Street Rod', 25),
    ('V-Rod', 25),
    ('Sonstige', 25),
    ('ADV350', 26),
    ('CB', 26),
    ('CBF', 26),
    ('CBR', 26),
    ('CBX', 26),
    ('CR', 26),
    ('CRF', 26),
    ('CTX', 26),
    ('Forza', 26),
    ('GL', 26),
    ('Goldwing', 26),
    ('Hornet', 26),
    ('Integra', 26),
    ('Monkey', 26),
    ('NC', 26),
    ('NT', 26),
    ('NX', 26),
    ('PCX', 26),
    ('Pantheon', 26),
    ('SH', 26),
    ('Silverwing', 26),
    ('Super Cub', 26),
    ('Transalp', 26),
    ('VFR', 26),
    ('VT', 26),
    ('VTR', 26),
    ('Varadero', 26),
    ('X-ADV', 26),
    ('XL', 26),
    ('XR', 26),
    ('Sonstige', 26),
    ('701', 27),
    ('CR', 27),
    ('EE', 27),
    ('FC', 27),
    ('FE', 27),
    ('Norden', 27),
    ('Svartpilen 125', 27),
    ('Svartpilen 401', 27),
    ('TC', 27),
    ('TE', 27),
    ('Vitpilen', 27),
    ('Vitpilen 401', 27),
    ('Vitpilen 701', 27),
    ('WR', 27),
    ('Sonstige', 27),
    ('EL', 28),
    ('EN', 28),
    ('ER', 28),
    ('Eliminator', 28),
    ('Estrella', 28),
    ('GPX', 28),
    ('GPZ', 28),
    ('J 300', 28),
    ('KFX', 28),
    ('KL', 28),
    ('KLE', 28),
    ('KLR', 28),
    ('KLX', 28),
    ('KX', 28),
    ('Ninja', 28),
    ('VN', 28),
    ('Versys', 28),
    ('Vulcan', 28),
    ('Z', 28),
    ('ZR', 28),
    ('ZRX', 28),
    ('ZX', 28),
    ('ZZR', 28),
    ('Sonstige', 28),
    ('1050', 29),
    ('1190', 29),
    ('125', 29),
    ('1290', 29),
    ('200', 29),
    ('250', 29),
    ('300', 29),
    ('350', 29),
    ('380', 29),
    ('390', 29),
    ('400', 29),
    ('450', 29),
    ('50', 29),
    ('500', 29),
    ('520', 29),
    ('525', 29),
    ('530', 29),
    ('540', 29),
    ('600', 29),
    ('620', 29),
    ('625', 29),
    ('640', 29),
    ('660', 29),
    ('690', 29),
    ('790', 29),
    ('790 Duke', 29),
    ('85', 29),
    ('890', 29),
    ('950', 29),
    ('990', 29),
    ('Adventure', 29),
    ('Duke', 29),
    ('EXC', 29),
    ('EXC-F', 29),
    ('Freeride', 29),
    ('Freeride E-SM', 29),
    ('Freeride E-SX', 29),
    ('Freeride E-XC', 29),
    ('Hobby', 29),
    ('Ponny', 29),
    ('RC', 29),
    ('SMC', 29),
    ('SX', 29),
    ('SX-F', 29),
    ('Super Duke', 29),
    ('XC-W', 29),
    ('Sonstige', 29),
    ('Beverly', 30),
    ('Carnaby', 30),
    ('Diesis', 30),
    ('Fly', 30),
    ('Free', 30),
    ('GTS', 30),
    ('Hexagon', 30),
    ('Liberty', 30),
    ('MP3', 30),
    ('Medley', 30),
    ('NRG', 30),
    ('Primavera', 30),
    ('Sfera', 30),
    ('Skipper', 30),
    ('Typhoon', 30),
    ('X10', 30),
    ('X7', 30),
    ('X9', 30),
    ('Zip', 30),
    ('Sonstige', 30),
    ('125', 31),
    ('175', 31),
    ('200', 31),
    ('250', 31),
    ('Cobra', 31),
    ('DS', 31),
    ('Lido', 31),
    ('MC', 31),
    ('MS', 31),
    ('MV', 31),
    ('Maxi', 31),
    ('Sonstige', 31),
    ('Bandit', 32),
    ('Burgman', 32),
    ('CS', 32),
    ('DR', 32),
    ('DR-Z', 32),
    ('GN', 32),
    ('GS', 32),
    ('GSR', 32),
    ('GSX', 32),
    ('GSX-R', 32),
    ('GT', 32),
    ('Intruder', 32),
    ('Katana', 32),
    ('LS', 32),
    ('LT', 32),
    ('Marauder', 32),
    ('RF', 32),
    ('RG', 32),
    ('RM', 32),
    ('RMX', 32),
    ('RV', 32),
    ('SV', 32),
    ('TL', 32),
    ('TU', 32),
    ('V-Strom', 32),
    ('VL', 32),
    ('VR', 32),
    ('VS', 32),
    ('VZ', 32),
    ('XF', 32),
    ('Sonstige', 32),
    ('Bonneville', 33),
    ('Bonneville Bobber', 33),
    ('Bonneville Speedmaster', 33),
    ('Bonneville T120', 33),
    ('Daytona', 33),
    ('Rocket', 33),
    ('Scrambler', 33),
    ('Speed Four', 33),
    ('Speed Triple', 33),
    ('Speed Triple RS 1200', 33),
    ('Speed Twin', 33),
    ('Speedmaster', 33),
    ('Sprint', 33),
    ('Street Triple', 33),
    ('TT', 33),
    ('Thruxton', 33),
    ('Thunderbird', 33),
    ('Tiger', 33),
    ('Tiger 900 Rally Pro', 33),
    ('Trident', 33),
    ('Trident 660', 33),
    ('Trophy', 33),
    ('Sonstige', 33),
    ('125', 34),
    ('150', 34),
    ('180', 34),
    ('200', 34),
    ('ET', 34),
    ('Elettrica', 34),
    ('GS', 34),
    ('GT', 34),
    ('GTS', 34),
    ('GTV', 34),
    ('LX', 34),
    ('P', 34),
    ('PK', 34),
    ('PX', 34),
    ('Primavera', 34),
    ('Sprint', 34),
    ('Sonstige', 34),
    ('Aerox', 35),
    ('BT', 35),
    ('BW', 35),
    ('Bop', 35),
    ('Breeze', 35),
    ('Cygnus', 35),
    ('Delight', 35),
    ('DT', 35),
    ('FJ', 35),
    ('FJR', 35),
    ('FZ', 35),
    ('FZR', 35),
    ('FZS', 35),
    ('FZX', 35),
    ('GTS', 35),
    ('Grizzly', 35),
    ('MT', 35),
    ('Majesty', 35),
    ('NMAX', 35),
    ('Neos', 35),
    ('Niken', 35),
    ('PW', 35),
    ('RD', 35),
    ('SR', 35),
    ('T-Max', 35),
    ('TDM', 35),
    ('TDR', 35),
    ('TRX', 35),
    ('TT', 35),
    ('TTR', 35),
    ('TW', 35),
    ('TX', 35),
    ('TZR', 35),
    ('Tracer', 35),
    ('Tricity', 35),
    ('V-Max', 35),
    ('Virago', 35),
    ('WR', 35),
    ('Wolverine', 35),
    ('X-City', 35),
    ('X-Max', 35),
    ('XC', 35),
    ('XJ', 35),
    ('XJR', 35),
    ('XS', 35),
    ('XSR', 35),
    ('XT', 35),
    ('XTZ', 35),
    ('XV', 35),
    ('XVS', 35),
    ('XVZ', 35),
    ('Xenter', 35),
    ('YBR', 35),
    ('YFM', 35),
    ('YFZ', 35),
    ('YP', 35),
    ('YXR', 35),
    ('YZ', 35),
    ('YZF', 35),
    ('Sonstige', 35),
    ('C 600', 36),
    ('C 650', 36),
    ('C evolution', 36),
    ('C1', 36),
    ('C400', 36),
    ('F 650', 36),
    ('F 700', 36),
    ('F 750', 36),
    ('F 800', 36),
    ('F 850', 36),
    ('F 900', 36),
    ('F 900 R', 36),
    ('F 900 XR', 36),
    ('G 310 GS', 36),
    ('G 310 R', 36),
    ('G 650', 36),
    ('K 100', 36),
    ('K 1100', 36),
    ('K 1200', 36),
    ('K 1300', 36),
    ('K 1600', 36),
    ('K 75', 36),
    ('R 100', 36),
    ('R 1100', 36),
    ('R 1150', 36),
    ('R 1200', 36),
    ('R 1250', 36),
    ('R 1300 GS', 36),
    ('R 18', 36),
    ('R NineT', 36),
    ('S 1000', 36),
    ('Sonstige', 36),
    ('Sonstige', 37),
    ('Sonstige', 38);