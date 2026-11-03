# Website giả lập phục vụ đào tạo cán bộ, công chức

> ⚠️ **TOÀN BỘ CÁC TRANG TRONG KHO NÀY LÀ WEBSITE GIẢ LẬP, KHÔNG PHẢI HỆ THỐNG
> CỦA BẤT KỲ CƠ QUAN NHÀ NƯỚC NÀO.**
>
> Các trang không tiếp nhận hồ sơ, không xử lý thủ tục hành chính và không kết nối
> với bất kỳ hệ thống nào. Toàn bộ địa danh, họ tên, số giấy tờ và số liệu đều
> là hư cấu, do chương trình sinh ra.
>
> Nếu bạn đang cần làm thủ tục hành chính thật, xin truy cập Cổng Dịch vụ công
> quốc gia hoặc cổng dịch vụ công của tỉnh, thành phố nơi bạn cư trú.

---

## Các trang trong kho này

| Trang | Địa chỉ | Dùng cho khoá nào |
|---|---|---|
| **Cổng Dịch vụ công giả lập** | https://nntminh1983.github.io/boiduongkienthuccongngheso/ | Chiến lược xây dựng và phát triển Chính phủ số — bài thực hành Buổi 6 |
| **Sàn tập Dữ liệu và Quyết định** | https://nntminh1983.github.io/boiduongkienthuccongngheso/santap-dulieu/ | Ra quyết định dựa trên dữ liệu trong quản lý nhà nước — 10 buổi thực hành |
| **Sàn tập Tình huống AI và IoT** | https://nntminh1983.github.io/boiduongkienthuccongngheso/chuyende-ai-iot/ | Năm chuyên đề thực hành AI và IoT cho lãnh đạo, mở rộng 6 lĩnh vực: giám sát IoT và gợi ý quyết định |
| **Phòng thực hành Khoa học dữ liệu cho Lãnh đạo Sở** | https://nntminh1983.github.io/boiduongkienthuccongngheso/khdl-lanh-dao-so/ | Tám bài tập khoa học dữ liệu cho lãnh đạo Sở (8 lĩnh vực), bảng phân tích, đặt bài toán, phiếu quyết định |

Chi tiết trang thứ hai: xem [santap-dulieu/README.md](santap-dulieu/README.md).

---

# Trang 1 — Cổng Dịch vụ công giả lập

## Đây là gì

Một trang web tĩnh mô phỏng cổng dịch vụ công của tám xã, phường, xây dựng riêng cho
**Khoá bồi dưỡng kiến thức nền tảng về ứng dụng công nghệ mới** (chương trình
5 ngày). Trang dùng để học viên thao tác thật trong các bài thực hành về trí
tuệ nhân tạo, Internet vạn vật và khoa học dữ liệu, thay vì chỉ nghe giảng lý
thuyết.

Giảng viên: TS. Nguyễn Ngọc Trường Minh — iPMAC

## Vì sao mọi thứ đều hư cấu

Học viên là cán bộ, công chức. Các bài thực hành có bước tải dữ liệu lên công
cụ trực tuyến miễn phí, nên **không được dùng dữ liệu thật của cơ quan**. Bộ
dữ liệu giả lập cho phép học viên thao tác thoải mái mà không chạm vào bất kỳ
thông tin cá nhân hay số liệu thật nào.

Cụ thể:

- Địa danh **"tỉnh Minh Khê"** và tên tám xã, phường trên trang đều không có
  thật: An Thịnh, Bình Minh, Hoà Lạc, Kim Sơn, Long Phú, Mỹ Trạch, Nam Hải,
  Tân Phước.
- Mọi họ tên, số giấy tờ, số điện thoại, địa chỉ đều hư cấu. Số giấy tờ bắt
  đầu bằng 999 để không trùng dải số thật. Địa chỉ thư điện tử dùng tên miền
  `.invalid` nên không gửi thư tới được.
- Mọi con số về hồ sơ, thời hạn, điểm hài lòng, ngân sách đều sinh ngẫu nhiên
  theo phân bố định trước.
- Dữ liệu được **cố ý** thiết kế để chứa các vấn đề điển hình: ô trống, giá trị
  bất thường, thiết bị mất kết nối, cảm biến bị kẹt. Dữ liệu "sạch hoàn hảo"
  sẽ không dạy được gì.

## Các trang

| Trang | Nội dung |
|---|---|
| `index.html` | Trang chủ, số liệu tổng quan 8 đơn vị |
| `tra-cuu.html` | Tra cứu 3.295 hồ sơ mô phỏng theo mã và theo bộ lọc |
| `thu-tuc.html` | Danh mục thủ tục, thời hạn quy định và thời gian thực tế |
| `phan-anh.html` | 460 phản ánh mô phỏng, kèm biểu mẫu gửi mới |
| `dashboard.html` | Bảng thông tin điều hành mẫu |
| `iot.html` | Giám sát 28 thiết bị và dữ liệu cảm biến 15 ngày |
| `he-thong-ai.html` | Sổ đăng ký 15 hệ thống AI, học viên tự phân loại rủi ro |
| `thuc-hanh.html` | Dữ liệu thực hành: mã QR, tải bộ CSV giả lập (thư mục `tai_ve/`), bảng buổi nào dùng trang/tệp nào |

## Về kỹ thuật

Trang tĩnh thuần HTML, CSS và JavaScript. Không khung ứng dụng, không bước
biên dịch, không phụ thuộc bên ngoài.

- **Không có máy chủ xử lý, không có cơ sở dữ liệu.** Dữ liệu nhúng sẵn trong
  `du_lieu/*.js` dưới dạng biến JavaScript toàn cục.
- **Không thu thập bất kỳ thông tin nào.** Biểu mẫu gửi phản ánh và sổ đăng ký
  hệ thống AI chỉ chạy trong trình duyệt; nội dung nhập vào không được gửi đi
  đâu và mất khi đóng trang.
- **Không gọi ra bên ngoài.** Trang không tải phông chữ, thư viện hay mã thống
  kê từ máy chủ nào khác.
- Mở được bằng cách bấm đúp `index.html`, không cần máy chủ.

Trang đặt thẻ `robots: noindex` và có `robots.txt` chặn thu thập, để không xuất
hiện trong kết quả tìm kiếm.

## Giấy phép và phạm vi sử dụng

Chỉ dùng cho mục đích đào tạo. Không trích dẫn số liệu trên trang vào bất kỳ
văn bản chính thức nào. Không dùng ảnh chụp màn hình theo cách khiến người xem
hiểu nhầm đó là hệ thống thật.

---

## English summary

**This is a simulated Vietnamese public-services portal, built solely for a
government training course. It is not a real government website.** It does not
belong to, represent or impersonate any agency. The district and ward names are
invented, and every record, identifier and figure is randomly generated. The
site is fully static, stores nothing, and sends no data anywhere. Please do not
reuse it in any way that could suggest it is a genuine government system.
