-- Create table seller category
CREATE TABLE seller_categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Create table product category
CREATE TABLE product_categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Create table user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    img TEXT,
    location geography(Point, 4326),
    address text,
	role TEXT NOT NULL DEFAULT 'buyer'
);

-- Create table sellers
CREATE TABLE sellers (
    id SERIAL PRIMARY KEY,
    iban TEXT NOT NULL,
    store_name TEXT NOT NULL,
	delivery_radius INT NOT NULL,
	img text,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    seller_category_id INT REFERENCES seller_categories(id) ON DELETE CASCADE
);

-- Create table product
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    price float NOT NULL,
	product_stock int not null,
	img text,
    product_category_id INT REFERENCES product_categories(id) ON DELETE CASCADE,
    seller_id INT REFERENCES sellers(id) ON DELETE CASCADE
);

-- Create table review
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    rating INT NOT NULL,
	comment text,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    seller_id INT REFERENCES sellers(id) ON DELETE CASCADE
);

-- Create table order
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    delivery_time TIME NOT NULL,
    delivery_date DATE NOT NULL,
    note text,
    state text DEFAULT 'não entregue',
    delivery_type_id text,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id int[] NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL,
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

--Values seller category
INSERT INTO seller_categories (name)
VALUES ('Agricultor');
INSERT INTO seller_categories (name)
VALUES ('Mercearia');
INSERT INTO seller_categories (name)
VALUES ('Talho');
INSERT INTO seller_categories (name)
VALUES ('Peixaria');

--Values product category
INSERT INTO product_categories (name)
VALUES ('Futa');
INSERT INTO product_categories (name)
VALUES ('Legumes');
INSERT INTO product_categories (name)
VALUES ('Carne');
INSERT INTO product_categories (name)
VALUES ('Bio');
INSERT INTO product_categories (name)
VALUES ('Conservas');
INSERT INTO product_categories (name)
VALUES ('Cabaz');
INSERT INTO product_categories (name)
VALUES ('Carne');
INSERT INTO product_categories (name)
VALUES ('Peixe');
INSERT INTO product_categories (name)
VALUES ('Vegan');
INSERT INTO product_categories (name)
VALUES ('Charcutaria');
INSERT INTO product_categories (name)
VALUES ('Laticínios');
INSERT INTO product_categories (name)
VALUES ('Congelados');
INSERT INTO product_categories (name)
VALUES ('Bebidas Alcoólicas');
INSERT INTO product_categories (name)
VALUES ('Água');
INSERT INTO product_categories (name)
VALUES ('Sumos e Refrigerantes');

--Value user
INSERT INTO users (name, phone, email, password, img, location, address)
VALUES ('João Alberto', '999999999', 'exemplo@gmail.com', 'password', 'imagemaleatoria.jpg', ST_GeographyFromText('SRID=4326;POINT(-9.14426 38.725427)'),'Rua Luciano Cordeiro 58, 1150-216 Lisbon, Portugal');
INSERT INTO users (name, phone, email, password, img, location, address, role)
VALUES ('Maria Helena', '988988988', 'helena@gmail.com', 'helna1234', '', ST_GeomFromText('SRID=4326;POINT(-9.141427566357997 38.70844649701235)'), 'Rua Serpa Pinto 5E, 1200-442 Lisboa', 'seller');
INSERT INTO users (name, phone, email, password, img, location, address, role)
VALUES ('Luís Fidalgo', '976123098', 'filfil@gmail.com', 'filamento010', '', ST_GeomFromText('SRID=4326;POINT(-9.147868891540814 38.74134554455972)'), 'Avenida de Berna 6, 1050-040 Lisboa', 'seller');
INSERT INTO users (name, phone, email, password, img, location, address)
VALUES ('Ana Frederica', '901842700', 'anafefe@gmail.com', 'anafede123', 'imagem.jpeg', ST_GeomFromText('SRID=4326;POINT(-9.114450240930786 38.782189956772584)'), 'Rua Pedro Alvares Cabral 84, 2685-228 Moscavide');

-- Insert values for sellers
INSERT INTO sellers (iban, store_name, delivery_radius, img, users_id, seller_category_id)
VALUES ('PT50 0002 0123 1234 5678 9015 4', 'Agricultora Helena', 15, '/uploads/seller_images/quinta.png', 2, 1);
INSERT INTO sellers (iban, store_name, delivery_radius,  img, users_id, seller_category_id)
VALUES ('PT50 0002 0123 1234 9567 2145 4', 25,'Mercearia Fidalgo', '/uploads/seller_images/mercearia.jpg', 3, 2);

INSERT INTO seller_working_days (seller_id, day_of_week, opening_time, closing_time)
VALUES
    (1, 1, '09:00:00', '13:00:00'),  -- Agricultora Helena, Monday (opens 9 AM, closes 1 PM)
    (1, 2, '15:00:00', '18:00:00'),  -- Agricultora Helena, Tuesday (opens 3 PM, closes 6 PM)
    (1, 3, '09:00:00', '13:00:00'),  -- Agricultora Helena, Wednesday
    (1, 4, '15:00:00', '18:00:00'),  -- Agricultora Helena, Thursday
    (1, 5, '09:00:00', '13:00:00'),  -- Agricultora Helena, Friday
    (2, 1, '08:00:00', '13:00:00'),  -- Mercearia Fidalgo, Monday
    (2, 2, '15:00:00', '19:00:00'),  -- Mercearia Fidalgo, Tuesday
    (2, 3, '08:00:00', '13:00:00'),  -- Mercearia Fidalgo, Wednesday
    (2, 4, '15:00:00', '19:00:00'),  -- Mercearia Fidalgo, Thursday
    (2, 5, '08:00:00', '13:00:00');  -- Mercearia Fidalgo, Friday

--Value product
INSERT INTO products (name, price, product_stock, img, product_category_id, seller_id)
VALUES ('Maça de Alcobaça kg', '1.60',  34, '/uploads/product_images/apple.jpg', 1, 1);

--Value review
INSERT INTO reviews (rating, comment, users_id, seller_id)
VALUES (2, 'Produtos de péssima qualidade',  4, 1);

--Value orders
INSERT INTO orders (delivery_time, delivery_date, note, delivery_type_id, users_id, product_id)
VALUES
  -- Orders for Agricultora Helena
  ('10:30:00', '2024-06-03', 'Deixar na portaria', 'Entrega ao Domicilio', 1, '{1,2}'),
  ('14:00:00', '2024-06-05', NULL, 'Entrega ao Domicilio', 4, '{3}'),

  -- Orders for Mercearia Fidalgo
  ('16:45:00', '2024-06-01', 'Tocar a campainha duas vezes', 'Entrega ao Domicilio', 1, '{4}'),
  ('11:00:00', '2024-06-07', 'Entregar ao vizinho', 'Pick-Up', 4, '{5, 6}');
     







