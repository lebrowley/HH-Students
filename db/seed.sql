CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(250)
);

-- CREATE TABLE user_payment (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFRENCES users(user_id),
--     card_num INT,
--     card_exp DATE,
--     card_code INT,
--     card_type VARCHAR(50),
--     first_name VARCHAR(50),
--     last_name VARCHAR(50),
--     billing_address VARCHAR(150),
--     zip_code INT 
-- );

CREATE TABLE menus (
    menu_id SERIAL PRIMARY KEY,
    menu_name VARCHAR(50)
);

CREATE TABLE menu_info (
    item_id SERIAL PRIMARY KEY,
    menu_id REFERENCES menus(menu_id),
    item_name VARCHAR(75),
    item_price FLOAT,
    item_description VARCHAR(200)
);

CREATE TABLE order_info (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    item_id INT REFERENCES menu_info(item_id),
    quantity INT,
    order_instructions VARCHAR(500)
);

CREATE TABLE users_orders_join (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    order_id INT REFERENCES order_info(order_id)
);


INSERT INTO menus
(menu_name)
VALUES
('pat''s pizza'),
('taco timmy''s'),
('burger bros'),
('daily donuts'),
('soups n'' salads'),
('rockin ramen');


INSERT INTO menu_info
(menu_id, item_name, item_price, item_description)
VALUES
(1, 'chucky', 2, 'cheese'),
(1, 'margaret', 3, 'mozzarella, tomatoes, basil'),
(1, 'pepe', 4, 'pepperoni'),
(1, 'the patty', 5, 'corned beef, potatoes, cabbage'),
(2, 'something''s fishy', 3.50, 'two fish tacos'),
(2, 'surf and turf', 4, 'one steak taco, one fish taco'),
(2, 'watch your tongue', 3, 'two lenua tacos'),
(2, 'squeeeshed taco', 2.5, 'quesadilla'),
(3, 'the classic', 4, 'cheese, tomato, lettuce'),
(3, 'the freshman 15', 15, '15 patties. ''Nuf said'),
(3, 'the bacon bomb', 8, 'double patties, double bacon'),
(3, 'legal shrooms', 7, 'sauteed mushrooms, carmelized onions'),
(4, 'o''canada', 2, 'maple glazed, canadian bacon bits'),
(4, 'viva la revolucion', 2, 'cinnamon sugar'),
(4, 'clotted arteries', 2, 'cream filled'),
(4, 'why so jelly', 2, 'raspberry-lemon jelly filled'),
(5, 'soup du jour', 3, 'soup of the day'),
(5, 'family special', 5, 'clam chowder'),
(5, 'hail caesar', 3, 'caesar salad'),
(5, 'super pollo', 5, 'chef''s salad, fried chicken'),
(6, 'the osaka', 6, 'classic ramen, egg'),
(6, 'the seoul', 7, 'classic ramen, kimchi'),
(6, 'the mumbai', 8, 'classic ramen, curry spice'),
(6, 'the beijing', 9, 'classic ramen, dumplings');