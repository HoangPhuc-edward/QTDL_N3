use qlphim;

SELECT * FROM GHE;

SELECT * 
FROM ghe
JOIN phong_chieu ON ghe.MaPhong = phong_chieu.MaPhong
JOIN ;

-- Function: Kiểm tra ghế có trống không
DROP FUNCTION IF EXISTS fn_ghe_co_trong;
DELIMITER $$
CREATE FUNCTION fn_ghe_co_trong(ma_ghe_phong_input VARCHAR(10), ma_sc INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE da_chiem INT;

    SELECT COUNT(*) INTO da_chiem
    FROM VE
    WHERE MaGhePhong = ma_ghe_phong_input
    	AND MaSC = ma_sc
      AND TrangThai IN ('Đã đặt', 'Đã sử dụng');

    RETURN da_chiem = 0;
END$$
DELIMITER ;

SELECT fn_ghe_co_trong('P1A2', 1);

-- Procedure: Lấy danh sách ghế trống, ứng dụng hàm đã nêu
DROP PROCEDURE IF EXISTS sp_ghe_trong;
DELIMITER $$

CREATE PROCEDURE sp_ghe_trong(IN ma_sc_input INT)
BEGIN
    DECLARE phong_id INT;

    -- Lấy mã phòng từ suất chiếu
    SELECT MaPhong INTO phong_id
    FROM SUAT_CHIEU
    WHERE MaSC = ma_sc_input;

    -- Nếu không tìm thấy suất chiếu, kết thúc
    IF phong_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Không tìm thấy suất chiếu';
    END IF;

    -- Trả về các ghế trống trong suất chiếu
    SELECT *
    FROM GHE
    WHERE MaPhong = phong_id
      AND fn_ghe_co_trong(MaGhePhong, ma_sc_input);
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


DROP PROCEDURE IF EXISTS sp_them_hoac_khoi_phuc_ghe;
DELIMITER $$

CREATE PROCEDURE sp_them_hoac_khoi_phuc_ghe (
    IN p_MaPhong INT,
    IN p_SoHang INT,
    IN p_SoGhe INT,
    IN p_LoaiGhe VARCHAR(100)
)
BEGIN
    DECLARE ghe_id VARCHAR(6);

    -- Tìm ghế đã tồn tại nhưng bị ẩn (TrangThai = 0)
    SELECT MaGhe INTO ghe_id
    FROM GHE
    WHERE MaPhong = p_MaPhong
      AND SoHang = p_SoHang
      AND SoGhe = p_SoGhe
      AND TrangThai = 0
    LIMIT 1;

    -- Nếu tồn tại -> Cập nhật trạng thái và loại ghế
    IF ghe_id IS NOT NULL THEN
        UPDATE GHE
        SET TrangThai = 1,
            LoaiGhe = p_LoaiGhe
        WHERE MaGhe = ghe_id;
    ELSE
        -- Nếu chưa tồn tại -> Thêm mới
        INSERT INTO GHE (MaPhong, SoHang, SoGhe, LoaiGhe, TrangThai)
        VALUES (p_MaPhong, p_SoHang, p_SoGhe, p_LoaiGhe, 1);
    END IF;
END$$

DELIMITER ;

CALL sp_them_hoac_khoi_phuc_ghe(2, 1, 1, 'Thường');

INSERT INTO GHE (MaGhePhong, MaGhe, MaPhong, SoHang, SoGhe, LoaiGhe, TrangThai)
            VALUES ('P1A3', 'A3', 1, 1, 3, 'VIP', 1);


