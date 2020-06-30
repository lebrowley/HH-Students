SELECT * FROM order_info oi
JOIN order_items_join oij ON oi.order_id = oij.order_id
JOIN menu_info mi ON mi.item_id = oij.item_id
JOIN menus m ON m.menu_id = mi.menu_id
WHERE oi.user_id = $1;
