DROP TABLE IF EXISTS person CASCADE;

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  person_name VARCHAR(255) NOT NULL,
  date_of_todo VARCHAR(255) NOT NULL,
  todo_title VARCHAR(255) NOT NULL
);

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  todo_text VARCHAR(255) NOT NULL,
  
);