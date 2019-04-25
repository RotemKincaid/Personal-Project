drop table if exists users;
drop table if exists post;
drop table if exists comment;


create table users(
    user_id serial primary key,
    username varchar(40),
    email text,
    hashed_password text,
    full_name varchar(64),
    talent text,
    genre text
);


create table post(
    post_id serial primary key,
    post_content text,
    file text,
    created_at timestamp default current_timestamp,
    user_post int references users(user_id)
);


create table comment(
    comment_id serial primary key,
    comment text,
    created_at timestamp default current_timestamp,
    user_id int references users(user_id),
    user_post int references post(post_id)
);