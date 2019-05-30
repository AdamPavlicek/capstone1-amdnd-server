CREATE TABLE amdnd_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
)

ALTER TABLE amdnd_users 
  ADD COLUMN
      user_id INTEGER REFERENCES amdnd_users(id)
      ON DELETE SET NULL;