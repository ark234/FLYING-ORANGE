ool-ad0200c8:chewsy ailavinda$ psql
psql (10.1)
Type "help" for help.

ailavinda=# \l
                                        List of databases
        Name         |   Owner   | Encoding |   Collate   |    Ctype    |    Access privileges    
---------------------+-----------+----------+-------------+-------------+-------------------------
 ailavinda           | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 auth_beer_list_lab  | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 beer_list           | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 book_list           | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 carmen              | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 cheese_db           | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 cheeses_db          | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 chewsy_db_test      | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 express_passport    | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 find_the_book       | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 find_the_book_test  | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 hogwarts_crud       | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 movies_lab_db       | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 pokemon             | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 postgres            | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 shortstack_starwars | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 sql_intro           | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 sql_testing         | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0           | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/ailavinda           +
                     |           |          |             |             | ailavinda=CTc/ailavinda
 template1           | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/ailavinda           +
                     |           |          |             |             | ailavinda=CTc/ailavinda
 todos_list          | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 tweedr_dev          | ailavinda | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
(22 rows)

ailavinda=# \c chewsy_db_test
You are now connected to database "chewsy_db_test" as user "ailavinda".
chewsy_db_test=# 
chewsy_db_test=# 
chewsy_db_test=# \d
                    List of relations
 Schema |          Name           |   Type   |   Owner   
--------+-------------------------+----------+-----------
 public | health_label_ref        | table    | ailavinda
 public | health_label_ref_id_seq | sequence | ailavinda
 public | label_ingred_ref        | table    | ailavinda
 public | label_ingred_ref_id_seq | sequence | ailavinda
 public | profiles                | table    | ailavinda
 public | profiles_id_seq         | sequence | ailavinda
 public | recipes_user            | table    | ailavinda
 public | recipes_user_id_seq     | sequence | ailavinda
 public | users                   | table    | ailavinda
 public | users_id_seq            | sequence | ailavinda
(10 rows)

chewsy_db_test=# \d+ health_label_ref
                                                             Table "public.health_label_ref"
      Column       |          Type          | Collation | Nullable |                   Default                    | Storage  | Stats target | Description 
-------------------+------------------------+-----------+----------+----------------------------------------------+----------+--------------+-------------
 id                | bigint                 |           | not null | nextval('health_label_ref_id_seq'::regclass) | plain    |              | 
 type              | character varying(8)   |           |          |                                              | extended |              | 
 web_label         | character varying(32)  |           |          |                                              | extended |              | 
 api_label         | character varying(32)  |           |          |                                              | extended |              | 
 description       | character varying(255) |           |          |                                              | extended |              | 
 ingredients_table | character varying(32)  |           |          | ' '::character varying                       | extended |              | 
Indexes:
    "health_label_ref_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "label_ingred_ref" CONSTRAINT "label_ingred_ref_health_id_fkey" FOREIGN KEY (health_id) REFERENCES health_label_ref(id)

chewsy_db_test=# \d+ label_ingred_ref
                                                          Table "public.label_ingred_ref"
   Column   |          Type          | Collation | Nullable |                   Default                    | Storage  | Stats target | Description 
------------+------------------------+-----------+----------+----------------------------------------------+----------+--------------+-------------
 id         | bigint                 |           | not null | nextval('label_ingred_ref_id_seq'::regclass) | plain    |              | 
 health_id  | integer                |           |          |                                              | plain    |              | 
 api_label  | character varying(32)  |           |          |                                              | extended |              | 
 ingredient | character varying(255) |           |          |                                              | extended |              | 
Indexes:
    "label_ingred_ref_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "label_ingred_ref_health_id_fkey" FOREIGN KEY (health_id) REFERENCES health_label_ref(id)

chewsy_db_test=# \d+ users
                                                               Table "public.users"
     Column      |            Type             | Collation | Nullable |              Default              | Storage  | Stats target | Description 
-----------------+-----------------------------+-----------+----------+-----------------------------------+----------+--------------+-------------
 id              | bigint                      |           | not null | nextval('users_id_seq'::regclass) | plain    |              | 
 email           | character varying           |           | not null |                                   | extended |              | 
 password_digest | character varying           |           | not null |                                   | extended |              | 
 counter         | integer                     |           |          |                                   | plain    |              | 
 signedup_on     | timestamp without time zone |           |          | CURRENT_TIMESTAMP                 | plain    |              | 
 profiles_table  | character varying(32)       |           |          |                                   | extended |              | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "profiles" CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
    TABLE "recipes_user" CONSTRAINT "recipes_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

chewsy_db_test=# 
chewsy_db_test=# 
chewsy_db_test=# \d+ profiles
                                                            Table "public.profiles"
     Column      |         Type          | Collation | Nullable |               Default                | Storage  | Stats target | Description 
-----------------+-----------------------+-----------+----------+--------------------------------------+----------+--------------+-------------
 id              | bigint                |           | not null | nextval('profiles_id_seq'::regclass) | plain    |              | 
 user_id         | integer               |           |          |                                      | plain    |              | 
 health_table    | character varying(32) |           |          |                                      | extended |              | 
 balanced        | boolean               |           |          | false                                | plain    |              | 
 high_fiber      | boolean               |           |          | false                                | plain    |              | 
 high_protein    | boolean               |           |          | false                                | plain    |              | 
 low_carb        | boolean               |           |          | false                                | plain    |              | 
 low_fat         | boolean               |           |          | false                                | plain    |              | 
 low_sodium      | boolean               |           |          | false                                | plain    |              | 
 alcohol_free    | boolean               |           |          | false                                | plain    |              | 
 celery_free     | boolean               |           |          | false                                | plain    |              | 
 crustacean_free | boolean               |           |          | false                                | plain    |              | 
 dairy_free      | boolean               |           |          | false                                | plain    |              | 
 egg_free        | boolean               |           |          | false                                | plain    |              | 
 fish_free       | boolean               |           |          | false                                | plain    |              | 
 gluten_free     | boolean               |           |          | false                                | plain    |              | 
 kidney_friendly | boolean               |           |          | false                                | plain    |              | 
 kosher          | boolean               |           |          | false                                | plain    |              | 
 low_potassium   | boolean               |           |          | false                                | plain    |              | 
 lupine_free     | boolean               |           |          | false                                | plain    |              | 
 mustard_free    | boolean               |           |          | false                                | plain    |              | 
 no_oil_added    | boolean               |           |          | false                                | plain    |              | 
 low_sugar       | boolean               |           |          | false                                | plain    |              | 
 paleo           | boolean               |           |          | false                                | plain    |              | 
 peanut_free     | boolean               |           |          | false                                | plain    |              | 
 pescatarian     | boolean               |           |          | false                                | plain    |              | 
 pork_free       | boolean               |           |          | false                                | plain    |              | 
 red_meat_free   | boolean               |           |          | false                                | plain    |              | 
 sesame_free     | boolean               |           |          | false                                | plain    |              | 
 shellfish_free  | boolean               |           |          | false                                | plain    |              | 
 soy_free        | boolean               |           |          | false                                | plain    |              | 
 sugar_conscious | boolean               |           |          | false                                | plain    |              | 
 tree_nut_free   | boolean               |           |          | false                                | plain    |              | 
 vegan           | boolean               |           |          | false                                | plain    |              | 
 vegetarian      | boolean               |           |          | false                                | plain    |              | 
 wheat_free      | boolean               |           |          | false                                | plain    |              | 
Indexes:
    "profiles_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)


chewsy_db_test=# 


chewsy_db=# \d+ recipes_user
                                                            Table "public.recipes_user"
     Column      |          Type          | Collation | Nullable |                 Default                  | Storage  | Stats target | Description 
-----------------+------------------------+-----------+----------+------------------------------------------+----------+--------------+-------------
 id              | bigint                 |           | not null | nextval('recipes_user_id_seq'::regclass) | plain    |              | 
 user_id         | integer                |           |          |                                          | plain    |              | 
 recipe_uri      | character varying(255) |           |          |                                          | extended |              | 
 recipe_img_url  | character varying(255) |           |          |                                          | extended |              | 
 recipe_name     | character varying(255) |           |          |                                          | extended |              | 
 recipe_hlth_lbl | character varying(255) |           |          |                                          | extended |              | 
 recipe_comment  | character varying(511) |           |          |                                          | extended |              | 
 recipe_rating   | integer                |           |          |                                          | plain    |              | 
Indexes:
    "recipes_user_pkey" PRIMARY KEY, btree (id)
    "recipes_user_recipe_uri_key" UNIQUE CONSTRAINT, btree (recipe_uri)
Foreign-key constraints:
    "recipes_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

chewsy_db=#



ool-ad0200c8:chewsy ailavinda$ psql -d chewsy_db_test -f ./db/schema.sql
You are now connected to database "chewsy_db_test" as user "ailavinda".
psql:./db/schema.sql:29: NOTICE:  drop cascades to 2 other objects
DETAIL:  drop cascades to constraint profiles_user_id_fkey on table profiles
drop cascades to constraint recipes_user_user_id_fkey on table recipes_user
DROP TABLE
CREATE TABLE
DROP TABLE
CREATE TABLE
psql:./db/schema.sql:101: NOTICE:  drop cascades to constraint label_ingred_ref_health_id_fkey on table label_ingred_ref
DROP TABLE
CREATE TABLE
DROP TABLE
CREATE TABLE
DROP TABLE
CREATE TABLE
ool-ad0200c8:chewsy ailavinda$ psql -d chewsy_db_test -f ./db/seeds.sql
INSERT 0 33
INSERT 0 55
ool-ad0200c8:chewsy ailavinda$



ool-ad0200c8:chewsy ailavinda$ psql
psql (10.1)
Type "help" for help.

ailavinda=# \c chewsy_db_test
You are now connected to database "chewsy_db_test" as user "ailavinda".
chewsy_db_test=# 
chewsy_db_test=# 
chewsy_db_test=# SELECT * FROM health_label_ref;
 id |  type  |    web_label    |    api_label    |                                                                     description                                                                     | ingredients_table 
----+--------+-----------------+-----------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+-------------------
  1 | Diet   | Balanced        | balanced        | Protein/Fat/Carb values in 15/35/50 ratio                                                                                                           |  
  2 | Diet   | High-Fiber      | high-fiber      | More than 5g fiber per serving                                                                                                                      |  
  3 | Diet   | High-Protein    | high-protein    | More than 50% of total calories from proteins                                                                                                       |  
  4 | Diet   | Low-Carb        | low-carb        | Less than 20% of total calories from carbs                                                                                                          |  
  5 | Diet   | Low-Fat         | low-fat         | Less than 15% of total calories from fat                                                                                                            |  
  6 | Diet   | Low-Sodium      | low-sodium      | Less than 140mg Na per serving                                                                                                                      |  
  7 | Health | Alcohol-free    | alcohol-free    | No alcohol used or contained                                                                                                                        |  
  8 | Health | Celery-free     | celery-free     | Does not contain celery or derivatives                                                                                                              | label_ingred_ref
  9 | Health | Crustacean-free | crustacean-free | Does not contain crustaceans (shrimp, lobster etc.) or derivatives                                                                                  | label_ingred_ref
 10 | Health | Dairy           | dairy-free      | No dairy; no lactose                                                                                                                                | label_ingred_ref
 11 | Health | Eggs            | egg-free        | No eggs or products containing eggs                                                                                                                 | label_ingred_ref
 12 | Health | Fish            | fish-free       | No fish or fish derivatives                                                                                                                         | label_ingred_ref
 13 | Health | Gluten          | gluten-free     | No ingredients containing gluten                                                                                                                    | label_ingred_ref
 14 | Health | Kidney friendly | kidney-friendly | Per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium: less than 500 mg                                               |  
 15 | Health | Kosher          | kosher          | Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves                |  
 16 | Health | Low potassium   | low-potassium   | Less than 150mg per serving                                                                                                                         |  
 17 | Health | Lupine-free     | lupine-free     | Does not contain lupine or derivatives                                                                                                              |  
 18 | Health | Mustard-free    | mustard-free    | Does not contain mustard or derivatives                                                                                                             |  
 19 | Health | No oil added    | no-oil-added    | No oil added except to what is contained in the basic ingredients                                                                                   |  
 20 | Health | No-sugar        | low-sugar       | No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose                                                                |  
 21 | Health | Paleo           | paleo           | Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils |  
 22 | Health | Peanuts         | peanut-free     | No peanuts or products containing peanuts                                                                                                           | label_ingred_ref
 23 | Health | Pescatarian     | pescatarian     | Does not contain meat or meat based products, can contain dairy and fish                                                                            |  
 24 | Health | Pork-free       | pork-free       | Does not contain pork or derivatives                                                                                                                |  
 25 | Health | Red meat-free   | red-meat-free   | Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat                            |  
 26 | Health | Sesame-free     | sesame-free     | Does not contain sesame seed or derivatives                                                                                                         | label_ingred_ref
 27 | Health | Shellfish       | shellfish-free  | No shellfish or shellfish derivatives                                                                                                               | label_ingred_ref
 28 | Health | Soy             | soy-free        | No soy or products containing soy                                                                                                                   | label_ingred_ref
 29 | Health | Sugar-conscious | sugar-conscious | Less than 4g of sugar per serving                                                                                                                   |  
 30 | Health | Tree Nuts       | tree-nut-free   | No tree nuts or products containing tree nuts                                                                                                       | label_ingred_ref
 31 | Health | Vegan           | vegan           | No meat, poultry, fish, dairy, eggs or honey                                                                                                        |  
 32 | Health | Vegetarian      | vegetarian      | No meat, poultry, or fish                                                                                                                           |  
 33 | Health | Wheat-free      | wheat-free      | No wheat, can have gluten though                                                                                                                    | label_ingred_ref
(33 rows)

chewsy_db_test=#

chewsy_db_test=# 
chewsy_db_test=# SELECT * FROM label_ingred_ref;
 id | health_id |  api_label  |        ingredient         
----+-----------+-------------+---------------------------
  1 |        10 | dairy-free  | Butter
  2 |        10 | dairy-free  | Butter fat
  3 |        10 | dairy-free  | Butter oil
  4 |        10 | dairy-free  | Butter acid
  5 |        10 | dairy-free  | Butter ester
  6 |        10 | dairy-free  | Buttermilk
  7 |        10 | dairy-free  | Casein
  8 |        10 | dairy-free  | Casein hydrolysate
  9 |        10 | dairy-free  | Caseinates (in all forms)
 10 |        10 | dairy-free  | Cheese
 11 |        10 | dairy-free  | Cottage cheese
 12 |        10 | dairy-free  | Cream
 13 |        10 | dairy-free  | Curds
 14 |        10 | dairy-free  | Custard
 15 |        10 | dairy-free  | Diacetyl
 16 |        10 | dairy-free  | Ghee
 17 |        10 | dairy-free  | Half-and-half
 18 |        10 | dairy-free  | Lactalbumin
 19 |        10 | dairy-free  | Lactalbumin phosphate
 20 |        10 | dairy-free  | Lactoferrin
 21 |        10 | dairy-free  | Lactose
 22 |        10 | dairy-free  | Milk
 23 |        10 | dairy-free  | Milk protein hydrolysate
 24 |        10 | dairy-free  | Pudding
 25 |        10 | dairy-free  | Recaldent(R)
 26 |        10 | dairy-free  | Rennet casein
 27 |        10 | dairy-free  | Sour cream
 28 |        10 | dairy-free  | Sour cream solids
 29 |        10 | dairy-free  | Sour milk solids
 30 |        10 | dairy-free  | Tagatose
 31 |        10 | dairy-free  | Whey (in all forms)
 32 |        10 | dairy-free  | Whey protein hydrolysate
 33 |        10 | dairy-free  | Yogurt
 34 |        11 | egg-free    | Albumin
 35 |        11 | egg-free    | Albumen
 36 |        11 | egg-free    | Egg
 37 |        11 | egg-free    | Egg dried
 38 |        11 | egg-free    | Egg powdered
 39 |        11 | egg-free    | Egg solids
 40 |        11 | egg-free    | Egg white
 41 |        11 | egg-free    | Egg yolk
 42 |        11 | egg-free    | Eggnog
 43 |        11 | egg-free    | Lysozyme
 44 |        11 | egg-free    | Mayonnaise
 45 |        11 | egg-free    | Meringue
 46 |        11 | egg-free    | Meringue powder
 47 |        11 | egg-free    | Ovalbumin
 48 |        11 | egg-free    | Surimi
 49 |        22 | peanut-free | Arachis oil
 50 |        22 | peanut-free | Peanut oil
 51 |        22 | peanut-free | Artificial nuts
 52 |        22 | peanut-free | Beer nuts
 53 |        22 | peanut-free | Cold-pressed peanut oil
 54 |        22 | peanut-free | Expelled peanut oil
 55 |        22 | peanut-free | Extruded peanut oil
(55 rows)

chewsy_db_test=#

chewsy_db=# INSERT INTO users (email, password_digest, counter, profiles_table ) 
chewsy_db-# VALUES
chewsy_db-# ('alavinda@hotmail.com', 'ABCDEFabcdefABCDEFabcdefABCDEFab', 0, 'profiles') 
chewsy_db-# RETURNING id;
 id 
----
  1
(1 row)

INSERT 0 1
chewsy_db=# SELECT * FROM users;
 id |        email         |         password_digest          | counter |        signedup_on         | profiles_table 
----+----------------------+----------------------------------+---------+----------------------------+----------------
  1 | alavinda@hotmail.com | ABCDEFabcdefABCDEFabcdefABCDEFab |       0 | 2018-02-20 23:24:14.781538 | profiles
(1 row)

chewsy_db=#


chewsy_db=# INSERT INTO recipes_user (user_id, recipe_uri, recipe_url, recipe_img_url, recipe_label, recipe_hlth_lbl, recipe_comment, recipe_rating) VALUES (1, 'http://www.edamam.com/ontologies/edamam.owl#recipe_3921adf30bb0c9736b9ac30f447f8a63', 'http://www.saveur.com/article/Recipes/Roast-Beef', 'https://www.edamam.com/web-img/98a/98aa5d5cc0d88b28c2b9221a099b1a14.jpg', 'Roast Beef', 'Sugar-Conscious, Peanut-Free, Tree-Nut-Free, Alcohol-Free', '***', 5) RETURNING id;
 id 
----
  2
(1 row)

INSERT 0 1
chewsy_db=# SELECT * FROM recipes_user;
 id | user_id |                                     recipe_uri                                      |                    recipe_url                    |                             recipe_img_url                              | recipe_label |                      recipe_hlth_lbl                      | recipe_comment | recipe_rating 
----+---------+-------------------------------------------------------------------------------------+--------------------------------------------------+-------------------------------------------------------------------------+--------------+-----------------------------------------------------------+----------------+---------------
  2 |       1 | http://www.edamam.com/ontologies/edamam.owl#recipe_3921adf30bb0c9736b9ac30f447f8a63 | http://www.saveur.com/article/Recipes/Roast-Beef | https://www.edamam.com/web-img/98a/98aa5d5cc0d88b28c2b9221a099b1a14.jpg | Roast Beef   | Sugar-Conscious, Peanut-Free, Tree-Nut-Free, Alcohol-Free | ***            |             5
(1 row)

chewsy_db=#