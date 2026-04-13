/**
 * Middleware xử lý lỗi tập trung cho toàn bộ ứng dụng
 */
const errorHandler = (err, req, res, next) => {
  // Log lỗi ra console để debug
  console.error(`[${new Date().toISOString()}] ERROR:`, err);

  // Xử lý lỗi từ Prisma: Vi phạm ràng buộc duy nhất (ví dụ trùng slug/name)
  if (err.code === "P2002") {
    return res.status(409).json({ 
      success: false, 
      message: `${err.meta?.target} đã tồn tại` 
    });
  }

  // Xử lý lỗi từ Prisma: Không tìm thấy bản ghi
  if (err.code === "P2025") {
    return res.status(404).json({ 
      success: false, 
      message: "Không tìm thấy bản ghi" 
    });
  }

  // Các lỗi mặc định khác
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Lỗi hệ thống",
    // Chỉ hiển thị stack trace trong môi trường development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

module.exports = errorHandler;