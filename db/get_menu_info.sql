SELECT * 
FROM menu_info mi JOIN menus m
ON mi.menu_id = m.menu_id
WHERE mi.menu_id = $1; 