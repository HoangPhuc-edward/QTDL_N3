DROP TRIGGER IF EXISTS set_default_trangthai;
DELIMITER //

CREATE TRIGGER set_default_trangthai
BEFORE INSERT ON VE
FOR EACH ROW
BEGIN
  IF NEW.TrangThai IS NULL THEN
    SET NEW.TrangThai = 'Đã đặt';
  END IF;
END;
//

DELIMITER ;
