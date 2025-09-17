const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};

// Destructuring object lồng nhau
const { address: { street, city = "Unknown City" } } = person;

console.log(street); // "Lalaland 12"
console.log(city);   // "Unknown City"
