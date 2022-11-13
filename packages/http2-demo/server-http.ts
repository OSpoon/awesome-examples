import http from "node:http";
import fs from "node:fs";
import cp from "node:child_process";

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    const html = fs.readFileSync("index.html");
    res.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
    });
    res.write(html);
    res.end();
  } else if (url?.startsWith("/images/")) {
    const img = fs.readFileSync(`.${url}`);
    res.writeHead(200, {
      "content-type": "image/*",
    });
    res.write(img);
    res.end();
  }
});

server.listen(8553, () => {
  console.log("> HTTP服务启动成功");
  cp.exec("start http://localhost:8553");
});
