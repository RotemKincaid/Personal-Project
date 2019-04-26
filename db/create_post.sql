insert into post (post_content, file, user_post)
values ($1, $2, $3);

select * from post;