const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
// Destructuring
const [first, , third = 0, ...restAges] = ages;

console.log(first);      
console.log(third);     
console.log(restAges); 

const isEven = (first) => first % 2 === 0;
console.log(isEven(first));

const isEven2 = (restAges) => restAges % 2 === 0;   
console.log(isEven2(restAges));

const numbereven = (restAges) => {
  return restAges.filter(n => n % 2 === 0);
}
numbereven(restAges).forEach(t => console.log(t));
