use qlphim;

SELECT * FROM PHONG_CHIEU;
INSERT INTO PHONG_CHIEU (TenPhong, SoGhe, LoaiPhong) VALUES
('Phòng 5', 20, '2D');
select * from phong_chieu;
DELETE FROM phong_chieu WHERE MaPhong = 6;
DELETE FROM GHE WHERE MaPhong = 4;


select * from ghe where MaPhong = 1;

-- Procedure: thêm ghế tự động
DROP PROCEDURE IF EXISTS sp_them_ghe_tu_dong;
DELIMITER $$

CREATE PROCEDURE sp_them_ghe_tu_dong (
    IN p_MaPhong INT,
    IN p_SoCotToiDa INT,
    IN p_SoHangToiDa INT
)
BEGIN
    DECLARE hang INT DEFAULT 1;
    DECLARE cot INT;
    DECLARE ghe_ton_tai INT;

    -- Lặp theo hàng và cột để thêm ghế
    WHILE hang <= p_SoHangToiDa DO
        SET cot = 1;
        WHILE cot <= p_SoCotToiDa DO

            -- Kiểm tra nếu ghế đã tồn tại
            SELECT COUNT(*) INTO ghe_ton_tai
            FROM GHE
            WHERE MaPhong = p_MaPhong AND SoHang = hang AND SoGhe = cot;

            IF ghe_ton_tai = 0 THEN
                INSERT INTO GHE (MaPhong, SoHang, SoGhe, LoaiGhe)
                VALUES (p_MaPhong, hang, cot, 'Thường');
            END IF;

            SET cot = cot + 1;
        END WHILE;
        SET hang = hang + 1;
    END WHILE;
END$$

DELIMITER ;




CALL sp_them_ghe_tu_dong(4, 10);




