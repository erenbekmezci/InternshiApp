const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // Gelen mesajları işleyebilirsiniz
  });

  ws.send(JSON.stringify({ message: "WebSocket sunucusuna hoş geldiniz!" }));
});

wss.on("error", (error) => {
  console.error("WebSocket error:", error); // Hata loglanması
});

module.exports = { wss, WebSocket };
