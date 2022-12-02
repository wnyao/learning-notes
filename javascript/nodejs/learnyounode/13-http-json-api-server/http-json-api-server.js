const http = require("http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://example.com");
  const { pathname } = url;
  const iso = url.searchParams.get("iso");
  const date = new Date(iso);

  if (req.method === "GET" && pathname === "/api/parsetime") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      })
    );
  }

  if (req.method === "GET" && pathname === "/api/unixtime") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        unixtime: date.getTime(),
      })
    );
  }

  res.writeHead(404);
  res.end();
});

server.listen(process.argv[2]);
