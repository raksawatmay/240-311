//Program change Temperature (Celsius to Fahrenheit)
let stdin = process.openStdin()
console.log("Enter Temperature <°C>: ")
stdin.addListener("data", (C) => {
    var Far =  C.toString().trim()
    console.log('Fahrenheit <°F>: ' + changeTmp(Far))
    stdin.end()
 });
 
var changeTmp = (Far) => {
    return Far*1.8+32;
}