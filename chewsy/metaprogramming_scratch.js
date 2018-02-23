// this is tims

 // const query = `INSERT INTO preferences ( user_id ,${arrayWhiteSpace}) VALUES ($1, ${$array}) ON CONFLICT (user_id) DO UPDATE SET ${arrayJoined};`;


// put this at the top of the model file
const allergyNames = [
  'balanced       ',
  'high_fiber     ',
  'high_protein   ',
  'low_carb       ',
  'low_fat        ',
  'low_sodium     ',
  'alcohol_free   ',
  'celery_free    ',
  'crustacean_free',
  'dairy_free     ',
  'egg_free       ',
  'fish_free      ',
  'gluten_free    ',
  'kidney_friendly',
  'kosher         ',
  'low_potassium  ',
  'lupine_free    ',
  'mustard_free   ',
  'no_oil_added   ',
  'low_sugar      ',
  'paleo          ',
  'peanut_free    ',
  'pescatarian    ',
  'pork_free      ',
  'red_meat_free  ',
  'sesame_free    ',
  'shellfish_free ',
  'soy_free       ',
  'sugar_conscious',
  'tree_nut_free  ',
  'vegan          ',
  'vegetarian     ',
  'wheat_free     '
].map(name => name.trim());

console.log('allergyNames:', allergyNames);

const query = 'UPDATE preferences SET (${allergies:name})=(${values:csv}) WHERE user_id=${userId}';

const pgp = require('pg-promise')();

// this comes from the client
const fakeDataFromClient = ['low_sugar', 'vegan'];

const valueArray = allergyNames.map(name => fakeDataFromClient.includes(name));

// so rather than pgp.as.format, do the pg-promise query
console.log('final query:', pgp.as.format(query, 
  {allergies: allergyNames, // array of strings
  userId: 587, // number
  values: valueArray // array of booleans
}));
