//2.check if a string conains a search text
const search = '';
const message = 'Hello JavaScript';

const searchMessage = (search) => {
    console.log(message.indexOf(search) >= 0);
}
searchMessage("Hello")
searchMessage("go")