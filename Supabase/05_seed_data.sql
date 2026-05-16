-- Seed Danh sách / Pipeline Stages
INSERT INTO pipeline_stages (name, order_index, color) VALUES 
('Mới', 1, '#F3E1B8'), 
('Đang làm việc', 2, '#F3EBDD'), 
('Chờ chốt', 3, '#C89B4A'), 
('Đã chốt', 4, '#7E9470'), 
('Huỷ', 5, '#B45C4D');

INSERT INTO lead_lists (name, description) VALUES 
('Khách lẻ', 'Khách mua tiêu dùng cá nhân'),
('Đại lý', 'Đại lý phân phối sỉ'),
('VIP', 'Khách giá trị cao, quà biếu doanh nghiệp');

-- Seed Team
INSERT INTO teams (name, description) VALUES ('Nhóm Kinh Doanh HCM', 'Phụ trách khu vực miền Nam');

-- (Giả định Admin đã đăng ký qua giao diện và có UUID, chúng ta insert leads mẫu)
-- Thay thế 'UUID_CỦA_USER' và 'UUID_CỦA_TEAM' bằng ID thật sau khi có user.
/*
INSERT INTO leads (full_name, company, expected_value, list_id, stage_id) VALUES 
('Nguyễn Thu Hương', 'Công ty TNHH Thương mại Dịch vụ An Khang', 48000000, (SELECT id FROM lead_lists WHERE name='VIP'), (SELECT id FROM pipeline_stages WHERE name='Đang làm việc')),
('Trần Minh Quân', 'Công ty CP Dược phẩm Pharmacity', 62000000, (SELECT id FROM lead_lists WHERE name='Đại lý'), (SELECT id FROM pipeline_stages WHERE name='Chờ chốt'));

INSERT INTO lead_tags (lead_id, tag_name) VALUES 
('UUID_LEAD_1', 'Set quà cao cấp'), ('UUID_LEAD_1', 'Yến tinh chế');
*/
