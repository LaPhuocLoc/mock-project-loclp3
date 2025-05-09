# mock-project-angular
# 🚀 Employee Management App (Angular + JSON Server)
Ứng dụng quản lý nhân viên đơn giản, sử dụng **Angular v19** và **JSON Server** để mô phỏng backend REST API.

## 🧰 Yêu cầu hệ thống  
- Node.js v18+  
- Angular CLI  
- npm
---

## ⚙️ Cách cài đặt & khởi động dự án
# 1. Clone repo hoặc tải file zip
git clone https://github.com/LaPhuocLoc/mock-project-loclp3.git
cd your-repo-name

# 2. Cài đặt các dependency
npm install

# 3. Khởi động JSON Server (mock API)
npm run mock

# 4. Mở terminal khác, chạy Angular project
npm run start  
  
App sẽ chạy tại: http://localhost:4200  
JSON Server chạy tại: http://localhost:3000/employees  

🧪 Các tính năng đã có  
🔍 Search by name: Tìm kiếm nhân viên theo tên trong danh sách  
📄 Danh sách nhân viên: Hiển thị bảng danh sách nhân viên từ mock API  
➕ Tạo mới nhân viên: Form thêm nhân viên mới  
📝 Cập nhật thông tin: Form chỉnh sửa thông tin nhân viên  
❌ Xóa nhân viên: Xóa nhân viên khỏi danh sách  
📚 Swagger UI: Tài liệu REST API hiển thị tại : http://localhost:4200/docs  

🧩 Cấu trúc code chính  
src/app/models/employee.model.ts: Định nghĩa interface cho Employee  
src/app/services/employee.service.ts: Service xử lý dữ liệu từ JSON Server bằng HttpClient và signal  
src/app/components: Chứa các component như danh sách, form thêm/sửa  
src/assets/openapi.yaml: File mô tả OpenAPI cho Swagger UI  
src/mock/db.json : Dữ liệu mô phỏng (mock data) cho API  

📌 Ghi chú  
Swagger UI được tích hợp sẵn, truy cập qua route htpp://localhost:4200/docs
