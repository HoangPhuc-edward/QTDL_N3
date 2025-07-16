/*
CREATE TABLE PHONG_CHIEU (
    MaPhong INT AUTO_INCREMENT PRIMARY KEY,
    TenPhong VARCHAR(100),
    SoGhe INT,
    LoaiPhong VARCHAR(100),
    TrangThai INT NOT NULL DEFAULT 1
);
*/

class Phong {
  constructor(tenPhong, soGhe, loaiPhong, trangThai = 1) {
    this.tenPhong = tenPhong;
    this.soGhe = soGhe;
    this.loaiPhong = loaiPhong;
    this.trangThai = trangThai; // 1: active, 0: inactive
  }
}
