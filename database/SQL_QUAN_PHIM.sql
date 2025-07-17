DELIMITER $$

CREATE PROCEDURE TimKiemPhim(
  IN tenInput VARCHAR(255),
  IN theLoaiInput VARCHAR(255),
  IN daoDienInput VARCHAR(255)
)
BEGIN
  SELECT *
  FROM PHIM
  WHERE TrangThai = 1
    AND (tenInput IS NULL OR TenPhim LIKE CONCAT('%', tenInput, '%'))
    AND (theLoaiInput IS NULL OR TheLoai = theLoaiInput)
    AND (daoDienInput IS NULL OR DaoDien LIKE CONCAT('%', daoDienInput, '%'))
  ORDER BY NgayKhoiChieu DESC;
END $$

DELIMITER ;
