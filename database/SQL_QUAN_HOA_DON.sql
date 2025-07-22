-- DELIMITER //

-- CREATE TRIGGER tinh_tong_tien_hoa_don
-- BEFORE INSERT ON HOA_DON
-- FOR EACH ROW
-- BEGIN
--   DECLARE gia DECIMAL(10, 2);

--   SELECT GiaCombo INTO gia
--   FROM BAP_NUOC
--   WHERE MaCombo = NEW.MaCombo;

--   SET NEW.TongTien = NEW.TongTien + gia * NEW.SoLuongCombo;
-- END;
-- //

-- DELIMITER //

DROP TRIGGER IF EXISTS tinh_tong_tien_hoa_don;

DELIMITER //

CREATE TRIGGER tinh_tong_tien_hoa_don
BEFORE INSERT ON HOA_DON
FOR EACH ROW
BEGIN
  DECLARE gia_combo DECIMAL(10, 2) DEFAULT 0;
  DECLARE tong_gia_ve DECIMAL(10, 2) DEFAULT 0;

  -- Lấy giá combo
  IF NEW.MaCombo IS NOT NULL THEN
    SELECT GiaCombo INTO gia_combo
    FROM BAP_NUOC
    WHERE MaCombo = NEW.MaCombo;
  END IF;

  -- Tính tổng giá vé của khách hàng này chưa có hóa đơn
  SELECT COALESCE(SUM(GiaVe), 0) INTO tong_gia_ve
  FROM VE
  WHERE MaKH = NEW.MaKH
    AND MaVe NOT IN (SELECT MaVe FROM HOA_DON HD
                     JOIN VE V ON HD.MaKH = V.MaKH);

  -- Gán tổng tiền
  SET NEW.TongTien = gia_combo * NEW.SoLuongCombo + tong_gia_ve;
END;
//

DELIMITER ;



CREATE TRIGGER update_tong_tien_hoa_don
BEFORE UPDATE ON HOA_DON
FOR EACH ROW
BEGIN
  DECLARE gia DECIMAL(10, 2);

  SELECT GiaCombo INTO gia
  FROM BAP_NUOC
  WHERE MaCombo = NEW.MaCombo;

  SET NEW.TongTien = NEW.TongTien + gia * NEW.SoLuongCombo;
END;
//

DELIMITER ;
