insert into comment(comment, user_id, user_post)
values($1, $2, $3);
select * from comment;