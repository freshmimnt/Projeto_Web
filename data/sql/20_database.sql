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

-- Create table state
CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Create table delivery type
CREATE TABLE delivery_types (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Create table week_days
CREATE TABLE week_days (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Create table user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    img TEXT,
    location geography(Point, 4326),
    address text
);

-- Table: sellers
CREATE TABLE sellers (
    id SERIAL PRIMARY KEY,
    iban TEXT NOT NULL,
    delivery_radius INT NOT NULL,
    store_name TEXT NOT NULL,
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    seller_category_id INT REFERENCES seller_categories(id) ON DELETE CASCADE
);

-- Table: seller_working_days
CREATE TABLE seller_working_days (
    id SERIAL PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    seller_id INT REFERENCES sellers(id) ON DELETE CASCADE,
    week_day_id INT REFERENCES week_days(id) ON DELETE CASCADE
);

-- Create table product
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    price float NOT NULL,
	product_stock int not null,
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
	received_time TIME NOT NULL,
	received_date DATE NOT NULL,
	note text,
    users_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    states_id INT REFERENCES states(id) ON DELETE CASCADE,
    delivery_type_id INT REFERENCES delivery_types(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL,
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


--Values seller category
INSERT INTO seller_categories(name)
VALUES ('Agricultor');
INSERT INTO seller_categories (name)
VALUES ('Mercearia');
INSERT INTO seller_categories (name)
VALUES ('Talho');
INSERT INTO seller_categories (name)
VALUES ('Peixaria');

--Values product category
INSERT INTO product_categories (name)
VALUES ('Fruta');
INSERT INTO product_categories (name)
VALUES ('Legumes');

--Values state
INSERT INTO states (name)
VALUES ('Não entregue');
INSERT INTO states (name)
VALUES ('Entregue');

--Values delivery type
INSERT INTO delivery_types (name)
VALUES ('Pick-up');
INSERT INTO delivery_types (name)
VALUES ('Entrega ao domicílio');

--Values week days
INSERT INTO week_days (name) VALUES ('Domingo');
INSERT INTO week_days (name) VALUES ('Segunda-Feira');
INSERT INTO week_days (name) VALUES ('Terça-Feira');
INSERT INTO week_days (name) VALUES ('Quarta-Feira');
INSERT INTO week_days (name) VALUES ('Quinta-Feira');
INSERT INTO week_days (name) VALUES ('Sexta-Feira');
INSERT INTO week_days (name) VALUES ('Sábado');

--Value user
INSERT INTO users (name, phone, email, password, img, location, address)
VALUES ('João Alberto', '999999999', 'exemplo@gmail.com', 'password', 'imagemaleatoria.jpg', ST_GeographyFromText('SRID=4326;POINT(-9.14426 38.725427)'),'Rua Luciano Cordeiro 58, 1150-216 Lisbon, Portugal');
INSERT INTO users (name, phone, email, password, img, location, address)
VALUES ('Maria Helena', '988988988', 'helena@gmail.com', 'helna1234', 'helena.png', ST_GeomFromText('SRID=4326;POINT(-9.141427566357997 38.70844649701235)'), 'Rua Serpa Pinto 5E, 1200-442 Lisboa');
INSERT INTO users (name, phone, email, password, img, location, address)
VALUES ('Luís Fidalgo', '976123098', 'filfil@gmail.com', 'filamento010', 'filamento.jpg', ST_GeomFromText('SRID=4326;POINT(-9.147868891540814 38.74134554455972)'), 'Avenida de Berna 6, 1050-040 Lisboa');
INSERT INTO users (name, phone, email, password, img, location, address)
VALUES ('Ana Frederica', '901842700', 'anafefe@gmail.com', 'anafede123', 'imagem.jpeg', ST_GeomFromText('SRID=4326;POINT(-9.114450240930786 38.782189956772584)'), 'Rua Pedro Alvares Cabral 84, 2685-228 Moscavide');

-- Insert values for sellers
INSERT INTO sellers (iban, delivery_radius, store_name, opening_time, closing_time, users_id, seller_category_id)
VALUES ('PT50 0002 0123 1234 9567 2145 4', 50, 'Mercearia Fidalgo', '08:00', '18:00', 3, 2);
INSERT INTO sellers (iban, delivery_radius, store_name, opening_time, closing_time, users_id, seller_category_id)
VALUES ('PT50 0002 0123 1234 5678 9015 4', 20, 'Agricultora Helena', '10:00', '20:00', 2, 1);

-- Insert values for seller working days
INSERT INTO seller_working_days (start_time, end_time, seller_id, week_day_id)
VALUES ('09:00', '17:00', 1, 2);
INSERT INTO seller_working_days (start_time, end_time, seller_id, week_day_id)
VALUES ('09:00', '17:00', 1, 3);
INSERT INTO seller_working_days (start_time, end_time, seller_id, week_day_id)
VALUES ('09:00', '17:00', 1, 4);
INSERT INTO seller_working_days (start_time, end_time, seller_id, week_day_id)
VALUES ('08:00', '15:00', 1, 5);
INSERT INTO seller_working_days (start_time, end_time, seller_id, week_day_id)
VALUES ('11:00', '20:00', 2, 3);
INSERT INTO seller_working_days (start_time, end_time, seller_id, week_day_id)
VALUES ('10:00', '17:00', 2, 4);
INSERT INTO seller_working_days (start_time, end_time, seller_id, week_day_id)
VALUES ('09:00', '20:00', 2, 5);

--Value product
INSERT INTO products (name, price, product_stock, product_category_id, seller_id)
VALUES ('Maça de Alcobaça kg', '1.60',  1, 1);
INSERT INTO products (name, price, product_stock, product_category_id, seller_id)
VALUES ('Pera Rocha unidade', '0.50',  1, 2);
INSERT INTO products (name, price, product_stock, product_category_id, seller_id)
VALUES ('Couve Flor kg', '2',  2, 1);
INSERT INTO products (name, price, product_stock, product_category_id, seller_id)
VALUES ('Cenoura unidade', '0.55',  2, 2);

--Value review
INSERT INTO products (rating, comment, users_id, seller_id)
VALUES (4, '',  1, 2);
INSERT INTO products (rating, comment, users_id, seller_id)
VALUES (2, 'Produtos de péssima qualidade',  4, 1);