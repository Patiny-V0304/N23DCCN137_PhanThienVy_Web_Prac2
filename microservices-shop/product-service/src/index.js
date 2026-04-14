const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Product Service chạy tại: http://localhost:${PORT}`);
  console.log(`📖 Tài liệu API (Swagger): http://localhost:${PORT}/api-docs`);
});