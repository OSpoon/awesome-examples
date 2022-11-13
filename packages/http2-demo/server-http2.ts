import http2 from "node:http2";
import fs from "node:fs";
import cp from "node:child_process";

const server = http2.createSecureServer({
  key: fs.readFileSync("./keys/localhost-key.pem"),
  cert: fs.readFileSync("./keys/localhost.pem"),
});

server.on("error", (err) => console.log(err));

server.on("stream", (stream, headers) => {
  const path = headers[":path"];
  if (path === "/") {
    const html = fs.readFileSync("index.html");
    stream.respond({
      "content-type": "text/html; charset=utf-8",
      ":status": 200,
    });
    stream.write(html);
    stream.end();
  } else if (path?.startsWith("/images/")) {
    const img = fs.readFileSync(`.${path}`);
    stream.respond({
      "content-type": "image/*",
      ":status": 200,
    });
    stream.write(img);
    stream.end();
  }
});

server.listen(8443, () => {
  console.log("> HTTP2服务启动成功");
  cp.exec("start https://localhost:8443");
});
