use qlphim;

-- Thoi luong tinh theo phut
CREATE TABLE PHIM (
    MaPhim INT PRIMARY KEY,
    TenPhim VARCHAR(255),
    TheLoai VARCHAR(255),
    DaoDien VARCHAR(255),
    ThoiLuong INT,
    NgayKhoiChieu DATE,
    DoTuoi INT
);

-- Loai phong co 2D, 3D, IMAX
CREATE TABLE PHONG_CHIEU (
    MaPhong INT PRIMARY KEY,
    TenPhong VARCHAR(100),
    SoGhe INT,
    LoaiPhong VARCHAR(100)
);

CREATE TABLE SUAT_CHIEU (
    MaSC INT PRIMARY KEY,
    MaPhim INT,
    MaPhong INT,
    NgayChieu DATE,
    GioChieu TIME,
    GiaNguoiLon INT,
    GiaTreEm INT,
    FOREIGN KEY (MaPhim) REFERENCES PHIM(MaPhim),
    FOREIGN KEY (MaPhong) REFERENCES PHONG_CHIEU(MaPhong)
);

CREATE TABLE GHE (
    MaGhe INT PRIMARY KEY,
    MaPhong INT,
    SoHang INT,
    SoGhe INT,
    LoaiGhe VARCHAR(100),
    FOREIGN KEY (MaPhong) REFERENCES PHONG_CHIEU(MaPhong)
);

CREATE TABLE KHACH_HANG (
    MaKH INT PRIMARY KEY,
    TenKH VARCHAR(255),
    SDT VARCHAR(20),
    Email VARCHAR(100)
);

CREATE TABLE VE (
    MaVe INT PRIMARY KEY,
    MaSC INT,
    MaKH INT,
    MaGhe INT,
    NgayDat DATE,
    GiaVe INT,
    TrangThai VARCHAR(100),
    FOREIGN KEY (MaSC) REFERENCES SUAT_CHIEU(MaSC),
    FOREIGN KEY (MaKH) REFERENCES KHACH_HANG(MaKH),
    FOREIGN KEY (MaGhe) REFERENCES GHE(MaGhe)
);

CREATE TABLE BAP_NUOC (
    MaCombo INT PRIMARY KEY,
    TenCombo VARCHAR(100),
    GiaCombo INT,
    MoTa VARCHAR(255)
);

CREATE TABLE HOA_DON (
    MaHD INT PRIMARY KEY,
    MaKH INT,
    MaCombo INT,
    SoLuongCombo INT,
    NgayMua DATE,
    TongTien INT,
    FOREIGN KEY (MaKH) REFERENCES KHACH_HANG(MaKH),
    FOREIGN KEY (MaCombo) REFERENCES BAP_NUOC(MaCombo)
);

