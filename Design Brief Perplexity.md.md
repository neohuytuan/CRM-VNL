<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Dựa trên PRD và tài liệu xác nhận tính năng đã chốt, hãy tạo một Design Brief hoàn chỉnh cho CRM Yến Sào Vĩnh Hưng.

Yêu cầu phong cách:

- Tối giản
- Kính mờ nhẹ
- Font mỏng, hiện đại
- Nhiều khoảng trắng
- Chỉ dùng 1 màu accent chính
- Tone màu lấy cảm hứng từ yến sào: vàng kem, nâu vàng ấm, nền sáng tối giản

Design Brief cần có:

1. Color palette
2. Typography
3. Layout structure cho các trang: Tổng quan, Cơ hội bán hàng, Công việc, Danh sách, Thanh toán, Cài đặt
4. Component style: Card, Button, Input, Badge, Sidebar, Kanban card
5. Dữ liệu mẫu cho Yến Sào Vĩnh Hưng:

- 6 khách hàng tiềm năng: tên người thật Việt Nam, công ty thật, phân khúc và sản phẩm quan tâm khác nhau, giá trị đơn hàng dự kiến bằng VND
- 5 công việc: liên quan đến bán yến sào, có priority và deadline thực tế
- 3 danh sách khách hàng: tên phù hợp với cách phân nhóm của Yến Sào Vĩnh Hưng

PRD:

PRD-yen-sao-vinh-hung-V1 ĐÃ TẠO Ở BƯỚC 1

Feature Confirmation:

FEATURE-CONFIRMATION-yen-sao-vinh-hung ĐÃ TẠO Ở BƯỚC 2
(Xem PRD VÀ Feature Confirmation TRONG file đính kèm nha)

Dưới đây là **Design Brief hoàn chỉnh** cho CRM Yến Sào Vĩnh Hưng, bám theo PRD và scope đã chốt, với phong cách tối giản, kính mờ nhẹ, font mỏng hiện đại và tone màu ấm lấy cảm hứng từ yến sào.[^1][^2]

## 1) Hướng thiết kế

Giao diện cần mang cảm giác cao cấp, sạch, thoáng và ít chi tiết thừa, vì CRM này phục vụ ngành yến sào vốn thiên về sự tin cậy và tinh tế. Ưu tiên đọc dữ liệu nhanh, giảm nhiễu thị giác, dùng nhiều khoảng trắng và chỉ một màu accent chính xuyên suốt toàn hệ thống.[^2][^1]

- Tinh thần thị giác: premium, nhẹ, gọn, chính xác.
- Độ nổi khối: thấp, dùng blur/mờ kính vừa phải, shadow rất mềm.
- Tỷ lệ mật độ: thoáng, spacing rộng, khối thông tin rõ.
- Trọng tâm: dữ liệu, trạng thái, luồng công việc, không trang trí dư thừa.


## 2) Color palette

Tone màu nên đi từ trắng ấm sang kem, be, nâu vàng và một accent chính duy nhất để giữ sự nhất quán. Nên tránh xanh dương quá “SaaS” hoặc đỏ/cam gắt vì lệch khỏi cảm hứng yến sào.[^1][^2]


| Vai trò | Màu | Hex |
| :-- | --: | --: |
| Background chính | Trắng ấm | `#FAF8F4` |
| Surface / Card | Kem rất nhạt | `#FFFDF9` |
| Surface phụ | Be sữa | `#F3EBDD` |
| Border nhẹ | Nâu sương | `#E6DDD1` |
| Text chính | Nâu than ấm | `#2D2620` |
| Text phụ | Nâu xám | `#7C6F63` |
| Accent chính | Vàng mật ong | `#C89B4A` |
| Accent hover | Vàng nâu đậm | `#B78634` |
| Accent soft | Vàng kem | `#F3E1B8` |
| Success | Xanh olive nhạt | `#7E9470` |
| Warning | Hổ phách nhạt | `#D8A24A` |
| Danger | Đỏ nâu trầm | `#B45C4D` |

Gợi ý sử dụng: accent chỉ nên dùng cho CTA chính, highlight số liệu quan trọng, trạng thái active và điểm nhấn tương tác. Các trạng thái còn lại nên dùng độ đậm nhạt của nền, viền và text thay vì thêm màu mới.[^1]

## 3) Typography

Font nên mỏng, hiện đại, sans-serif, thiên về cảm giác sạch và sang, phù hợp dashboard nghiệp vụ. Ưu tiên các font có nét gọn và hỗ trợ tiếng Việt tốt như Inter, Be Vietnam Pro hoặc Manrope.[^2][^1]


| Thành phần | Font weight | Cỡ chữ | Ghi chú |
| :-- | --: | --: | :-- |
| App title / page title | 500 | 22–24px | Rõ, không quá dày |
| Section title | 500 | 16–18px | Dùng nhiều khoảng thở |
| Table header | 500 | 13–14px | Upper contrast nhẹ |
| Body text | 400 | 13–14px | Dễ đọc trên desktop |
| Caption / meta | 400 | 12px | Màu phụ |
| Numeric KPI | 600 | 24–32px | Có thể dùng accent |
| Badge text | 500 | 11–12px | Ngắn, súc tích |

Nguyên tắc chữ: line-height thoáng, letter-spacing rất nhẹ ở tiêu đề, không dùng quá nhiều chữ đậm. Mọi nhãn, nút, bảng và form nên giữ cùng hệ font để tạo cảm giác đồng bộ.[^1]

## 4) Layout structure

### Tổng quan

Trang Tổng quan nên là dashboard theo chiều dọc, đầu trang là bộ lọc thời gian và phạm vi dữ liệu, dưới đó là cụm KPI cards, tiếp theo là biểu đồ và danh sách công việc/cơ hội nổi bật. Bố cục nên 12 cột, với khu vực KPI 4 ô ngang, biểu đồ lớn chiếm 8 cột và panel phụ chiếm 4 cột.[^2][^1]

- Top bar: search, filter thời gian, thông báo, avatar.
- KPI row: khách mới, cơ hội, doanh số, công việc quá hạn.
- Main: biểu đồ doanh số, pipeline overview, task feed.
- Side panel: hoạt động gần đây, nhắc việc sắp đến hạn.


### Cơ hội bán hàng

Trang Cơ hội bán hàng dùng Kanban full-width, chia cột rõ theo trạng thái đã chốt trong PRD: Mới, Đang làm việc, Chờ chốt, Đã chốt, Huỷ. Mỗi cột nên có header sticky, tổng số cơ hội và tổng giá trị, card kéo thả hiển thị tên khách, sản phẩm, giá trị, ngày dự kiến chốt.[^2][^1]

- Cột rộng, cuộn ngang mềm.
- Card cơ hội có màu nền trắng ấm, viền rất nhẹ.
- Hiển thị ưu tiên: khách, giá trị, deadline, owner.
- Có quick actions: xem chi tiết, tạo task, chuyển trạng thái.


### Công việc

Trang Công việc nên là bảng danh sách kết hợp filter và calendar mini, vì yêu cầu chính là theo dõi follow-up và deadline. Trên desktop, bảng chiếm phần lớn màn hình, bên phải là panel lọc theo người phụ trách, trạng thái, hạn và mức ưu tiên.[^1][^2]

- Bảng cột: công việc, khách hàng, liên kết cơ hội, priority, deadline, người được giao.
- Có toggle giữa list view và compact view.
- Nên có chip trạng thái để scan nhanh.
- Task quá hạn nổi bật nhưng không dùng màu gắt.


### Danh sách

Trang Danh sách khách hàng cần tối ưu cho tìm kiếm, lọc và thao tác hàng loạt, vì PRD có nhấn mạnh xuất/nhập CSV và quản lý dữ liệu theo email/SĐT. Bố cục đề xuất là bảng full-width, hàng lọc gọn trên cùng, sidebar filter có thể thu gọn.[^2][^1]

- Cột: tên, SĐT, email, kênh, phân khúc, quan tâm, phụ trách.
- Có bulk select và export/import CSV.
- Row hover nhẹ, click mở drawer chi tiết.
- Có quick edit inline cho nhãn và owner.


### Thanh toán

Trang Thanh toán chỉ là payment overview, không xử lý giao dịch trực tiếp, nên giao diện phải đơn giản và rất rõ trạng thái. Nên ưu tiên bảng tóm tắt và một dải KPI nhỏ: tổng chưa thanh toán, đã thanh toán, thanh toán một phần.[^1][^2]

- Cột: cơ hội, khách hàng, số tiền, phương thức, trạng thái, ngày.
- Hỗ trợ filter theo trạng thái và thời gian.
- Card summary phía trên giúp nhìn nhanh doanh thu ghi nhận.
- Không cần các yếu tố fintech phức tạp.


### Cài đặt

Trang Cài đặt nên theo dạng sidebar settings với nội dung chia tab hoặc nested section, vì có user, role, nhóm, danh mục và nhãn phân khúc. Nên giữ layout thật gọn, tránh biến thành trang quản trị nặng nề.[^2][^1]

- Tab: người dùng, phân quyền, nhóm, nhãn, danh mục sản phẩm.
- Form mỗi section ngắn, có mô tả phụ.
- Bảng user dùng compact style.
- Có CTA rõ cho lưu thay đổi, khóa tài khoản, thêm nhóm.


## 5) Component style

### Card

Card là nền chính của UI nên cần phẳng, sáng, bo nhẹ và có blur rất tinh tế. Shadow chỉ nên là một lớp mềm, không tạo cảm giác nổi mạnh.[^1]

- Background: `rgba(255,255,255,0.72)` hoặc trắng kem.
- Blur: 12–18px.
- Border: 1px solid màu kem xám.
- Radius: 16px.
- Padding: 20–24px.


### Button

Button chỉ nên có một primary accent, còn lại là secondary và ghost để không phá sự tối giản. Primary dùng vàng mật ong, chữ trắng hoặc nâu đậm tùy độ tương phản.[^2][^1]

- Primary: fill accent, radius 12px.
- Secondary: nền trắng, viền nhẹ, text accent.
- Ghost: nền trong suốt, hover nền kem.
- Danger: chỉ dùng cho hành động xoá/huỷ.


### Input

Input nên rộng, thoáng, border mảnh và focus state mềm. Label đặt trên input, helper text nhỏ và màu phụ.[^1]

- Height 44–48px.
- Border nhẹ, focus ring vàng nhạt.
- Placeholder mờ.
- Error state dùng đỏ nâu trầm, không chói.


### Badge

Badge phải là công cụ đọc trạng thái nhanh, không biến thành màu sắc lòe loẹt. Chỉ dùng nền pastel rất nhẹ với text đậm hơn một chút.[^1]

- Mới: kem nhạt.
- Đang làm việc: be ấm.
- Chờ chốt: vàng mềm.
- Đã chốt: xanh olive nhạt.
- Huỷ: nâu đỏ nhạt.


### Sidebar

Sidebar nên là panel mờ kính nhẹ, thu gọn được, icon mảnh và text nhỏ gọn. Active item chỉ cần một thanh accent mỏng ở trái và nền highlight rất nhẹ.[^2][^1]

- Width desktop: 260–280px.
- Item height: 44–48px.
- Active state: accent bar + nền kem.
- Có group section rõ ràng giữa các module.


### Kanban card

Kanban card cần hiển thị nhanh thông tin bán hàng, nhưng vẫn rất nhẹ mắt. Card nên có header là tên khách, subtext là sản phẩm/nguồn, và footer là value + due date + owner.[^1]

- Tối đa 3–4 dòng text.
- Nút hành động nhỏ, ẩn khi không hover.
- Border và shadow rất nhẹ.
- Có indicator nhỏ cho priority hoặc deadline gần.


## 6) Dữ liệu mẫu

Dưới đây là dữ liệu mẫu bám theo logic CRM yến sào, có phân khúc, sản phẩm quan tâm và giá trị dự kiến bằng VND, đồng thời dùng tên người thật Việt Nam và công ty thật theo yêu cầu của bạn.[^2][^1]

### 6.1 Khách hàng tiềm năng

| Tên | Công ty | Phân khúc | Sản phẩm quan tâm | Giá trị dự kiến |
| :-- | :-- | :-- | :-- | --: |
| Nguyễn Thu Hương | Công ty TNHH Thương mại Dịch vụ An Khang | VIP | Set quà cao cấp, yến tinh chế | 48,000,000 |
| Trần Minh Quân | Công ty CP Dược phẩm Pharmacity | Đại lý | Yến chưng, yến hũ | 62,000,000 |
| Lê Thảo Vy | Công ty TNHH Golden Lotus Hospitality | Khách lẻ | Yến chưng, tổ yến nguyên chất | 12,500,000 |
| Phạm Quốc Bảo | Công ty TNHH MTV Sài Gòn Pearl | Đại lý | Yến thô, yến tinh chế | 85,000,000 |
| Võ Ngọc Anh | Công ty CP Thực phẩm Cánh Đồng Vàng | VIP | Set quà cao cấp, yến tươi | 36,000,000 |
| Đặng Hải Yến | Công ty TNHH BĐS Nam Long | Khách lẻ | Yến hũ, yến chưng | 18,000,000 |

### 6.2 Công việc

| Công việc | Priority | Deadline |
| :-- | :-- | :-- |
| Gọi xác nhận nhu cầu set quà Tết cho khách VIP Nguyễn Thu Hương | High | 2026-05-18 10:00 |
| Gửi báo giá đại lý yến chưng cho Pharmacity | High | 2026-05-19 16:30 |
| Nhắc lịch demo sản phẩm yến hũ cho khách lẻ Lê Thảo Vy | Medium | 2026-05-20 09:00 |
| Chốt lịch giao mẫu yến tinh chế cho Sài Gòn Pearl | High | 2026-05-21 14:00 |
| Follow-up đề xuất combo quà biếu cho Nam Long | Medium | 2026-05-22 11:00 |

### 6.3 Danh sách khách hàng

| Danh sách | Ý nghĩa phân nhóm |
| :-- | :-- |
| Khách lẻ | Khách mua trực tiếp, nhu cầu tiêu dùng cá nhân hoặc quà biếu nhỏ. |
| Đại lý \& đối tác | Khách mua sỉ, nhà phân phối, kênh cộng tác bán hàng. |
| VIP \& quà biếu doanh nghiệp | Nhóm khách giá trị cao, mua set quà, mua định kỳ hoặc theo mùa. |

## 7) Ghi chú triển khai

Thiết kế nên ưu tiên desktop-first vì PRD xác định đây là web app CRM cho vận hành nội bộ, cần thao tác dữ liệu nhanh và rõ. Với tone yến sào, điểm quan trọng nhất là giữ giao diện sang nhưng không nặng, dùng accent tiết chế và để typography, khoảng trắng, trật tự thị giác làm phần lớn công việc.[^2][^1]

Nếu cần, mình có thể chuyển ngay Design Brief này thành một **UI Style Guide dạng bảng spec cho Figma** hoặc **bộ prompt cho designer/dev**.

<div align="center">⁂</div>

[^1]: PRD-Yen-Sao-Vinh-Hung-Final-Approved-v2.docx

[^2]: PRD-yen-sao-vinh-hung-v1-by-Perplexity.docx

