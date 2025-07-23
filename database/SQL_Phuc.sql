DROP DATABASE qlphim;

create database qlphim;

use qlphim;

-- Thoi luong tinh theo phut
CREATE TABLE PHIM (
    MaPhim INT AUTO_INCREMENT PRIMARY KEY,
    TenPhim VARCHAR(255),
    TheLoai VARCHAR(255),
    DaoDien VARCHAR(255),
    ThoiLuong INT,
    img VARCHAR(255),
    NgayKhoiChieu DATE,
    NgayKetThuc DATE,
    DoTuoi INT,
    TrangThai INT NOT NULL DEFAULT 1
);

-- Loai phong co 2D, 3D, IMAX
CREATE TABLE PHONG_CHIEU (
    MaPhong INT AUTO_INCREMENT PRIMARY KEY,
    TenPhong VARCHAR(100),
    SoGhe INT,
    LoaiPhong VARCHAR(100),
    TrangThai INT NOT NULL DEFAULT 1
);

CREATE TABLE SUAT_CHIEU (
    MaSC INT AUTO_INCREMENT PRIMARY KEY,
    MaPhim INT,
    MaPhong INT,
    NgayChieu DATE,
    GioChieu TIME,
    GiaNguoiLon INT,
    GiaTreEm INT,
    TrangThai INT NOT NULL DEFAULT 1,
    FOREIGN KEY (MaPhim) REFERENCES PHIM(MaPhim),
    FOREIGN KEY (MaPhong) REFERENCES PHONG_CHIEU(MaPhong)
);

CREATE TABLE GHE (
    MaGhePhong VARCHAR(10) PRIMARY KEY,
    MaGhe VARCHAR(6),
    MaPhong INT,
    SoHang INT,
    SoGhe INT,
    LoaiGhe VARCHAR(100),
    TrangThai INT NOT NULL DEFAULT 1,
    FOREIGN KEY (MaPhong) REFERENCES PHONG_CHIEU(MaPhong)
);

CREATE TABLE KHACH_HANG (
    MaKH INT AUTO_INCREMENT PRIMARY KEY,
    TenKH VARCHAR(255),
    SDT VARCHAR(20),
    Email VARCHAR(100)
);

CREATE TABLE VE (
    MaVe INT AUTO_INCREMENT PRIMARY KEY,
    MaSC INT,
    MaKH INT,
    MaGhePhong VARCHAR(10),
    NgayDat DATE,
    GiaVe INT,
    TrangThai VARCHAR(100),
    FOREIGN KEY (MaSC) REFERENCES SUAT_CHIEU(MaSC),
    FOREIGN KEY (MaKH) REFERENCES KHACH_HANG(MaKH),
    FOREIGN KEY (MaGhePhong) REFERENCES GHE(MaGhePhong)
);

CREATE TABLE BAP_NUOC (
    MaCombo INT AUTO_INCREMENT PRIMARY KEY,
    TenCombo VARCHAR(100),
    GiaCombo INT,
    MoTa VARCHAR(255)
);

CREATE TABLE NHAN_VIEN (
    MaNV INT AUTO_INCREMENT PRIMARY KEY,
    HoTenNV VARCHAR(255),
    SDT VARCHAR(20),
    MatKhau VARCHAR(100)
);

CREATE TABLE HOA_DON (
    MaHD INT AUTO_INCREMENT PRIMARY KEY,
    MaKH INT,
    MaCombo INT,
    SoLuongCombo INT,
    NgayMua DATE,
    TongTien INT,
    FOREIGN KEY (MaKH) REFERENCES KHACH_HANG(MaKH),
    FOREIGN KEY (MaCombo) REFERENCES BAP_NUOC(MaCombo)
);








INSERT INTO PHIM (TenPhim, TheLoai, DaoDien, ThoiLuong, img, NgayKhoiChieu, NgayKetThuc, DoTuoi)
VALUES 
('Avengers: Endgame', 'Hành động', 'Anthony Russo', 181, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-01', '2025-07-31', 13),
('Inception', 'Khoa học viễn tưởng', 'Christopher Nolan', 148, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-01', '2025-07-30', 13),
('Coco', 'Hoạt hình', 'Lee Unkrich', 105, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-05', '2025-07-25', 6),
('Parasite', 'Tâm lý', 'Bong Joon-ho', 132, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-10', '2025-07-30', 16),
('Frozen 2', 'Hoạt hình', 'Chris Buck', 103, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-01', '2025-07-25', 0),
('Joker', 'Tâm lý', 'Todd Phillips', 122, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-01', '2025-07-31', 18),
('Interstellar', 'Khoa học viễn tưởng', 'Christopher Nolan', 169, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-01', '2025-07-30', 13),
('Minions', 'Hoạt hình', 'Kyle Balda', 91, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-01', '2025-07-20', 0),
('Aquaman', 'Hành động', 'James Wan', 143, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-01', '2025-07-29', 13),
('The Lion King', 'Hoạt hình', 'Jon Favreau', 118, 'https://res.cloudinary.com/drwuzd09a/image/upload/v1753241788/jwjerwo6qgqgi27slk6l.webp', '2025-07-01', '2025-07-30', 0);




INSERT INTO PHONG_CHIEU (TenPhong, SoGhe, LoaiPhong)
VALUES 
('Phòng 2D A1', 100, '2D'),
('Phòng 2D A2', 90, '2D'),
('Phòng 3D B1', 120, '3D'),
('Phòng IMAX C1', 150, 'IMAX'),
('Phòng 3D B2', 110, '3D'),
('Phòng 2D A3', 80, '2D'),
('Phòng 2D A4', 85, '2D'),
('Phòng 3D B3', 95, '3D'),
('Phòng IMAX C2', 140, 'IMAX'),
('Phòng 2D A5', 100, '2D');



INSERT INTO SUAT_CHIEU (MaPhim, MaPhong, NgayChieu, GioChieu, GiaNguoiLon, GiaTreEm)
VALUES 
(1, 1, '2025-07-23', '10:00:00', 100000, 80000),
(2, 2, '2025-07-23', '13:00:00', 95000, 70000),
(3, 3, '2025-07-23', '09:00:00', 80000, 60000),
(4, 4, '2025-07-23', '14:00:00', 110000, 90000),
(5, 5, '2025-07-23', '15:00:00', 85000, 65000),
(6, 6, '2025-07-23', '16:00:00', 95000, 75000),
(7, 7, '2025-07-23', '17:00:00', 100000, 80000),
(8, 8, '2025-07-23', '18:00:00', 75000, 50000),
(9, 9, '2025-07-23', '19:00:00', 100000, 80000),
(10, 10, '2025-07-23', '20:00:00', 95000, 70000);



INSERT INTO GHE (MaGhePhong, MaGhe, MaPhong, SoHang, SoGhe, LoaiGhe)
VALUES 
('A1-01', 'A1', 1, 1, 1, 'Thường'),
('A1-02', 'A2', 1, 1, 2, 'Thường'),
('A2-01', 'A1', 2, 1, 1, 'Thường'),
('B1-01', 'A1', 3, 1, 1, 'VIP'),
('B2-01', 'B1', 5, 1, 1, 'VIP'),
('C1-01', 'A1', 4, 1, 1, 'Thường'),
('C2-01', 'B2', 9, 1, 1, 'Thường'),
('A5-01', 'C1', 10, 1, 1, 'Thường'),
('A3-01', 'A1', 6, 1, 1, 'VIP'),
('A4-01', 'A1', 7, 1, 1, 'VIP');



INSERT INTO KHACH_HANG (TenKH, SDT, Email)
VALUES 
('Nguyễn Văn A', '0909123456', 'a@example.com'),
('Trần Thị B', '0909234567', 'b@example.com'),
('Lê Văn C', '0909345678', 'c@example.com'),
('Phạm Thị D', '0909456789', 'd@example.com'),
('Hoàng Văn E', '0909567890', 'e@example.com'),
('Vũ Thị F', '0909678901', 'f@example.com'),
('Đặng Văn G', '0909789012', 'g@example.com'),
('Bùi Thị H', '0909890123', 'h@example.com'),
('Trịnh Văn I', '0909901234', 'i@example.com'),
('Đoàn Thị K', '0910012345', 'k@example.com');



INSERT INTO VE (MaSC, MaKH, MaGhePhong, NgayDat, GiaVe, TrangThai)
VALUES 
(1, 1, 'A1-01', '2025-07-20', 100000, 'Đã đặt'),
(2, 2, 'A1-02', '2025-07-20', 95000, 'Đã sử dụng'),
(3, 3, 'A2-01', '2025-07-20', 80000, 'Đã đặt'),
(4, 4, 'B1-01', '2025-07-20', 110000, 'Đã hủy'),
(5, 5, 'B2-01', '2025-07-21', 85000, 'Đã đặt'),
(6, 6, 'C1-01', '2025-07-21', 95000, 'Đã sử dụng'),
(7, 7, 'C2-01', '2025-07-21', 100000, 'Đã đặt'),
(8, 8, 'A5-01', '2025-07-21', 75000, 'Đã đặt'),
(9, 9, 'A3-01', '2025-07-21', 100000, 'Đã sử dụng'),
(10, 10, 'A4-01', '2025-07-21', 95000, 'Đã hủy');



INSERT INTO BAP_NUOC (TenCombo, GiaCombo, MoTa)
VALUES 
('Combo 1', 50000, '1 bắp + 1 nước'),
('Combo 2', 70000, '1 bắp lớn + 1 nước lớn'),
('Combo Gia đình', 120000, '2 bắp + 2 nước'),
('Combo Cặp đôi', 90000, '2 nước + 1 bắp'),
('Combo Trẻ em', 40000, '1 bắp nhỏ + 1 nước nhỏ'),
('Combo VIP', 150000, 'Bắp đặc biệt + nước ngoại'),
('Combo Sinh nhật', 200000, 'Trang trí + đồ ăn đặc biệt'),
('Combo 3 người', 130000, '3 nước + 1 bắp lớn'),
('Combo Trưa', 60000, '1 nước + snack'),
('Combo Nhẹ nhàng', 55000, 'Bắp nhỏ + trà sữa');



INSERT INTO NHAN_VIEN (HoTenNV, SDT, MatKhau)
VALUES 
('Nguyễn Nhân Viên', '0909123000', '123456'),
('Trần NV', '0909233000', '123456'),
('Lê NV', '0909343000', '123456'),
('Phạm NV', '0909453000', '123456'),
('Hoàng NV', '0909563000', '123456'),
('Vũ NV', '0909673000', '123456'),
('Đặng NV', '0909783000', '123456'),
('Bùi NV', '0909893000', '123456'),
('Trịnh NV', '0909903000', '123456'),
('Đoàn NV', '0910003000', '123456');



INSERT INTO HOA_DON (MaKH, MaCombo, SoLuongCombo, NgayMua, TongTien)
VALUES 
(1, 1, 1, '2025-07-20', 150000),
(2, 2, 2, '2025-07-20', 190000),
(3, 3, 1, '2025-07-20', 200000),
(4, 4, 3, '2025-07-20', 270000),
(5, 5, 2, '2025-07-21', 170000),
(6, 6, 1, '2025-07-21', 245000),
(7, 7, 2, '2025-07-21', 240000),
(8, 8, 1, '2025-07-21', 205000),
(9, 9, 2, '2025-07-21', 220000),
(10, 10, 1, '2025-07-21', 150000);




