-- Trigger khi INSERT hóa đơn: tính tổng tiền từ combo
DROP TRIGGER IF EXISTS tinh_tong_tien_hoa_don;
DELIMITER //

CREATE TRIGGER tinh_tong_tien_hoa_don
BEFORE INSERT ON HOA_DON
FOR EACH ROW
BEGIN
  DECLARE gia DECIMAL(10, 2) DEFAULT 0;

  -- Lấy giá combo nếu có
  IF NEW.MaCombo IS NOT NULL THEN
    SELECT GiaCombo INTO gia
    FROM BAP_NUOC
    WHERE MaCombo = NEW.MaCombo;
  END IF;

  -- Tính tổng tiền (chỉ combo, giả sử tiền vé cộng sau)
  SET NEW.TongTien = gia * NEW.SoLuongCombo;
END;
//
DELIMITER ;

-- Trigger khi UPDATE hóa đơn: cập nhật lại tổng tiền từ combo
DROP TRIGGER IF EXISTS update_tong_tien_hoa_don;
DELIMITER //

CREATE TRIGGER update_tong_tien_hoa_don
BEFORE UPDATE ON HOA_DON
FOR EACH ROW
BEGIN
  DECLARE gia DECIMAL(10, 2) DEFAULT 0;

  -- Lấy giá combo nếu có
  IF NEW.MaCombo IS NOT NULL THEN
    SELECT GiaCombo INTO gia
    FROM BAP_NUOC
    WHERE MaCombo = NEW.MaCombo;
  END IF;

  -- Cập nhật lại tổng tiền
  SET NEW.TongTien = gia * NEW.SoLuongCombo;
END;
//
DELIMITER ;
