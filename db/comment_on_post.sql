insert into comment(comment, user_id, user_post)
values($1, $2, $3);
select username, profile_pic_cloud, comment, comment_id, to_char(comment.created_at, 'FX Month DD Day HH24:MI:SS') as created_at from comment
join users on (users.user_id = comment.user_id)
where comment.user_post = $3;