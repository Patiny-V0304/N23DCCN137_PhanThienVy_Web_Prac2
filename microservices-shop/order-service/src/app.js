const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

// Import đúng các file từ thư mục bạn đã tạo
const orderRoutes = require("./routes/orderRoutes");
const swaggerSpec = require("./swagger/swagger");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();

/**
 * Kết nối Database MongoDB Atlas
 */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("🍃 Đã kết nối MongoDB thành công"))
  .catch(err => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
  });

/**
 * Middleware bảo mật, log và xử lý dữ liệu
 */
app.use(helmet()); 
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Cấu hình Swagger UI cho Order Service
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "Order Service API Docs",
}));

/**
 * Định nghĩa các Routes
 */

// Route kiểm tra sức khỏe hệ thống
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    service: "order-service",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: process.uptime()
  });
});

// Gắn các route của Order vào prefix /api/orders
app.use("/api/orders", orderRoutes);

/**
 * Middleware xử lý lỗi tập trung (Đặt cuối cùng)
 */
app.use(errorHandler);

module.exports = app;