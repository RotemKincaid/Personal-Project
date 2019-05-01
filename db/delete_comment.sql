delete from comment 
where comment_id = $1;

select username, profile_pic, post_id, post_content, file, comment.created_at, comment.user_post, comment, comment_id, to_char(post.created_at, 'FX Month DD Day HH24:MI:SS') as created_at from post 
join users on (users.user_id = post.user_post)
join comment on (comment.user_post = post.post_id)
where post_id = $2;