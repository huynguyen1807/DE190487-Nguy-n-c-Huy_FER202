export function Exercise3() {
const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
}
    return (
        <div className="exercise3-container">
            <h1>Exercise 3</h1>
            
            <p>Name: {person.name}</p>
            <p>Street: {person.address.street}</p>
        </div>
    );
}
export default Exercise3;