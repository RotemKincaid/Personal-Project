update users 
set full_name = $1, talent = $2, genre = $3, influence = $4, profile_pic = $5
where user_id = $6;