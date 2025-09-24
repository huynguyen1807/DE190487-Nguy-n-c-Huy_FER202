function Excercise2() {
    // Tạo ra mảng số nguyên, in ra danh sách list các số nguyên trong mảng
    const num = [1, 12, -3, 16, 20, -33, 7, 8, 9, 10];
    //Tính tổng các phần tử trong mảng
    const sum = num.reduce((acc, curr) => acc + curr, 0);
    console.log("Tổng các số trong mảng là:", sum);

    //Tính trung bình các phần tử trong mảng
    const avg = sum / num.length;
    console.log("Trung bình cộng các số trong mảng là:", avg);
    
    // Khai báo chuỗi names, in ra list các tên trong mảng theo thứ tự tăng dần anphabet
    const names = ["An", "Bình", "Cường", "Dũng", "Huy", "Minh", "Nam", "Quân", "Tuấn", "Vinh"];
    names.sort();
    console.log("Danh sách tên theo thứ tự tăng dần:", names);

    // Khai báo mảng đối tượng students gồm các thuộc tính id, name, age, grade
    // In ra danh sách học sinh
    // Sắp xếp danh sách học sinh theo điểm giảm dần
    // Tính điểm trung bình của tất cả học sinh
    // In ra danh sách học sinh có điểm trên trung bình
    const students = [
      {id: 1, name: "An", age: 18, grade: 10},
        {id: 2, name: "Bình", age: 19, grade: 9},   
        {id: 3, name: "Cường", age: 17, grade: 8},
        {id: 4, name: "Dũng", age: 20, grade: 7.5},
        {id: 5, name: "Huy", age: 18, grade: 6},
        {id: 6, name: "Minh", age: 19, grade: 5},
        {id: 7, name: "Nam", age: 17, grade: 4},
        {id: 8, name: "Quân", age: 20, grade: 3},
        {id: 9, name: "Tuấn", age: 18, grade: 2},
        {id: 10, name: "Vinh", age: 19, grade: 1},
    ];

    //In ra danh sách học sinh
    console.log("Danh sách học sinh:", students);

    //In ra danh sách học sinh grade >= 7.5
    const aboveAverageStudents = students.filter(student => student.grade >= 7.5);
    console.log("Danh sách học sinh có điểm trên trung bình:", aboveAverageStudents);

    

    
  return (
    <div>
      <h1>Excercise 2</h1>
      <p>Số nguyên:</p>
      <ul>
        {num.map((number, index) => (
          <li key={index}>Phần tử thứ {index}-{number}</li>
        ))}
      </ul>
      <p>Tổng các số nguyên:  {sum}</p>

      <p>Trung bình cộng các số nguyên:  {avg}</p>

      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <p>Danh sách học sinh:</p>
      <ul>
        {students.map((student) => (
            <li key={student.id}>Id: {student.id} - Name: {student.name} - Age: {student.age} - Grade: {student.grade}</li>
        ))}
      </ul> 

      <p>Danh sách học sinh có điểm trên hoặc bằng 7.5:</p>
      <ul>
        {aboveAverageStudents.map((student) => (
            <li key={student.id}>Id: {student.id} - Name: {student.name} - Grade: {student.grade}</li>
        ))}
      </ul>
      <b> In ra danh sách students dưới dạng bảng  </b> 
      <p>Bảng students Grade lớn hơn 7.5</p>
        <table class="table" border="1">  
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {aboveAverageStudents.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.grade}</td>
                    </tr>   
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Trung bình Grade</td>
                    <td>{(aboveAverageStudents.reduce((acc, curr) => acc + curr.grade, 0) / aboveAverageStudents.length).toFixed(2)}</td>
                </tr>
            </tfoot>
        </table> 

    </div>
  );
}
export default Excercise2;