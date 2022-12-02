const numbers = process.argv.slice(2);

const total = numbers.reduce((acc, current) => (acc += Number(current)), 0);

console.log(total);
