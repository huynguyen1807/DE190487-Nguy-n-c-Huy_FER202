// Hàm tính tổng
const sum = (...nums) => {
  return nums
    .filter(n => typeof n === "number" && !isNaN(n)) // lọc bỏ NaN và string
    .reduce((acc, val) => acc + val, 0);
};

// Hàm tính trung bình
const avg = (...nums) => {
  const validNums = nums.filter(n => typeof n === "number" && !isNaN(n));
  if (validNums.length === 0) return 0;
  const total = validNums.reduce((acc, val) => acc + val, 0);
  return (total / validNums.length).toFixed(2); // 2 chữ số thập phân
};

// Test
console.log(sum(1, 2, 3));        // 6
console.log(sum(1, "x", 4));      // 5
console.log(avg(1, 2, 3, 4));     // "2.50"
console.log(avg());               // 0