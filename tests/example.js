const LuxDB = require('../index');

// Load/Create the database
const luxdb = new LuxDB('cache/testdb.json');
// luxdb.clear()  // Remove every data from the file

// Set a new 'table' called cars
luxdb.set('cars', [])
    .point('cars')  // Pointing is ALWAYS needed
    .push({id: 1, width: 1700, height: 1000, weight: 1922})  // Add instances of cars
    .push({id: 2, width: 1950, height: 1233, weight: 2203})
    .push({id: 3, width: 1725, height: 1065, weight: 1922});

// Set a new 'table' called planes
luxdb.point('.')  // Set back the pointer for new table creation
    .set('planes', [])
    .point('planes')
    .push({id: 1, width: 9_235, height: 7544, weight: 10_000})
    .push({id: 2, width: 13_457, height: 5332, weight: 10_000})
    .push({id: 3, width: 17_324, height: 4264, weight: 10_000});

luxdb.save();  // Save changes to the disk

// Search with one attribute
let query = luxdb.point('cars').get({id: 2})
console.log(query);
// Prints: [ { id: 2, width: 1950, height: 1233, weight: 2203 } ]

// Search for multiple values
query = luxdb.get({weight: 1922})
console.log(query);
// Prints:
//  [
//    { id: 1, width: 1700, height: 1000, weight: 1922 },
//    { id: 3, width: 1725, height: 1065, weight: 1922 }
//  ]

// Search with a function
luxdb.point('.');
query = luxdb.point('planes').get(e => e['weight'] === 10_000)
console.log(query);
// Prints:
//  [
//    { id: 1, width: 9235, height: 7544, weight: 10000 },
//    { id: 2, width: 13457, height: 5332, weight: 10000 },
//    { id: 3, width: 17324, height: 4264, weight: 10000 }
//  ]

// Seach for something non existent
query = luxdb.point('planes').get(e => e['weight'] !== 10_000)
console.log(query);
// Prints: []

// Update and check the change
console.log("\n");
console.log("Originals:", luxdb.point('.').point('planes').get({weight: 10_000}))
luxdb.update({weight: 10_000}, {weight: 9000})
console.log("Updated:", luxdb.point('.').point('planes').get({weight: 9000}))
console.log("\n");
/* Prints:
Originals: [
  { id: 1, width: 9235, height: 7544, weight: 10000 },
  { id: 2, width: 13457, height: 5332, weight: 10000 },
  { id: 3, width: 17324, height: 4264, weight: 10000 }
]
Updated: [
  { id: 1, width: 9235, height: 7544, weight: 9000 },
  { id: 2, width: 13457, height: 5332, weight: 9000 },
  { id: 3, width: 17324, height: 4264, weight: 9000 }
]
*/

//luxdb.point('.').point('planes');
//luxdb.conf({id: luxdb.CONF_AUTO_INCREMENT});
