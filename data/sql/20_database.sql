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
	role TEXT NOT NULL DEFAULT 'buyer',
	iban TEXT,
	store_name TEXT,
	delivery_radius INT,
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
    user_seller_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Create table review
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    rating INT NOT NULL,
	comment text,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    user_seller_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Create table order
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    delivery_time TIME NOT NULL,
    delivery_date DATE NOT NULL,
    note text,
    state text DEFAULT 'não entregue',
    delivery_type text,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id int[] NOT NULL
);

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
VALUES ('João Alberto', '999999999', 'exemplo@gmail.com', 'password', '', ST_GeographyFromText('SRID=4326;POINT(-9.14426 38.725427)'),'Rua Luciano Cordeiro 58, 1150-216 Lisbon, Portugal');
INSERT INTO users (name, phone, email, password, img, location, address, role, iban, store_name, delivery_radius, seller_category_id)
VALUES ('Maria Helena', '988988988', 'helena@gmail.com', 'helna1234', '/uploads/seller_images/quinta.png', ST_GeomFromText('SRID=4326;POINT(-9.141427566357997 38.70844649701235)'), 'Rua Serpa Pinto 5E, 1200-442 Lisboa', 'seller' ,'PT50 0002 0123 1234 5678 9015 4', 'Agricultora Helena', 15, 1);
INSERT INTO users (name, phone, email, password, img, location, address, role, iban, store_name, delivery_radius, seller_category_id)
VALUES ('Luís Fidalgo', '976123098', 'filfil@gmail.com', 'adfwvcsdvsdv', '/uploads/seller_images/mercearia.jpg', ST_GeomFromText('SRID=4326;POINT(-9.147868891540814 38.74134554455972)'), 'Avenida de Berna 6, 1050-040 Lisboa', 'seller', 'PT50 0002 0123 1234 9567 2145 4', 'Mercearia Fidalgo', 25, 2);
INSERT INTO users (name, phone, email, password, img, location, address)
VALUES ('Ana Frederica', '901842700', 'anafefe@gmail.com', 'anafede123', '', ST_GeomFromText('SRID=4326;POINT(-9.114450240930786 38.782189956772584)'), 'Rua Pedro Alvares Cabral 84, 2685-228 Moscavide');

--Value product
INSERT INTO products (name, price, product_stock, img, product_category_id, user_seller_id)
VALUES ('Maça de Alcobaça kg', '1.60',  34, '/uploads/product_images/apple.jpg', 1, 1);

--Value review
INSERT INTO reviews (rating, comment, users_id, user_seller_id)
VALUES (2, 'Produtos de péssima qualidade',  4, 2);

--Value orders
INSERT INTO orders (delivery_time, delivery_date, note, delivery_type_id, users_id, product_id)
VALUES ('10:30:00', '2024-06-03', 'Deixar na portaria', 'Entrega ao Domicilio', 4, '{1}');
