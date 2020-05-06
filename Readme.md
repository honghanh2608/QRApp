CRUD đối với 1 Model:
 * Retrieve == SELECT == Lấy toàn bộ danh sách
 * Create == INSERT INTO == Tạo mới
 * Update == UPDATE == Cập nhật
 * Delete == DELETE == Xoá
 
 
Access Token bao gồm các thông tin trong payload:
* Email
* Id
* Permission
* EXP
 
# Phân chia chức năng theo model
## 1. Auth

BASE_URL: /auth <br>
Dùng trong xác thực tài khoản (đăng nhập)

Các URL:
* /user: đăng nhập cho người dùng thông thường
* /admin: đăng nhập cho admin
* /staff: đăng nhập cho nhân viên

## 2. User

BASE_URL: /user
Dùng trong các hoạt động liên quan đến tài khoản

Các phương thức:
* get(): lấy toàn bộ danh sách người dùng, chỉ admin có quyền
* post(): tạo tài khoản, người dùng đăng ký tài khoản mới
* put(): cập nhật tài khoản, người dùng thay đổi password hoặc tên hiển thị
* delete(): xoá tài khoản, chỉ admin có quyền, dùng khi admin muốn xoá tài khoản người dùng phá hoại, spam,...

Note:
* get và delete yêu cầu có access_token của admin
* post không yêu cầu access_token
* put yêu cầu access_token của người dùng hoặc admin

## 3. Product

BASE_URL: /product <br>
Các phương thức:
* get(): lấy toàn bộ danh sách sản phẩm
* post(): thêm mới 1 sản phẩm vào kho (admin hoặc staff)
* put(): cập nhật thông tin sản phẩm (admin hoặc staff)
* delete(): xoá sản phẩm khỏi kho (admin hoặc staff)

Note: nếu có chú thích admin/staff/user thì cần access token tương ứng. Nếu không đề cập, không cần access token

## 4. Staff
BASE_URL: /staff <br>
Liên quan đến nhân viên

Các phương thức:
* get(): lấy toàn bộ danh sách nhân viên (admin)
* post(): thêm mới 1 tài khoản nhân viên (admin)
* put(): cập nhật thông tin nhân viên (admin)
* delete(): xoá tài khoản nhân viên (admin)
