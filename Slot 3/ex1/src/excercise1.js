const double = (x) => x * 2;
console.log(double(7)); // 14

//Cách viết khác
//Có { } thì phải có return
//Không có { } thì không cần return
const double2 = (x) => {return x * 2;}
console.log(double2(7)); // Should print 14

const isEven = (x) => {return x % 2 === 0;}
console.log(isEven(7)); // Should print false

const isEven2 = (x) => x % 2 === 0;
console.log(isEven2(7)); // false