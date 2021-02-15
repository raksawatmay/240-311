//Program Find the area of ​​a triangle 
let stdin = process.openStdin()
console.log("High: ")
stdin.addListener("data",(high) => {
    var h = high.toString().trim()
    console.log("Weight: ")
    stdin.addListener("data",(weight) => {
        var w = weight.toString().trim()
        console.log('Area: ' + Area(h,w))
        stdin.end()
    })
});

var Area = (h,w) => {
    return 0.5*h*w
}