const router = require("express").Router();
const { 
  createOrder, 
  getOrdersByCustomer, 
  updateOrderStatus 
} = require("../controllers/orderController");


// Tuy tài liệu có thể chưa viết JSDoc cho phần này, 
// nhưng chúng ta vẫn khai báo các endpoint cơ bản:

// POST /api/orders - Tạo đơn hàng
router.post("/", createOrder);

// GET /api/orders/customer/:customerId - Lấy đơn hàng theo khách hàng
router.get("/customer/:customerId", getOrdersByCustomer);

// PUT /api/orders/:id/status - Cập nhật trạng thái
router.put("/:id/status", updateOrderStatus);

module.exports = router;