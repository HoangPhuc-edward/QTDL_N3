class NhanVien {
  /*
    CREATE TABLE NHAN_VIEN (
    MaNV INT AUTO_INCREMENT PRIMARY KEY,
    HoTenNV VARCHAR(255),
    SDT VARCHAR(20),
    MatKhau VARCHAR(100)
);
    */

  constructor(hoTenNV, sdt, matKhau) {
    this.hoTenNV = hoTenNV;
    this.sdt = sdt;
    this.matKhau = matKhau;
  }
}

module.exports = NhanVien;
