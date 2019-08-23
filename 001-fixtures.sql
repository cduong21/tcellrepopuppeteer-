INSERT INTO posts(
    url,
    numComments,
    body,
    votes,
    author,
    other
 )VALUES
   ('www.hehe.com', 
   '5 comments', 
   'balls', 
   '5 votes', 
   'Mr. Beans', 
   '[
      {
        "id": 23635,
        "name": "Jerry Green",
        "comment": "Imported from facebook."
      },
      {
        "id": 23636,
        "name": "John Wayne",
        "comment": "Imported from facebook."
      }
    ]' 
);

INSERT INTO comments (
    post_id,
    body,
    reply_count,
    writer,
    sentiment,
    secterms
) VALUES 
    (1,
    'randomcomment',
    '7 comments',
    'noobpwner69',
    '3.2342',
    '[
      {
        "id": 23635,
        "name": "Jerry Green",
        "comment": "Imported from facebook."
      },
      {
        "id": 23636,
        "name": "John Wayne",
        "comment": "Imported from facebook."
      }
    ]' 
);


--   ('Stephen', NULL, 'King', 's.king', md5('password'), FALSE),
--   ('Peter', NULL, 'Parker', 'p.parker', md5('spidey'), FALSE);

-- INSERT INTO students (name) VALUES
--   ('Chuck'), ('James'), ('Thor'), ('Clint'),
--   ('Richie'), ('Bill'), ('Ben'), ('Eddie');

-- INSERT INTO courses (title, description) VALUES
--   ('Math', '2+2 = 5'),
--   ('Grammar', 'Wi learn haw tu write korektli'),
--   ('Physics', 'E=mc^2');

-- INSERT INTO marks(student_id, course_id, points) VALUES
--   (1, 1, 4), (1, 1, 5), (1, 1, 3), (1, 1, 4),
--   (1, 2, 2), (1, 2, 3), (1, 3, 5), (1, 3, 5);
