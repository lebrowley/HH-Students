UPDATE users
SET email = $2
WHERE user_id = $1;

UPDATE users
SET password = $3
WHERE user_id = $1;

SELECT * FROM users
WHERE user_id = $1;