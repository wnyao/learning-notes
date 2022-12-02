const net = require("net");
const port = process.argv[2];

const todayDate = new Date();
const year = todayDate.getFullYear();
const month = (todayDate.getMonth() + 1).toString().padStart(2, 0);
const date = todayDate.getDate().toString().padStart(2, 0);
const hour = todayDate.getHours().toString().padStart(2, 0);
const minute = todayDate.getMinutes().toString().padStart(2, 0);
const today = `${year}-${month}-${date} ${hour}:${minute}`;

console.log(`todayDate.getMonth(): `, todayDate.getUTCMonth());
console.log(`today: `, today);

const server = net.createServer((socket) => {
  socket.write(today + "\n");
  socket.end();
});

server.listen(port);
