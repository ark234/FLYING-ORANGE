\c chewsy_db
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  counter INTEGER,
  profile_table VARCHAR(32)
);

DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  health_table VARCHAR(32),
  balanced BOOLEAN,
  high_fiber BOOLEAN,
  high_protein BOOLEAN,
  low_carb BOOLEAN,
  low_fat BOOLEAN,
  low_sodium BOOLEAN,
  alcohol_free BOOLEAN,
  celery_free BOOLEAN,
  crustacean_free BOOLEAN,
  dairy_free BOOLEAN,
  egg_free BOOLEAN,
  fish_free BOOLEAN,
  gluten_free BOOLEAN,
  kidney_friendly BOOLEAN,
  kosher BOOLEAN
);

DROP TABLE IF EXISTS health_ref CASCADE;

CREATE TABLE health_ref (
  id BIGSERIAL PRIMARY KEY,
  TYPE VARCHAR(8),
  web_label VARCHAR(32),
  api_label VARCHAR(32),
  description VARCHAR(255),
  ingredients_table VARCHAR(32)
);

DROP TABLE IF EXISTS egg_free_ref CASCADE;

CREATE TABLE egg_free_ref (
  id BIGSERIAL PRIMARY KEY,
  ingredient VARCHAR(255)
);

DROP TABLE IF EXISTS recipes_user CASCADE;

CREATE TABLE recipes_user (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  recipe_label VARCHAR(128),
  recipe_img VARCHAR(255),
  recipe_text VARCHAR(255)
);

