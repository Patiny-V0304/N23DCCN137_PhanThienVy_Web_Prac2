const app = require("./app");

// Cổng chạy mặc định cho Order Service là 3002
const PORT = process.env.PORT || 3002;

/**
 * Khởi động Server
 */
const server = app.listen(PORT, () => {
  console.log(`🚀 Order Service đang chạy tại: http://localhost:${PORT}`);
  console.log(`📖 Tài liệu API (Swagger): http://localhost:${PORT}/api-docs`);
});

/**
 * Xử lý các lỗi treo hệ thống
 */
process.on("unhandledRejection", (err) => {
  console.error("LỖI HỆ THỐNG (Unhandled Rejection):", err.message);
  server.close(() => process.exit(1));
});