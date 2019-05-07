select username, profile_pic_cloud, post_id, post_content, file, comment.created_at, comment.user_post, comment, comment_id, to_char(post.created_at, 'FX Month DD Day HH24:MI:SS') as created_at from post  
join users on (post.user_post = users.user_id)
join comment on (comment.user_post = post.post_id)
where users.user_id = $1;