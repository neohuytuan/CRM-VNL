# CRM-VNL

Repository này chứa bản demo CRM tĩnh để deploy lên Vercel và gửi khách hàng xem trực tiếp.

## Cấu trúc chính

- `frontend/`
  - Ứng dụng React + Vite sẽ được build và publish
- `stitch_y_n_s_o_v_nh_h_ng_crm/`
  - Tài liệu và màn hình tham chiếu từ giai đoạn thiết kế
- `Supabase/`
  - Schema, seed và tài liệu nền cho backend sau này

## Deploy Vercel

Repository đã được cấu hình để deploy từ **repo root**.

- Root Directory: `/`
- Install Command: Vercel tự đọc từ `vercel.json`
- Build Command: Vercel tự đọc từ `vercel.json`
- Output Directory: Vercel tự đọc từ `vercel.json`

Không cần đổi sang thư mục `frontend`, và cũng không cần tự thêm route rewrite vì app đang dùng `HashRouter`.

## Chạy local từ repo root

```bash
npm run dev
npm run build
npm run lint
```

Các script ở root sẽ tự chạy app trong `frontend/`.
