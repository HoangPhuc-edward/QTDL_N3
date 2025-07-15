USE qlphim;

-- PHIM
INSERT INTO PHIM (TenPhim, TheLoai, DaoDien, ThoiLuong, NgayKhoiChieu, DoTuoi) VALUES
('Avengers: Endgame', 'Hành động', 'Anthony Russo', 181, '2019-04-26', 13),
('Your Name', 'Tình cảm, giả tưởng', 'Makoto Shinkai', 107, '2016-08-26', 10),
('Parasite', 'Tâm lý, xã hội', 'Bong Joon-ho', 132, '2019-05-30', 18);

-- PHONG_CHIEU
INSERT INTO PHONG_CHIEU (TenPhong, SoGhe, LoaiPhong) VALUES
('Phòng 1', 60, '2D'),
('Phòng 2', 80, '3D'),
('Phòng VIP', 40, 'IMAX');

-- SUAT_CHIEU
INSERT INTO SUAT_CHIEU (MaPhim, MaPhong, NgayChieu, GioChieu, GiaNguoiLon, GiaTreEm) VALUES
(1, 1, '2025-07-16', '14:00:00', 80000, 50000),
(2, 2, '2025-07-16', '16:30:00', 70000, 40000),
(3, 3, '2025-07-17', '18:00:00', 90000, 60000);

-- GHE (giả sử mỗi phòng có 2 ghế)
INSERT INTO GHE (MaGhePhong, MaGhe, MaPhong, SoHang, SoGhe, LoaiGhe) VALUES
('P1A1', 'A1', 1, 1, 1, 'Thường'),
('P1A2', 'A2', 1, 1, 2, 'VIP'),
('P2B1', 'B1', 2, 2, 1, 'Thường'),
('P2B2', 'B2', 2, 2, 2, 'Thường'),
('P3C1', 'C1', 3, 3, 1, 'VIP');

-- KHACH_HANG
INSERT INTO KHACH_HANG (TenKH, SDT, Email) VALUES
('Nguyễn Văn A', '0909123456', 'a@gmail.com'),
('Trần Thị B', '0912345678', 'b@yahoo.com'),
('Lê Văn C', '0988765432', 'c@outlook.com');

-- VE
INSERT INTO VE (MaSC, MaKH, MaGhePhong, NgayDat, GiaVe, TrangThai) VALUES
(1, 1, 'P1A1', '2025-07-15', 80000, 'Đã đặt'),
(2, 2, 'P2B1', '2025-07-15', 70000, 'Đã sử dụng'),
(3, 3, 'P3C1', '2025-07-15', 90000, 'Đã hủy');

-- BAP_NUOC
INSERT INTO BAP_NUOC (TenCombo, GiaCombo, MoTa) VALUES
('Combo 1', 50000, 'Bắp ngọt + nước ngọt'),
('Combo 2', 70000, 'Bắp phô mai + Pepsi'),
('Combo VIP', 100000, 'Bắp caramel + nước lớn + snack');

-- NHAN_VIEN
INSERT INTO NHAN_VIEN (HoTenNV, SDT, MatKhau) VALUES
('Nguyễn Nhân Viên', '0909123456', 'matkhau1'),
('Trần Nhân Viên', '0911223344', 'matkhau2');

-- HOA_DON
INSERT INTO HOA_DON (MaKH, MaNV, MaCombo, SoLuongCombo, NgayMua, TongTien) VALUES
(1, 1, 1, 2, '2025-07-15', 100000),
(2, 2, 2, 1, '2025-07-15', 70000),
(3, 1, 3, 1, '2025-07-15', 100000);
