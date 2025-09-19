const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "David", age: 21 },
  { name: "Cathy", age: 15 },
  
  { name: "Eva", age: 13 }
];

// Lọc teen (13–19) và map thành chuỗi "Name (Age)"
const teens = people
  .filter(p => p.age >= 13 && p.age <= 19)
  .map(p => `(${p.name}) co (${p.age})`);

// In ra từng dòng
teens.forEach(t => console.log(t));

//Sắp xếp theo tên 
const sortedByName = [...people].sort((a, b) => a.name.localeCompare(b.name));
console.log("Sorted by name:");
sortedByName.forEach(p => console.log(`${p.name} (${p.age})`));