CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  numComments TEXT NOT NULL,
  body TEXT NOT NULL,
  votes TEXT NOT NULL,
  author TEXT NOT NULL,
  other jsonb
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY, 
  post_id INTEGER REFERENCES posts(id),
  body TEXT NOT NULL,
  reply_count TEXT NOT NULL,
  writer TEXT NOT NULL, 
  sentiment TEXT NOT NULL,
  secterms jsonb
);

--ALTER TABLE comments ADD FOREIGN KEY (post_id) REFERENCES posts(id);

--   last_name TEXT NOT NULL,
--   username TEXT NOT NULL,
--   pwd_hash TEXT NOT NULL,
--   is_admin BOOLEAN DEFAULT FALSE\c



-- CREATE TABLE comments (
--   id SERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   description TEXT
-- );
-- CREATE UNIQUE INDEX CONCURRENTLY ON comments USING BTREE (title);


-- CREATE TABLE marks (
--   id SERIAL PRIMARY KEY,
--   date TIMESTAMP WITH TIME ZONE DEFAULT now(),
--   student_id INTEGER NOT NULL,
--   course_id INTEGER NOT NULL,
--   points INTEGER NOT NULL
-- );

-- ALTER TABLE marks ADD FOREIGN KEY (student_id) REFERENCES students(id);
-- ALTER TABLE marks ADD FOREIGN KEY (course_id) REFERENCES courses(id);

-- CREATE TABLE course_reviews (
--   id SERIAL PRIMARY KEY,
--   date TIMESTAMP WITH TIME ZONE DEFAULT now(),
--   course_id INTEGER NOT NULL,
--   review_text TEXT
-- );

-- ALTER TABLE course_reviews ADD FOREIGN KEY (course_id) REFERENCES courses (id);
