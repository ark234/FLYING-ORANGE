INSERT INTO health_label_ref (type, web_label, api_label, description, ingredients_table) 
VALUES
  ('Diet', 'Balanced',  'balanced',  'Protein/Fat/Carb values in 15/35/50 ratio', ' '),
  ('Diet', 'High-Fiber',  'high-fiber',  'More than 5g fiber per serving', ' '),
  ('Diet', 'High-Protein',  'high-protein',  'More than 50% of total calories from proteins', ' '),
  ('Diet', 'Low-Carb',  'low-carb',  'Less than 20% of total calories from carbs', ' '),
  ('Diet', 'Low-Fat',  'low-fat',  'Less than 15% of total calories from fat', ' '),
  ('Diet', 'Low-Sodium',  'low-sodium',  'Less than 140mg Na per serving', ' '),
  ('Health', 'Alcohol-free',  'alcohol-free',  'No alcohol used or contained', ' '),
  ('Health', 'Celery-free',  'celery-free',  'Does not contain celery or derivatives', 'label_ingred_ref'),
  ('Health', 'Crustacean-free',  'crustacean-free',  'Does not contain crustaceans (shrimp, lobster etc.) or derivatives', 'label_ingred_ref'),
  ('Health', 'Dairy',  'dairy-free',  'No dairy; no lactose', 'label_ingred_ref'),    
  ('Health', 'Eggs',  'egg-free',  'No eggs or products containing eggs', 'label_ingred_ref'),
  ('Health', 'Fish',  'fish-free', 'No fish or fish derivatives', 'label_ingred_ref'),
  ('Health', 'Gluten',  'gluten-free', 'No ingredients containing gluten', 'label_ingred_ref'),
  ('Health', 'Kidney friendly', 'kidney-friendly', 'Per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium: less than 500 mg', ' '),
  ('Health', 'Kosher',  'kosher',  'Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves', ' '),
  ('Health', 'Low potassium', 'low-potassium', 'Less than 150mg per serving', ' '),
  ('Health', 'Lupine-free', 'lupine-free', 'Does not contain lupine or derivatives', ' '),
  ('Health', 'Mustard-free',  'mustard-free',  'Does not contain mustard or derivatives', ' '),
  ('Health', 'No oil added',  'no-oil-added',  'No oil added except to what is contained in the basic ingredients', ' '),
  ('Health', 'No-sugar',  'low-sugar', 'No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose', ' '),
  ('Health', 'Paleo', 'paleo', 'Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils', ' '),
  ('Health', 'Peanuts', 'peanut-free', 'No peanuts or products containing peanuts', 'label_ingred_ref'),
  ('Health', 'Pescatarian', 'pescatarian', 'Does not contain meat or meat based products, can contain dairy and fish', ' '),
  ('Health', 'Pork-free', 'pork-free', 'Does not contain pork or derivatives', ' '),
  ('Health', 'Red meat-free', 'red-meat-free', 'Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat', ' '),
  ('Health', 'Sesame-free', 'sesame-free', 'Does not contain sesame seed or derivatives', 'label_ingred_ref'),
  ('Health', 'Shellfish', 'shellfish-free',  'No shellfish or shellfish derivatives', 'label_ingred_ref'),
  ('Health', 'Soy', 'soy-free',  'No soy or products containing soy', 'label_ingred_ref'), 
  ('Health', 'Sugar-conscious', 'sugar-conscious', 'Less than 4g of sugar per serving', ' '),
  ('Health', 'Tree Nuts', 'tree-nut-free', 'No tree nuts or products containing tree nuts', 'label_ingred_ref'),
  ('Health', 'Vegan', 'vegan', 'No meat, poultry, fish, dairy, eggs or honey', ' '),
  ('Health', 'Vegetarian', 'vegetarian', 'No meat, poultry, or fish', ' '),
  ('Health', 'Wheat-free', 'wheat-free', 'No wheat, can have gluten though', 'label_ingred_ref');


INSERT INTO label_ingred_ref (health_id, api_label, ingredient) 
VALUES
  ('10', 'dairy-free', 'Butter'),
  ('10', 'dairy-free', 'Butter fat'),
  ('10', 'dairy-free', 'Butter oil'),
  ('10', 'dairy-free', 'Butter acid'),
  ('10', 'dairy-free', 'Butter ester'),
  ('10', 'dairy-free', 'Buttermilk'),
  ('10', 'dairy-free', 'Casein'),
  ('10', 'dairy-free', 'Casein hydrolysate'),
  ('10', 'dairy-free', 'Caseinates (in all forms)'),
  ('10', 'dairy-free', 'Cheese'),
  ('10', 'dairy-free', 'Cottage cheese'),
  ('10', 'dairy-free', 'Cream'),
  ('10', 'dairy-free', 'Curds'),
  ('10', 'dairy-free', 'Custard'),
  ('10', 'dairy-free', 'Diacetyl'),
  ('10', 'dairy-free', 'Ghee'),
  ('10', 'dairy-free', 'Half-and-half'),
  ('10', 'dairy-free', 'Lactalbumin'),
  ('10', 'dairy-free', 'Lactalbumin phosphate'),
  ('10', 'dairy-free', 'Lactoferrin'),
  ('10', 'dairy-free', 'Lactose'),
  ('10', 'dairy-free', 'Milk'),
  ('10', 'dairy-free', 'Milk protein hydrolysate'),
  ('10', 'dairy-free', 'Pudding'),
  ('10', 'dairy-free', 'Recaldent(R)'),
  ('10', 'dairy-free', 'Rennet casein'),
  ('10', 'dairy-free', 'Sour cream'),
  ('10', 'dairy-free', 'Sour cream solids'),
  ('10', 'dairy-free', 'Sour milk solids'),
  ('10', 'dairy-free', 'Tagatose'),
  ('10', 'dairy-free', 'Whey (in all forms)'),
  ('10', 'dairy-free', 'Whey protein hydrolysate'),
  ('10', 'dairy-free', 'Yogurt'),
  ('11', 'egg-free', 'Albumin'),
  ('11', 'egg-free', 'Albumen'),
  ('11', 'egg-free', 'Egg'),
  ('11', 'egg-free', 'Egg dried'),
  ('11', 'egg-free', 'Egg powdered'),
  ('11', 'egg-free', 'Egg solids'),
  ('11', 'egg-free', 'Egg white'),
  ('11', 'egg-free', 'Egg yolk'),
  ('11', 'egg-free', 'Eggnog'),
  ('11', 'egg-free', 'Lysozyme'),
  ('11', 'egg-free', 'Mayonnaise'),
  ('11', 'egg-free', 'Meringue'),
  ('11', 'egg-free', 'Meringue powder'),
  ('11', 'egg-free', 'Ovalbumin'),
  ('11', 'egg-free', 'Surimi'),
  ('22', 'peanut-free', 'Arachis oil'),
  ('22', 'peanut-free', 'Peanut oil'),
  ('22', 'peanut-free', 'Artificial nuts'),
  ('22', 'peanut-free', 'Beer nuts'),
  ('22', 'peanut-free', 'Cold-pressed peanut oil'),
  ('22', 'peanut-free', 'Expelled peanut oil'),
  ('22', 'peanut-free', 'Extruded peanut oil');


INSERT INTO users (email, password_digest ) 
VALUES
('flastname-1@coldmail.com', 'ABCDEFabcdefABCDEFabcdefABCDEFab'), 
('flastname-2@warmmail.com', 'FFFFFFabcdefABCDEFabcdefABCDEFab'),
('flastname-3@lukemail.com', 'FFFFFFccccccABCDEFabcdefABCDEFab')

RETURNING id;


INSERT INTO recipes_user (user_id, recipe_uri, recipe_url, recipe_img_url, recipe_label, recipe_hlth_lbl, recipe_comment, recipe_rating)
VALUES 
 (1, 'http://www.edamam.com/ontologies/edamam.owl#recipe_3921adf30bb0c9736b9ac30f447f8a63', 'http://www.saveur.com/article/Recipes/Roast-Beef', 'https://www.edamam.com/web-img/98a/98aa5d5cc0d88b28c2b9221a099b1a14.jpg', 'Roast Beef', 'Sugar-Conscious, Peanut-Free, Tree-Nut-Free, Alcohol-Free', '***', 5),
 (1, 'http://www.edamam.com/ontologies/edamam.owl#recipe_3da1169eb633a5e4607890ebf7dee89f', 'http://www.seriouseats.com/recipes/2012/08/grilled-butterflied-chicken-recipe.html', 'https://www.edamam.com/web-img/7a2/7a2f41a7891e8a8f8a087a96930c6463.jpg', 'Grilled Butterflied Chicken Recipe', 'Sugar-Conscious, Peanut-Free, Tree-Nut-Free, Alcohol-Free', '=====', 7),
 (3, 'http://www.edamam.com/ontologies/edamam.owl#recipe_3921adf30bb0c9736b9ac30f447f8a63', 'http://www.saveur.com/article/Recipes/Roast-Beef', 'https://www.edamam.com/web-img/98a/98aa5d5cc0d88b28c2b9221a099b1a14.jpg', 'Roast Beef', 'Sugar-Conscious, Peanut-Free, Tree-Nut-Free, Alcohol-Free', '***', 5),
 (1, 'http://www.edamam.com/ontologies/edamam.owl#recipe_8275bb28647abcedef0baaf2dcf34f8b', 'http://norecipes.com/recipe/chicken-paprikash/', 'https://www.edamam.com/web-img/e12/e12b8c5581226d7639168f41d126f2ff.jpg', 'Chicken Paprikash', 'Peanut-Free, Tree-Nut-Free, Alcohol-Free', '++++++++++', 8)
RETURNING id;
  