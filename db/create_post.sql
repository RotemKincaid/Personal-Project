insert into post (post_content, file, user_post, cloudinary_url)
values ($1, $2, $3, $4);

select username, profile_pic_cloud, post_id, cloudinary_url, post_content, file,  to_char(created_at, 'FX Month DD Day HH24:MI:SS') as created_at from post
join users
on (users.user_id = post.user_post) order by created_at desc;