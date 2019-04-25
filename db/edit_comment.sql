update comment
set comment = $2
where comment_id = $1;
select * from comment;