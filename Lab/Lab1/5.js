//5.use .filter to create a new array that does not contain null value
const arr = [1, 3, 4, 5, null, 2, null, -4, null];
//output 1, 3, 4, 5, 2, -4];
const Ansarr = arr.filter((cutnumArr) => {
    return cutnumArr !== null;
});
console.log(Ansarr);