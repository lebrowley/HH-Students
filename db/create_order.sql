INSERT INTO order_info
(user_id, saved_order, completed_order, total)
VALUES
($1, $2, $3, $4);

UPDATE order_info
SET saved_order = false
WHERE saved_order IS NULL;

SELECT * FROM order_info
ORDER BY order_id DESC;
