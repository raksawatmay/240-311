//Program calculate discount percentage <%>
let stdin = process.openStdin()
console.log("Normal Price: ")
stdin.addListener("data",(p) => {
    var price = p.toString().trim()
    console.log("Discount percentage<%>: ")
    stdin.addListener("data",(d) => {
        var discount = d.toString().trim()
        console.log("Reduced Price:",Result(p,d) + "Bath.")
        stdin.end()
    })
});

var Result = (p,d) => {
    let Price = p*d/100
    return  p-Price
}