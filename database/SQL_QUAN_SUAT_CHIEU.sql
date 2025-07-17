DELIMITER $$

CREATE PROCEDURE GetSuatChieuTheoNgay(IN targetDate DATE)
BEGIN
  SELECT 
    PHIM.MaPhim,
    PHIM.TenPhim,
    PHIM.TheLoai,
    PHIM.ThoiLuong,
    SC.MaSC,
    SC.NgayChieu,
    SC.GioChieu,
    SC.GiaNguoiLon,
    SC.GiaTreEm,
    SC.MaPhong
  FROM SUAT_CHIEU SC
  JOIN PHIM ON PHIM.MaPhim = SC.MaPhim
  WHERE SC.NgayChieu = targetDate 
    AND SC.TrangThai = 1 
    AND PHIM.TrangThai = 1
  ORDER BY SC.GioChieu;
END$$

DELIMITER ;









DELIMITER $$

CREATE PROCEDURE TimSuatChieuSau15Phut(
  IN ngay DATE,
  IN gio TIME
)
BEGIN
  DECLARE gioCheck TIME;
  SET gioCheck = ADDTIME(gio, '00:15:00');

  SELECT 
    SC.MaSC,
    SC.NgayChieu,
    SC.GioChieu,
    PHIM.TenPhim,
    PHONG.TenPhong,
    SC.GiaNguoiLon,
    SC.GiaTreEm
  FROM SUAT_CHIEU SC
  JOIN PHIM ON PHIM.MaPhim = SC.MaPhim
  JOIN PHONG_CHIEU PHONG ON PHONG.MaPhong = SC.MaPhong
  WHERE SC.NgayChieu = ngay
    AND SC.GioChieu >= gioCheck
    AND SC.TrangThai = 1
    AND PHIM.TrangThai = 1
  ORDER BY SC.GioChieu;

END$$







DELIMITER $$

CREATE PROCEDURE GetSuatChieuConGhe(IN maPhimInput INT)
BEGIN
  SELECT 
    SC.MaSC,
    SC.NgayChieu,
    SC.GioChieu,
    PHONG.TenPhong,
    PHONG.SoGhe,
    
    -- Tính tổng số vé đã được đặt (trừ vé huỷ)
    (PHONG.SoGhe - COUNT(VE.MaVe)) AS SoGheConLai

  FROM SUAT_CHIEU SC
  JOIN PHONG_CHIEU PHONG ON SC.MaPhong = PHONG.MaPhong
  LEFT JOIN VE ON VE.MaSC = SC.MaSC AND VE.TrangThai != 'Đã hủy'
  WHERE SC.MaPhim = maPhimInput
    AND SC.TrangThai = 1

  GROUP BY SC.MaSC, SC.NgayChieu, SC.GioChieu, PHONG.TenPhong, PHONG.SoGhe
  HAVING SoGheConLai > 0
  ORDER BY SC.NgayChieu, SC.GioChieu;

END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE GetSuatChieuTheoPhim(IN targetMaPhim INT)
BEGIN
  SELECT 
    SC.MaSC,
    SC.NgayChieu,
    SC.GioChieu,
    SC.GiaNguoiLon,
    SC.GiaTreEm,
    PHONG.TenPhong
  FROM SUAT_CHIEU SC
  JOIN PHONG_CHIEU PHONG ON SC.MaPhong = PHONG.MaPhong
  WHERE SC.MaPhim = targetMaPhim AND SC.TrangThai = 1
  ORDER BY SC.NgayChieu, SC.GioChieu;
END $$

DELIMITER ;
