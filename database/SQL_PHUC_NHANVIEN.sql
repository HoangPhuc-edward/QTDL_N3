use qlphim;

-- NHAN VIEN
SELECT * FROM NHAN_VIEN;

DELETE FROM NHAN_VIEN where MaNV = 5;

DELIMITER $$
CREATE FUNCTION fn_kiem_tra_sdt_ton_tai(sdt_input VARCHAR(20))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE ton_tai BOOLEAN;

    SELECT COUNT(*) > 0 INTO ton_tai
    FROM NHAN_VIEN
    WHERE SDT = sdt_input;

    RETURN ton_tai;
END$$
DELIMITER ;


-- Dang nhap
DROP FUNCTION IF EXISTS fn_dang_nhap;
DELIMITER $$
CREATE FUNCTION fn_dang_nhap(sdt_input VARCHAR(20), matkhau_input VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE hop_le BOOLEAN;

    SELECT COUNT(*) > 0 INTO hop_le
    FROM NHAN_VIEN
    WHERE SDT = sdt_input
      AND MatKhau = SHA2(matkhau_input, 256);

    RETURN hop_le;
END$$
DELIMITER ;

-- Đăng ký
DROP PROCEDURE IF EXISTS sp_dang_ky;
DELIMITER $$

CREATE PROCEDURE sp_dang_ky (
    IN ho_ten_input VARCHAR(255),
    IN sdt_input VARCHAR(20),
    IN matkhau_input VARCHAR(100)
)
BEGIN
    IF fn_kiem_tra_sdt_ton_tai(sdt_input) THEN
        SELECT 'Số điện thoại đã tồn tại' AS ThongBao;
    ELSE
        INSERT INTO NHAN_VIEN (HoTenNV, SDT, MatKhau)
        VALUES (ho_ten_input, sdt_input, SHA2(matkhau_input, 256));
        SELECT 'Đăng ký thành công' AS ThongBao;
    END IF;
END$$
DELIMITER ;


SELECT fn_kiem_tra_sdt_ton_tai('0909123459') as KT_SDT;
SELECT fn_dang_nhap('0909123456', 'matkhau2') as DANG_NHAP;
CALL sp_dang_ky('Ngô Văn D', '0988123451', '123456');
