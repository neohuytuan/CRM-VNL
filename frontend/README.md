# CRM Yến Sào Vĩnh Hưng

Đây là front-end CRM tĩnh, không cần đăng nhập, dùng để demo cho khách và làm nền để nối backend sau này.

## Stack

- React 19
- TypeScript
- Vite
- React Router với `HashRouter`
- Reusable UI components
- Dữ liệu demo lưu bằng `localStorage`

## Chạy local trong thư mục `frontend`

```bash
npm install
npm run dev
```

## Build production trong thư mục `frontend`

```bash
npm run build
```

Sau khi build, file tĩnh nằm trong `dist/`.

## Deploy Vercel

Repository hiện đã được sắp xếp để deploy từ **repo root**, không cần import riêng thư mục `frontend`.

Thiết lập khuyến nghị:

1. Import toàn bộ repository `CRM-VNL` vào Vercel
2. Root Directory: để mặc định là `/`
3. Vercel sẽ đọc `vercel.json` ở root và tự build app trong `frontend`
4. Không cần thêm rewrite cho route vì app đang dùng `HashRouter`

## Chạy lệnh từ repo root

Bạn cũng có thể chạy từ thư mục gốc của repository:

```bash
npm run dev
npm run build
npm run lint
```

Các script này sẽ tự forward vào `frontend/`.

## Kiến trúc để nối backend sau

- `src/domain/types.ts`
  - Model nghiệp vụ cho users, leads, customers, opportunities, tasks, payments, activities
- `src/data/seed.ts`
  - Mock data ban đầu
- `src/app/CRMContext.tsx`
  - State layer và action layer hiện tại
- `src/modules/`
  - Các màn hình nghiệp vụ
- `src/components/`
  - Button, badge, card, modal, drawer, icon và page primitives

## Cách nối backend mượt về sau

1. Tách action trong `CRMContext.tsx` thành service calls
2. Thay `seed.ts` và `localStorage` bằng API hoặc Supabase client
3. Giữ nguyên view model trong `domain/types.ts` để UI không phải viết lại
4. Nếu cần auth thật, bổ sung route guards và session provider

## Workflow đang hoạt động trong bản demo

- Sidebar navigation
- Search toàn app
- Leads: thêm lead, tạo cơ hội
- Danh sách khách hàng: mở chi tiết, sửa thông tin, thêm ghi chú, tạo task, tạo cơ hội
- Pipeline: kéo thả stage, tạo thanh toán nhanh
- Tasks: board/list toggle, filter, đổi trạng thái, tạo task
- Payments: lọc, cập nhật trạng thái, ghi nhận thanh toán
- Settings: chỉnh profile, xem role/team/tag, reset demo
- Activity Log: xem lịch sử theo loại
