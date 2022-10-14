const http = require("http2");
const app = require("./app");

const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
