DELIMITER //

CREATE TRIGGER set_default_trangthai
BEFORE INSERT ON VE
FOR EACH ROW
BEGIN
  IF NEW.TrangThai IS NULL THEN
    SET NEW.TrangThai = 'Chưa sử dụng';
  END IF;
END;
//

DELIMITER ;
