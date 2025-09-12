const re = (a, b) => a+b;
console.log (re(1,2));

let greet = (name, timeOfDay) => {
    console.log(`Good ${timeOfDay}, ${name}!`);

};
greet('Alicu', 'Monring')

greet('Alicu', 'd')

let square = num => {
    return num*num;
};

console.log(square(5));
console.log(square(8));

let sayHello = () => {
    console.log("Hello there");

};
sayHello();

let person  = {
    name: "Huy",
    age: 20,
    greet: () =>{
        console.log(`Hello everyone, my name ís ${this.name} and I am ${this.age} years old.`);
    }

};

let number = [1,2,3,4,5];


