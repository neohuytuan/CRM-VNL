-- Helper Functions để dùng trong Policies
-- Hàm lấy role hiện tại
CREATE OR REPLACE FUNCTION auth_user_role() RETURNS text AS $$
  SELECT role::text FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Hàm kiểm tra user có thuộc team đó không (cho trưởng nhóm)
CREATE OR REPLACE FUNCTION is_team_member(_team_id UUID) RETURNS boolean AS $$
  EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_id = _team_id AND user_id = auth.uid()
  )
$$ LANGUAGE sql SECURITY DEFINER;

-- Bật RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 1. Policy cho Leads
-- Sales thấy lead của mình
CREATE POLICY "Sales view own leads" ON leads FOR SELECT
USING (auth_user_role() = 'sales' AND owner_id = auth.uid());

-- Team Leader thấy lead của nhóm mình
CREATE POLICY "Team leader view team leads" ON leads FOR SELECT
USING (auth_user_role() = 'team_leader' AND is_team_member(team_id));

-- Admin thấy tất cả
CREATE POLICY "Admin view all leads" ON leads FOR ALL
USING (auth_user_role() = 'admin');

-- Sales được tạo / sửa lead của mình
CREATE POLICY "Sales modify own leads" ON leads FOR UPDATE
USING (auth_user_role() = 'sales' AND owner_id = auth.uid());

CREATE POLICY "Sales insert leads" ON leads FOR INSERT
WITH CHECK (auth_user_role() IN ('sales', 'team_leader', 'admin'));

-- 2. Policy cho Tasks
CREATE POLICY "View Tasks" ON tasks FOR SELECT
USING (
  auth_user_role() = 'admin' 
  OR (auth_user_role() = 'sales' AND assigned_to = auth.uid())
  OR (auth_user_role() = 'team_leader' AND assigned_to IN (SELECT user_id FROM team_members WHERE team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())))
);

-- 3. Policy cho Profiles
-- Mọi người có thể xem profile của nhau trong công ty
CREATE POLICY "Profiles are viewable by all users" ON profiles FOR SELECT
USING (auth.uid() IS NOT NULL);

-- User tự sửa profile của mình (trừ role)
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE
USING (auth.uid() = id);
