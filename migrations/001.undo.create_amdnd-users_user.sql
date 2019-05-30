ALTER TABLE amdnd_users 
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS amdnd_users;