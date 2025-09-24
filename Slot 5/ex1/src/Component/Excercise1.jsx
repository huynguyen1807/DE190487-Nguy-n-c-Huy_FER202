 function Excercise1() {

    // Tính ham double
    const double = (x) => {
      return x * 2;
    }

    // Kiểm tả chẵn lẻ
    const iseven = (x) => {
      return x % 2 === 0;
    }

  return (
    <div>
      <h1>Excercise 1</h1>
      <b>Kết quả hàm Double(5): {double(5)}</b>
        
      <p>Kết quả hàm iseven(4): {iseven(4) ? "true" : "false"}</p>
      <p>Kết quả hàm iseven(5): {iseven(5) ? "true" : "false"}</p>
    </div>
  );
}
export default Excercise1;