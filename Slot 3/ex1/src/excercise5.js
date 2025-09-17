const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "Cathy", age: 15 },
  { name: "David", age: 21 },
  { name: "Eva", age: 13 }
];

// Lọc teen (13–19) và map thành chuỗi "Name (Age)"
const teens = people
  .filter(p => p.age >= 13 && p.age <= 19)
  .map(p => `${p.name} (${p.age})`);

// In ra từng dòng
teens.forEach(t => console.log(t));
