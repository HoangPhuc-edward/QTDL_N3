DELIMITER //

-- ✅ Trigger: Gán giá trị mặc định cho TrangThai trước khi insert
CREATE TRIGGER set_default_trangthai
BEFORE INSERT ON VE
FOR EACH ROW
BEGIN
  IF NEW.TrangThai IS NULL THEN
    SET NEW.TrangThai = 'Chưa sử dụng';
  END IF;
END;
//

-- ✅ Trigger: Tính tổng tiền trước khi insert hóa đơn
CREATE TRIGGER tinh_tong_tien_hoa_don
BEFORE INSERT ON HOA_DON
FOR EACH ROW
BEGIN
  DECLARE gia DECIMAL(10, 2);

  SELECT GiaCombo INTO gia
  FROM BAP_NUOC
  WHERE MaCombo = NEW.MaCombo;

  SET NEW.TongTien = gia * NEW.SoLuongCombo;
END;
//

DELIMITER ;
DELIMITER //

CREATE TRIGGER update_tong_tien_hoa_don
BEFORE UPDATE ON HOA_DON
FOR EACH ROW
BEGIN
  DECLARE gia DECIMAL(10,2);

  SELECT GiaCombo INTO gia
  FROM BAP_NUOC
  WHERE MaCombo = NEW.MaCombo;

  SET NEW.TongTien = gia * NEW.SoLuongCombo;
END;
//

DELIMITER ;
