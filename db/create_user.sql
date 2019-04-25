insert into users(username, email, hashed_password)
values ($1, $2, $3)
returning *;