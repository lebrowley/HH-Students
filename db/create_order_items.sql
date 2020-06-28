INSERT INTO order_items_join 
(order_id, item_id, quantity, in_cart)
VALUES
($1, $2, $3, $4);