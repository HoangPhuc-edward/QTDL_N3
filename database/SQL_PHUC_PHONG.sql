use qlphim;

SELECT * FROM PHONG_CHIEU;
INSERT INTO PHONG_CHIEU (TenPhong, SoGhe, LoaiPhong) VALUES
('Phòng 4', 60, '2D');
select * from phong_chieu;
DELETE FROM GHE WHERE MaPhong = 4;

select * from ghe where MaPhong = 4;

-- Procedure: thêm ghế tự động
DROP PROCEDURE IF EXISTS sp_them_ghe_tu_dong;
DELIMITER $$

CREATE PROCEDURE sp_them_ghe_tu_dong (
    IN p_MaPhong INT,
    IN p_SoCotToiDa INT
)
BEGIN
    DECLARE hang INT DEFAULT 1;
    DECLARE cot INT;
    DECLARE ghe_da_tao INT DEFAULT 0;
    DECLARE ghe_ton_tai INT;
    DECLARE tong_so_ghe INT;

    -- Lấy số ghế từ bảng PHONG_CHIEU
    SELECT SoGhe INTO tong_so_ghe
    FROM PHONG_CHIEU
    WHERE MaPhong = p_MaPhong;

    -- Nếu phòng không tồn tại, thoát
    IF tong_so_ghe IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phòng không tồn tại';
    END IF;

    -- Lặp và thêm ghế
    WHILE ghe_da_tao < tong_so_ghe DO
        SET cot = 1;
        WHILE cot <= p_SoCotToiDa AND ghe_da_tao < tong_so_ghe DO

            -- Kiểm tra nếu ghế đã tồn tại
            SELECT COUNT(*) INTO ghe_ton_tai
            FROM GHE
            WHERE MaPhong = p_MaPhong AND SoHang = hang AND SoGhe = cot;

            IF ghe_ton_tai = 0 THEN
                INSERT INTO GHE (MaPhong, SoHang, SoGhe, LoaiGhe)
                VALUES (p_MaPhong, hang, cot, 'Thường');

                SET ghe_da_tao = ghe_da_tao + 1;
            END IF;

            SET cot = cot + 1;
        END WHILE;
        SET hang = hang + 1;
    END WHILE;
END$$

DELIMITER ;



CALL sp_them_ghe_tu_dong(4, 10);




