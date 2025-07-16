// CREATE TABLE GHE (
//     MaGhePhong VARCHAR(10) PRIMARY KEY,
//     MaGhe VARCHAR(6),
//     MaPhong INT,
//     SoHang INT,
//     SoGhe INT,
//     LoaiGhe VARCHAR(100),
//     TrangThai INT NOT NULL DEFAULT 1,
//     FOREIGN KEY (MaPhong) REFERENCES PHONG_CHIEU(MaPhong)
// );

class Ghe {
  constructor(maPhong, soHang, soGhe, loaiGhe = "Thường", trangThai = 1) {
    let chuCai = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let chuHang = chuCai[soHang - 1];

    this.maGhe = `${chuHang}${soGhe}`;
    this.maGhePhong = `P${maPhong}${chuHang}${soGhe}`;

    this.maPhong = maPhong;
    this.soHang = soHang;
    this.soGhe = soGhe;
    this.loaiGhe = loaiGhe;
    this.trangThai = trangThai;
  }
}
module.exports = Ghe;
