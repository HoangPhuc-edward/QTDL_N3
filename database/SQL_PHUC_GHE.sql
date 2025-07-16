use qlphim;

SELECT * FROM GHE;

-- Function: Kiểm tra ghế có trống không
DROP FUNCTION IF EXISTS fn_ghe_co_trong;
DELIMITER $$
CREATE FUNCTION fn_ghe_co_trong(ma_ghe_phong_input VARCHAR(10))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE da_chiem INT;

    SELECT COUNT(*) INTO da_chiem
    FROM VE
    WHERE MaGhePhong = ma_ghe_phong_input
      AND TrangThai IN ('Đã đặt', 'Đã sử dụng');

    RETURN da_chiem = 0;
END$$
DELIMITER ;

-- Procedure: Lấy danh sách ghế trống, ứng dụng hàm đã nêu
DROP PROCEDURE IF EXISTS sp_ghe_trong;
DELIMITER $$
CREATE PROCEDURE sp_ghe_trong(IN phong_id INT)
BEGIN
    SELECT *
    FROM GHE
    WHERE MaPhong = phong_id
      AND fn_ghe_co_trong(MaGhePhong);
END$$
DELIMITER ;

-- Trigger: cập nhật số ghế trong phòng và format mã ghế phòng và mã ghế, mã phòng
DROP TRIGGER IF EXISTS trg_them_ghe;
DELIMITER $$
CREATE TRIGGER trg_them_ghe
BEFORE INSERT ON GHE
FOR EACH ROW
BEGIN
    DECLARE hang CHAR(1);
    DECLARE ghe_ma VARCHAR(6);
    DECLARE tong_ghe INT;

    -- Chuyển SoHang thành chữ (1=A, 2=B, ...)
    SET hang = CHAR(64 + NEW.SoHang); 

    -- Tạo MaGhe = A1, B2,...
    SET NEW.MaGhe = CONCAT(hang, NEW.SoGhe);

    -- Tạo MaGhePhong = P1A1
    SET NEW.MaGhePhong = CONCAT('P', NEW.MaPhong, NEW.MaGhe);

    -- Tính tổng số ghế hiện tại (bao gồm cả ghế sắp được thêm)
    SELECT COUNT(*) + 1 INTO tong_ghe
    FROM GHE
    WHERE MaPhong = NEW.MaPhong;

    -- Cập nhật lại SoGhe của PHONG_CHIEU nếu cần
    UPDATE PHONG_CHIEU
    SET SoGhe = tong_ghe
    WHERE MaPhong = NEW.MaPhong;
END$$
DELIMITER ;




