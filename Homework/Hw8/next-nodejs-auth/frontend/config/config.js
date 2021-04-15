
const LOCAL_URL = 'http://localhost/api';
const PROD_URL = 'https://production.werapun.com/api';

console.log('node env', process.env.NODE_ENV);

const common = {
    PORT: 80 
}

const development = {
    ...common, 
    URL: LOCAL_URL,  
}

const production = {
    ...common, 
    URL: PROD_URL, 
}

const config = process.env.NODE_ENV === 'production' ? production : development;

module.exports = config;
