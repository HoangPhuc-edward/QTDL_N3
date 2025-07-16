DELIMITER //

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

CREATE TRIGGER update_tong_tien_hoa_don
BEFORE UPDATE ON HOA_DON
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
