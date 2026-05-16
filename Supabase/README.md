# Yến Sào Vĩnh Hưng - Supabase Schema & Auth Flow

Thư mục này chứa toàn bộ các script SQL để thiết lập cơ sở dữ liệu trên Supabase cho hệ thống CRM Yến Sào Vĩnh Hưng.

## Hướng dẫn chạy SQL
Vui lòng chạy các file theo thứ tự sau trong Supabase SQL Editor:
1. `01_schema.sql`: Khởi tạo Extension, Type (Enum), và các Bảng (Tables).
2. `02_indexes.sql`: Tạo các Index giúp truy vấn dữ liệu lớn mượt mà.
3. `03_triggers_functions.sql`: Khởi tạo Trigger và Function tự tạo hồ sơ người dùng (`profiles`) khi có sự kiện đăng ký từ `auth.users`.
4. `04_rls_policies.sql`: Thiết lập Row Level Security (RLS) để phân quyền cho Admin, Team Leader, và Sales.
5. `05_seed_data.sql`: Dữ liệu mẫu (Giai đoạn ống dẫn, Danh sách, Nhóm, v.v.).

## Luồng Xác Thực (Auth Flow) & Chống Trùng Lặp

Hệ thống được thiết kế hỗ trợ đăng nhập qua **Email + Mật khẩu** và **Google OAuth**.
Để đáp ứng yêu cầu: cùng một email dù đăng nhập từ cách nào cũng chỉ sinh ra một user duy nhất và không bị tạo trùng profile, bạn **phải cấu hình** trên Supabase Dashboard như sau:

1. Vào `Authentication` -> `Providers`.
2. Bật **Email** và **Google**.
3. Trong `Authentication` -> `Providers` (hoặc `Advanced Settings` tùy phiên bản Supabase UI hiện tại), tìm mục **"Link identities automatically"** (Tự động liên kết tài khoản) và bật tính năng này.

**Cách hoạt động khi bật Identity Linking:**
- **Đăng ký Email/Pass trước**: Khi người dùng đăng ký qua Email/Password, một `auth.users` ID được tạo, Trigger ở `03_triggers_functions.sql` tự động tạo thêm một dòng bên bảng `profiles` với quyền mặc định là `sales`.
- **Đăng nhập Google sau (cùng email)**: Do tính năng Identity Linking đã bật, Supabase sẽ tự động gộp lần đăng nhập Google này vào chính `auth.users` ID cũ. Hệ thống **không** chèn dòng mới vào bảng `auth.users` nên Trigger sẽ không bị kích hoạt thêm lần nữa. Profile cũ vẫn giữ nguyên Role và Data, không tạo ra bản ghi bị trùng.

## Cơ Chế Phân Quyền
Quyền truy cập dữ liệu (RLS) được xác định trực tiếp dựa trên User Role (`admin`, `team_leader`, `sales`) lưu trong bảng `profiles`:
- **Admin**: Bỏ qua RLS, được thấy tất cả dữ liệu.
- **Team Leader**: Chỉ thấy dữ liệu của các thành viên trong nhóm mình.
- **Sales**: Chỉ thấy dữ liệu (khách hàng, cơ hội, nhiệm vụ) được giao trực tiếp cho mình.
Role không phụ thuộc vào phương thức đăng nhập mà đi theo `auth.users` UUID duy nhất của tài khoản.
