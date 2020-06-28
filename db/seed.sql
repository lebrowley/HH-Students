CREATE TABLE menus (
    menu_id SERIAL PRIMARY KEY,
    menu_name VARCHAR(50)
    menu_description VARCHAR(250)
);

CREATE TABLE menu_info (
    item_id SERIAL PRIMARY KEY,
    menu_id INT REFERENCES menus(menu_id),
    item_name VARCHAR(75),
    item_price FLOAT,
    item_description VARCHAR(200)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(250)
);

CREATE TABLE orders_info (     -- insert new info; this is where order history and current order can be accessed (just select all the orders under the wanted user_id and then order the rows by most recent and limit to the past 5 or so orders)
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    item_id INT REFERENCES menu_info(item_id),  --provides access to menu_info- item_name, item_price, item_description??
    quantity INT,
    total INT,
    saved_order BOOLEAN,  -- default false; true if saved; could be a comleted order or an order in the cart
    in_cart BOOLEAN, -- false is means it has been removed from cart; true means it's in cart and pending
    completed_order BOOLEAN --will be true when in_cart is false; will be false when in_cart is true
); 


-- CREATE TABLE user_stripe_payment (
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



INSERT INTO users
(email, password)
VALUES
('test@test.com', 1);

INSERT INTO menus
(menu_name, menu_description)
VALUES
('pat''s pizza', 'single slices, fast, hot, fresh'),
('taco timmy''s', 'specialty mexican food'),
('burger bros', 'best burgers in town'),
('daily donuts', 'donuts as big as your face'),
('soups n'' salads', 'made from scratch daily'),
('rockin ramen', 'ramen bowls with regional add ons'),
('vegan eats', 'meat eaters beware'),
('quenched', 'big thirst big drinks'),
('popcorn picks', 'get your pop on'); 


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
(6, 'the beijing', 9, 'classic ramen, dumplings'),
(7, 'portabello sandwich', 6, 'grilled portabello with honey mustard'),
(7, 'the cheesesteak', 5, 'soy steak, veggies, vegan cheese'),
(7, 'tofu shish kabob', 4, 'marinated tofu, grilled veggies, pineapple'),
(7, 'drunken noodles', 6, 'noodles, veggies, spicy peanut sauce'),
(8, 'strawberry daiquiri', 3, 'strawberries, lemon-lime soda'),
(8, 'kiwi punch', 3, 'kiwis, fruit punch'),
(8, 'kombucha', 3, 'blueberry mint'),
(8, 'banana milk', 3, 'banana milkshake'),
(9, 'chicago mix', 1, 'cheddar and caramel mix'),
(9, 'boston mix', 1, 'kettle corn, chocolate drizzle'),
(9, 'wisconsin mix', 1, 'white cheddar'),
(9, 'salt lake mix', 1, 'honey butter');