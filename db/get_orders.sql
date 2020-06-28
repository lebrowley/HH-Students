SELECT * 
FROM orders_info oi JOIN menu_info mi
ON oi.item_id = mi.item_id
WHERE oi.user_id = $1;