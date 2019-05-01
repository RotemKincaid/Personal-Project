delete from post where post_id = $1;
select username, profile_pic, post_id, post_content, file,  to_char(created_at, 'FX Month DD Day HH24:MI:SS') as created_at from post
join users
on (users.user_id = post.user_post);