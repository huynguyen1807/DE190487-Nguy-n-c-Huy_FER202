const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
const total = ages.reduce((a,b) => a + b, 0 );
console.log(total);

const min = Math.min(...ages);
console.log(min);

const stats = ages.reduce(
  (acc, age) => {
    // Tổng
    acc.total += age;

    // Min & Max
    acc.min = Math.min(acc.min, age);
    acc.max = Math.max(acc.max, age);

    // Buckets
    if (age >= 13 && age <= 19) {
      acc.buckets.teen += 1;
    } else if (age >= 20) {
      acc.buckets.adult += 1;
    }

    return acc;
  },
  {
    total: 0,
    min: Infinity,
    max: -Infinity,
    buckets: { teen: 0, adult: 0 }
  }
);
// const result = reason;
console.log(stats);
//In kết quả
// const stats = ages.reduce((acc, age) => { ... }, { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } });
// const stats = ages.reduce((acc, age) => { ... }, { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } });
console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log("Buckets:", stats.buckets);
