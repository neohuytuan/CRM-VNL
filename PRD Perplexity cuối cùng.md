<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# bây giờ hãy viết lại bản prd cuối cùng sau khi chốt Features List giúp cho tôi

Dưới đây là bản **PRD cuối cùng – Web App CRM Yến Sào Vĩnh Hưng (giai đoạn 1)**, đã được **chốt feature list** và **phân quyền rõ ràng**, viết hoàn toàn bằng tiếng Việt, dễ đọc, dễ triển khai cho team dev và sếp dùng.

Bạn có thể paste thẳng nội dung này vào file `PRD-yen-sao-vinh-hung-v1.md` để dùng ở Prompt 2, 3, 4.

***

# PRD – Web App CRM Công ty Yến Sào Vĩnh Hưng

**Phiên bản: v1 (final)**
**Tài liệu lưu: `PRD-yen-sao-vinh-hung-v1.md`**

***

## 1. Bối cảnh và mục tiêu sản phẩm

### 1.1. Bối cảnh doanh nghiệp

Yến Sào Vĩnh Hưng là doanh nghiệp hoạt động trong lĩnh vực **thương mại và bán lẻ yến sào**, tập trung vào các sản phẩm:

- **Yến thô, yến tinh chế, yến chưng, yến tươi, yến hũ, tổ yến nguyên chất, set quà cao cấp**.

Công ty có **nhiều kênh bán hàng**:

- Kênh trực tiếp: cửa hàng, showroom, bán hàng tại nhà, tư vấn theo yêu cầu khách.
- Kênh online: Facebook, website, Zalo, gọi điện, chăm sóc khách hàng qua email/SMS.

Hiện tại, thông tin khách hàng, lịch sử tương tác, đơn hàng, cơ hội bán hàng được ghi nhận trên **Excel, sổ tay, Zalo, fanpage, email, chat**… nên rất dễ **mất dữ liệu, trùng khách, không theo dõi được lịch sử chăm sóc và không đo được KPI**.

### 1.2. Mục tiêu sản phẩm giai đoạn 1

Web app CRM giai đoạn 1 được xây dựng để:

- **Tạo hồ sơ khách hàng thống nhất** cho toàn công ty từ mọi kênh bán hàng.
- **Theo dõi và ghi nhận rõ ràng lịch sử tương tác** (gọi điện, nhắn tin, fanpage, email, Zalo…).
- **Quản lý cơ hội bán hàng theo luồng Kanban kéo thả**, giúp nhân viên và quản lý dễ quan sát tiến độ.
- **Quản lý nhiệm vụ và nhắc lịch** cho nhân viên (gọi lại, gửi quà, giao hàng, nhắc sinh nhật, khuyến mãi…).
- **Cung cấp dashboard và báo cáo KPI cơ bản** cho sếp và trưởng nhóm để ra quyết định nhanh.
- **Phân quyền rõ ràng**: Admin, Trưởng nhóm, Nhân viên sales, không lộ dữ liệu sai người.
- **Chuẩn bị hạ tầng dữ liệu bằng Supabase** để mở rộng sang kho, thanh toán, tự động hóa trong các giai đoạn sau.

***

## 2. Chân dung người dùng

### 2.1. Ban quản lý / Quản trị hệ thống (Admin)

- **Vai trò**: Giám đốc, trưởng phòng kinh doanh, trưởng phòng CSKH, người phụ trách công nghệ nội bộ.
- **Mục tiêu**:
    - Theo dõi toàn bộ hoạt động bán hàng, chăm sóc khách, hiệu quả nhóm/nhân viên.
    - Quản lý tài khoản người dùng và phân quyền.
    - Đưa ra quyết định chiến lược dựa trên KPI và báo cáo.
- **Điểm đau**:
    - Dữ liệu rải rác, không nhìn được bức tranh tổng quan.
    - Phân quyền thủ công, không rõ ràng, dễ nhầm lẫn.


### 2.2. Trưởng nhóm bán hàng

- **Vai trò**: Tổ trưởng nhóm online, nhóm offline, nhóm CSKH.
- **Mục tiêu**:
    - Quản lý tiến độ của cả nhóm, phân công khách, phân công nhiệm vụ.
    - Đảm bảo không trùng khách, không bỏ sót khách hàng.
- **Điểm đau**:
    - Nhiều nhân viên vô tình cùng chăm một khách.
    - Không thấy KPI nhóm theo thời gian.


### 2.3. Nhân viên bán hàng / CSKH

- **Vai trò**: Nhân viên bán hàng tại cửa hàng, nhân viên tư vấn online, nhân viên gọi chăm sóc.
- **Mục tiêu**:
    - Lưu hồ sơ khách, ghi chú tương tác, tạo cơ hội, tạo đơn.
    - Biết rõ khách đang ở giai đoạn nào (mới, chờ chốt, đã mua, chăm sóc sau bán).
- **Điểm đau**:
    - Ghi chú nhiều nơi, dễ quên, không đồng bộ.
    - Không có hệ thống phân công khách, không rõ ai đang chăm khách nào.

***

## 3. Danh sách module (đã chốt)

Web app CRM giai đoạn 1 gồm 6 module chính:

1. **Tổng quan (Dashboard)**
2. **Cơ hội bán hàng (Kanban kéo thả)**
3. **Công việc (Tasks \& Follow‑ups)**
4. **Danh sách khách hàng**
5. **Thanh toán (Payment Overview – thống kê đơn giản, không xử lý giao dịch)**
6. **Cài đặt (Settings – quản lý người dùng, phân quyền, danh mục)**

***

## 4. User flow chính (đã chốt)

### 4.1. Đăng nhập và xác thực

1. Người dùng truy cập web app CRM.
2. Chọn **đăng nhập**:
    - Email + mật khẩu, hoặc
    - Google OAuth.
3. Hệ thống **kiểm tra email**. Nếu email đã có trong hệ thống (dù từ cách đăng nhập nào) thì **không tạo user mới**, mà **gắn vào user cũ**.
4. Sau khi đăng nhập, CRM **hiển thị đúng module theo role và quyền dữ liệu** (Admin, Trưởng nhóm, Nhân viên).

### 4.2. Thêm khách hàng và phân khúc

1. Từ **Danh sách khách hàng** hoặc **Tổng quan**, người dùng **thêm khách hàng tiềm năng**.
2. Nhập thông tin: tên, SĐT, email, địa chỉ, sinh nhật, nghề nghiệp, kênh tiếp cận.
3. Gắn **nhãn phân khúc**: Khách lẻ / Đại lý / VIP.
4. Gắn **sản phẩm quan tâm**: Yến thô, Yến chưng, Yến tinh chế.
5. Hệ thống tạo **hồ sơ khách hàng** và cho phép **upload nhiều khách hàng từ CSV** hoặc **xuất CSV** danh sách khách.

### 4.3. Cơ hội bán hàng – Kanban kéo thả

1. Người dùng vào **Cơ hội bán hàng**.
2. Thấy các cột: **Mới – Đang làm việc – Chờ chốt – Đã chốt – Huỷ**.
3. Tạo cơ hội mới từ khách hàng hoặc nhập trực tiếp:
    - Tên cơ hội, sản phẩm, giá trị (doanh số dự kiến), ngày dự kiến chốt.
4. Dùng **chuột kéo thả** để di chuyển cơ hội giữa các cột, thay đổi trạng thái.
5. Khi cơ hội **được chốt**, hệ thống cho phép **tạo thông tin thanh toán cơ bản** (không xử lý trực tiếp với ngân hàng, MPOS, ví).

### 4.4. Công việc và nhắc lịch

1. Người dùng tạo **công việc** mới:
    - Gọi chăm sóc, gửi báo giá, set quà, giao hàng, gửi hợp đồng, nhắc sinh nhật, khuyến mãi…
2. Gắn công việc với **khách hàng** và/hoặc **cơ hội**.
3. Đặt **hạn thực hiện** (ngày, giờ) và **thời gian nhắc nhắc** (1 ngày trước, 1 giờ trước…).
4. Ngày đến, nhân viên **cập nhật trạng thái**: Đã gọi, Gửi, Hẹn lại, Hoàn thành, Huỷ.

### 4.5. Danh sách khách hàng và quản lý dữ liệu

1. Vào **Danh sách khách hàng**.
2. Tìm kiếm và lọc theo:
    - Tên, SĐT, email, kênh, phân khúc, sản phẩm quan tâm, người phụ trách.
3. Với từng khách hàng, có thể:
    - Xem chi tiết hồ sơ.
    - Cập nhật thông tin, ghi chú, cập nhật phân khúc, cập nhật sản phẩm quan tâm.
    - Chuyển sang Kanban cơ hội hoặc tạo công việc mới.

### 4.6. Xuất / nhập CSV

1. Từ **Danh sách khách hàng**, chọn:
    - **Upload danh sách từ CSV** (tệp mẫu đã định nghĩa).
    - **Xuất danh sách khách hàng ra CSV**.
2. Hệ thống **so sánh theo email/SĐT** để cập nhật khách cũ hoặc thêm mới khách mới, **không tạo trùng hồ sơ**.

***

## 5. Danh sách data fields chính (đã chốt)

### 5.1. Người dùng (User)

- `user_id` (UUID)
- `email` (unique)
- `full_name`
- `phone` (optional)
- `role` (Admin, Trưởng nhóm, Nhân viên Sales)
- `team_id` (nếu có, để phân nhóm)
- `status` (Hoạt động / Khóa)
- `created_at`, `updated_at`


### 5.2. Khách hàng (Customer)

- `customer_id` (UUID)
- `full_name`
- `phone`
- `email`
- `address`
- `birthday`
- `job` (nghề nghiệp)
- `channel` (Facebook, Zalo, Website, Cửa hàng, Giới thiệu…)
- `customer_type` (Khách lẻ, Đại lý, VIP)
- `interested_products` (array: Yến thô, Yến chưng, Yến tinh chế)
- `created_at`, `updated_at`
- `owner_user_id` (nhân viên phụ trách)
- `owner_team_id` (nhóm sở hữu)


### 5.3. Cơ hội bán hàng (Opportunity)

- `opportunity_id` (UUID)
- `customer_id`
- `opportunity_name`
- `status` (Mới, Đang làm việc, Chờ chốt, Đã chốt, Huỷ)
- `stage` (cột Kanban hiện tại)
- `value` (doanh số dự kiến)
- `expected_close_date`
- `created_by_user_id`
- `owner_user_id`
- `owner_team_id`
- `created_at`, `updated_at`


### 5.4. Ghi chú tương tác (Interaction)

- `interaction_id` (UUID)
- `customer_id`
- `opportunity_id` (optional)
- `type` (Cuộc gọi, Zalo, Tin nhắn, Email, Fanpage, Chat web, Ghi chú)
- `summary` (tóm tắt nội dung)
- `result` (Thành công, Hẹn lại, Không quan tâm, Từ chối, Khiếu nại, Đã đặt, Đã thanh toán…)
- `contacted_at` (thời gian tương tác)
- `created_by_user_id`
- `created_at`


### 5.5. Công việc (Task)

- `task_id` (UUID)
- `title`
- `description` (optional)
- `customer_id` (optional)
- `opportunity_id` (optional)
- `due_date`
- `status` (Mới, Đang làm, Hoàn thành, Huỷ)
- `assigned_to_user_id`
- `assigned_to_team_id`
- `created_by_user_id`
- `created_at`, `updated_at`


### 5.6. Thanh toán (Payment Overview – chỉ thống kê)

- `payment_id` (UUID)
- `opportunity_id`
- `amount` (số tiền)
- `payment_method` (Tiền mặt, Chuyển khoản, Ví điện tử, Khác – chỉ dùng để thống kê)
- `status` (Chưa thanh toán, Đã thanh toán, Thanh toán một phần)
- `payment_date` (ngày nhận thanh toán – nếu có)
- `created_by_user_id`
- `created_at`, `updated_at`

***

## 6. Quy tắc phân quyền (đã chốt)

### 6.1. Admin

- Xem và quản lý **toàn bộ dữ liệu** công ty: khách hàng, cơ hội, công việc, thanh toán.
- Xem **tất cả các nhóm** và nhân viên.
- Quản lý người dùng:
    - Tạo, chỉnh sửa, khóa tài khoản.
    - Phân quyền vai trò: Admin, Trưởng nhóm, Nhân viên Sales.
- Có quyền truy cập **toàn bộ Dashboard** và báo cáo theo nhân viên, nhóm, sản phẩm, thời gian.


### 6.2. Trưởng nhóm

- Chỉ được xem và quản lý dữ liệu **của nhóm mình**:
    - Khách hàng, cơ hội, công việc, thanh toán của nhóm.
- Xem được **báo cáo nhóm**: doanh số, số cơ hội, số cuộc gọi, số công việc.
- Không được xem hoặc chỉnh sửa dữ liệu của nhóm khác (trừ khi Admin cấp quyền đặc biệt).
- Không được quản lý tài khoản người dùng chung, nhưng có thể xem danh sách nhân viên trong nhóm.


### 6.3. Nhân viên Sales / CSKH

- Chỉ được xem và thao tác **dữ liệu do mình phụ trách**:
    - Khách hàng được gán cho mình.
    - Cơ hội, công việc, thanh toán liên quan đến khách của mình.
- Không được xem hồ sơ khách hàng của nhân viên khác (trừ khi Admin cho phép đặc biệt).
- Có thể xem **Dashboard cá nhân**: doanh số, số cơ hội, số cuộc gọi, số công việc.
- Không được quản lý tài khoản người dùng khác.

***

## 7. Yêu cầu giao diện và phong cách thiết kế

### 7.1. Nguyên tắc chung

- Giao diện **sạch, gọn, dễ đọc**, ưu tiên hiển thị nhanh dữ liệu quan trọng.
- Phong cách **chuyên nghiệp, trang nhã**, phù hợp với ngành hàng cao cấp (yến sào).
- Tập trung tối ưu cho **desktop** (laptop, màn hình PC); vẫn responsive ở mức cơ bản trên tablet.


### 7.2. Màu sắc và typography

- **Màu nền**: trắng – xám nhẹ, tạo cảm giác thoáng, giảm mỏi mắt.
- **Accent màu**: tông ấm, nhẹ (vàng nhạt, be, nâu – theo màu thương hiệu Yến Sào Vĩnh Hưng nếu có).
- **Font**: sans‑serif (VD: Roboto hoặc tương tự).
- **Cỡ chữ**:
    - Tiêu đề module: 18–20px.
    - Tiêu đề bảng: 14–15px.
    - Nội dung: 13–14px.


### 7.3. Layout module (gợi ý)

- **Tổng quan**:
    - Hiển thị số liệu chính: khách hàng mới, cơ hội, doanh số, biểu đồ đường/doanh số theo tuần/tháng.
- **Cơ hội bán hàng (Kanban)**:
    - Các cột Kanban kéo thả, mỗi thẻ hiển thị: tên khách, tên cơ hội, giá trị, ngày dự kiến chốt.
- **Công việc**:
    - Bảng danh sách: Tên công việc, Khách hàng, Hạn, Trạng thái, Người được giao.
- **Danh sách khách hàng**:
    - Bảng: Tên, SĐT, Email, Kênh, Phân khúc, Sản phẩm quan tâm, Người phụ trách.
- **Thanh toán**:
    - Bảng đơn giản: Tên cơ hội, Khách hàng, Giá trị, Phương thức, Trạng thái, Ngày thanh toán.
- **Cài đặt**:
    - Trang quản lý người dùng, phân quyền, định nghĩa nhãn phân khúc, sản phẩm quan tâm.

***

## 8. Yêu cầu kỹ thuật mức cao (đã chốt scope)

### 8.1. Lưu trữ dữ liệu và backend

- Dữ liệu **lưu trực tiếp trên Supabase (PostgreSQL)** cho các bảng: User, Customer, Opportunity, Interaction, Task, Payment.
- Dùng **JWT** để xác thực, quản lý session.
- Không dùng ERP/warehouse riêng, chỉ tập trung **quản lý khách hàng + bán hàng + thanh toán cơ bản**.


### 8.2. Web app frontend

- Hệ thống là **SPA** (React hoặc Vue đều được), tập trung vào trải nghiệm:
    - **Kanban kéo thả** cho cơ hội.
    - **Form nhập khách hàng, cơ hội, công việc** đơn giản, đủ trường, có validate cơ bản.
    - **Bảng + phân trang** cho danh sách khách hàng và công việc.


### 8.3. Xác thực và quyền người dùng

- Hỗ trợ **song song**:
    - Email + mật khẩu.
    - Google OAuth.
- Quy tắc:
    - Một email chỉ tương ứng **một user duy nhất**, không tạo trùng dù đăng nhập nhiều cách.
    - **Role và quyền dữ liệu** phụ thuộc vào user + role + nhóm, **không phụ thuộc** cách đăng nhập.


### 8.4. Tính năng CSV

- **Upload CSV**:
    - Dựa trên template chuẩn.
    - So sánh theo email/SĐT, cập nhật khách cũ, thêm khách mới, không tạo trùng.
- **Export CSV**:
    - Xuất danh sách khách hàng theo bộ lọc, đúng mẫu, mở được trên Excel.


### 8.5. Dashboard và biểu đồ

- Biểu đồ:
    - Doanh số theo thời gian (tuần/tháng).
    - Số cơ hội mới, đã chốt, huỷ.
    - Số khách hàng, số cuộc gọi, số công việc.
- Chỉ hiển thị **dữ liệu mà người dùng có quyền truy cập** (Admin xem toàn bộ, Trưởng nhóm xem nhóm, Nhân viên xem cá nhân).

***

## 9. Tiêu chí nghiệm thu giai đoạn 1 (đã chốt)

### 9.1. Chức năng cốt lõi

- **Tổng quan / Dashboard**:
    - Hiển thị đúng số liệu, biểu đồ không bị vỡ layout.
- **Cơ hội bán hàng – Kanban**:
    - Có thể tạo, kéo thả, đổi trạng thái cơ hội giữa các cột.
    - Mỗi cơ hội hiển thị đúng tên khách, giá trị, ngày dự kiến chốt.
- **Khách hàng**:
    - Thêm, sửa, xóa khách hàng thành công.
    - Gắn phân khúc: Khách lẻ / Đại lý / VIP.
    - Gắn sản phẩm quan tâm: Yến thô, Yến chưng, Yến tinh chế.
- **Công việc**:
    - Tạo, sửa, xóa, cập nhật trạng thái công việc đúng.
    - Có thể liên kết với khách hàng / cơ hội và có nhắc lịch.
- **Xuất / nhập CSV**:
    - Upload CSV không bị lỗi, cập nhật khách cũ, không tạo trùng.
    - Export CSV đúng mẫu, đầy đủ trường.
- **Thanh toán**:
    - Ghi nhận được thông tin thanh toán (giá trị, phương thức, trạng thái) cho từng cơ hội.
- **Cài đặt**:
    - Admin có thể quản lý người dùng, phân quyền role, quản lý nhóm.


### 9.2. Giao diện và trải nghiệm

- UI nhất quán, dễ đọc, không bị lỗi vỡ layout.
- Form bắt nhập đầy đủ các trường bắt buộc, có cảnh báo lỗi rõ ràng bằng tiếng Việt.
- Dashboard, bảng danh sách, Kanban hiển thị mượt, load nhanh ở mức dữ liệu **hàng nghìn bản ghi**.


### 9.3. Bảo mật và phân quyền

- Admin thấy toàn bộ dữ liệu, Trưởng nhóm chỉ thấy nhóm, Nhân viên chỉ thấy dữ liệu của mình.
- Không có lỗi khiến dữ liệu khách hàng bị lộ sang nhóm khác hoặc nhân viên khác.
- Không cho phép tạo user trùng email dù khác phương thức đăng nhập.


### 9.4. Xác thực và liên kết tài khoản

- Người dùng đăng nhập bằng email + mật khẩu hoặc Google OAuth đều hoạt động tốt.
- Cùng một email **chỉ tồn tại một user**, không tạo thêm hồ sơ.
- Đổi cách đăng nhập không thay đổi **role, quyền truy cập dữ liệu**.

***

## 10. Feature list đã chốt (gđ 1 – không làm thêm trong giai đoạn này)

Trong 90 ngày đầu, CRM **chỉ tập trung** vào các tính năng sau, **không** làm:

- **Không quản lý kho**: không tính tồn kho, không quản lý nhập hàng, kiểm kê.
- **Không tích hợp thanh toán trực tuyến**: không xử lý transaction với ngân hàng, MPOS, ví điện tử.
- **Không quản lý hợp đồng dài hạn**: bảo hiểm, chia sẻ doanh thu, thoả thuận với đại lý…
- **Không marketing automation**: không gửi email/SMS hàng loạt, không phân nhóm khách sâu, không quản lý campaign phức tạp.
- **Không phân tích chuyên sâu**: không phân khúc RFM, CLV, phân nhóm khách dựa trên AI (giữ ở mức báo cáo KPI đơn giản).

***

Bản PRD này đã được **chốt scope** và **features list** cho giai đoạn 1. Bạn có thể:

- Dùng **Prompt 2** để yêu cầu **mockup UI chi tiết từng module**.
- Dùng **Prompt 3** để yêu cầu **bản kế hoạch triển khai, timeline, phân chia công việc dev**.
- Dùng **Prompt 4** để yêu cầu **chi tiết API contracts (các endpoint API)**.

Nếu cần, bạn chỉ việc gõ:

- “Hãy vẽ sơ đồ UI cho màn hình Cơ hội bán hàng theo Kanban”
- hoặc “Hãy liệt kê tất cả API endpoints cho module Khách hàng”
là mình sẽ triển khai tiếp theo đúng vai trò sếp đã chốt hết PRD này rồi.
<span style="display:none">[^1][^10][^2][^3][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://www.bravo.com.vn/kien-thuc/kinh-nghiem-trien-khai/yen-sao-nha-trang-trien-khai-ung-dung-thanh-cong-phan-mem-bravo-erp/

[^2]: https://adsmo.vn/en/elegant-birds-nest-website-design/

[^3]: https://www.marketresearch.com/China-Research-and-Intelligence-Co-Ltd-v3627/Vietnam-Edible-Bird-Nests-Export-40941963/

[^4]: https://ircdn.vingroup.net/storage/Uploads/6_An%20pham%20tai%20lieu/Vingroup%20Corporate%20Profile%20(ENG).pdf

[^5]: https://bird.com/th/marketing/platform/crm

[^6]: https://www.seair.co.in/birdnest-vietnam-exporters

[^7]: https://yensaocaocapvinhhung.com

[^8]: https://technologycounter.com/products/bird-crm

[^9]: https://en.nestgia.com/things-to-know-before-the-birds-nest-business/

[^10]: https://www.facebook.com/YenSaoCaoCapVinhHung/

