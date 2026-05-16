# CRM Yen Sao Vinh Hung

Ban nay la mot front-end CRM tinh, deploy Vercel on dinh, khong can dang nhap, duoc dung de demo cho khach va lam nen de noi backend sau.

## Stack

- React 19
- TypeScript
- Vite
- React Router voi `HashRouter`
- CSS tokens + reusable UI components
- Local persistence bang `localStorage`

## Chay local

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

Sau khi build, file tinh nam trong `dist/`.

## Deploy Vercel

1. Import thu muc `frontend` vao Vercel
2. Build command: `npm run build`
3. Output directory: `dist`
4. Khong can server rewrites vi app dang dung `HashRouter`

## Kien truc de noi backend sau

- `src/domain/types.ts`
  - model nghiep vu cho users, leads, customers, opportunities, tasks, payments, activities
- `src/data/seed.ts`
  - mock data ban dau
- `src/app/CRMContext.tsx`
  - state layer va action layer hien tai
- `src/modules/pages.tsx`
  - cac man hinh nghiep vu
- `src/components/`
  - button, badge, card, modal, drawer, icon

## Cach noi backend muot ve sau

1. Tach action trong `CRMContext.tsx` thanh service calls
2. Thay `seed.ts` va `localStorage` bang API/Supabase client
3. Giu nguyen view models trong `domain/types.ts` de UI khong phai viet lai
4. Neu can auth that, bo sung route guards va session provider

## Workflow da hoat dong trong ban demo

- Sidebar navigation
- Search toan app
- Leads: them lead, tao co hoi
- Danh sach: drawer chi tiet, sua khach, them ghi chu, tao task, tao co hoi
- Pipeline: keo tha stage, tao payment nhanh
- Tasks: board/list toggle, filter, doi trang thai, tao task
- Payments: loc, cap nhat trang thai, ghi nhan thanh toan
- Settings: chinh profile, xem role/team/tag, reset demo
- Activity Log: xem lich su theo loai
