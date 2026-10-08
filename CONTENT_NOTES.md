# Nội dung website O-Bee

Các route: `/`, `/privacy-policy`, `/support`, `/terms`.

Bản tiếng Anh: `/en/`, `/en/privacy-policy`, `/en/support`, `/en/terms`. Nút VI/EN giữ nguyên trang tương ứng. Menu desktop, menu điện thoại và footer đều dẫn tới các trang chính sách, điều khoản và hỗ trợ.

Đổi VI/EN dùng `LocaleProvider` và History API, không điều hướng qua hai root layout và không tải lại document. Các component nhận `locale` làm giá trị ban đầu cho SSR, sau đó dùng context khi người dùng đổi ngôn ngữ. Nội dung, nav/footer, skip link, HTML `lang`, title và description cập nhật cùng nhau. URL giữ query/hash và vị trí phần đang đọc; Back/Forward đồng bộ lại locale. View Transitions tạo fade nhẹ, trình duyệt cũ dùng CSS fallback, reduced-motion cập nhật ngay. Khi JavaScript tắt, các link vẫn điều hướng tới HTML tĩnh đúng ngôn ngữ. Không đổi route hay cấu hình hosting.

Tham chiếu: [Next.js Native History API](https://nextjs.org/docs/app/getting-started/linking-and-navigating#native-history-api). Không thay nút locale bằng `Link` đơn thuần: hai root layout riêng hiện tại sẽ gây full page load khi điều hướng giữa chúng.

Nội dung song ngữ nằm tại `lib/locales.ts` và `lib/documents.ts`. Mỗi ngôn ngữ có HTML `lang` và metadata riêng. GSAP + ScrollTrigger điều khiển scroll parallax, text reveal và card stacking/pinning; Anime.js v4 điều khiển entrance timeline, stagger, hover spring và magnetic CTA. Hai engine tác động lên các lớp DOM riêng. Iconify dùng dữ liệu icon Lucide cục bộ, không gọi API icon bên ngoài.

Thiết kế theo `gpt-taste`: AIDA, hero Artistic Asymmetry với tiêu đề 2–3 dòng, bento 2×2 kín ô, inline photo/marquee và workflow pinning. Giữ Be Vietnam Pro cho cả headings/body để bộ dấu tiếng Việt nhất quán. Pinning chỉ bật khi viewport rộng ít nhất 1024px và cao ít nhất 700px; mobile hiển thị toàn bộ các thẻ theo luồng. Khi bật reduced-motion, bỏ parallax, pinning, entrance và marquee. Nội dung vẫn đọc được khi JavaScript chưa chạy.

Nền mesh, wash và blob dựng bằng CSS thay vì bitmap để co giãn tốt và nhẹ. Không thêm logo, badge hoặc số liệu giả vào hero; không tạo testimonial giả.

Chạy và kiểm tra:

```bash
pnpm install
pnpm run dev
pnpm run typecheck
pnpm run build
```

Kiểm tra trình duyệt: phục vụ `out/` ở `http://127.0.0.1:4173`, sau đó chạy `pnpm run test:browser`. Có thể đổi URL bằng `OBEE_PREVIEW_URL` và đường dẫn Chrome bằng `OBEE_CHROME_PATH`. Script kiểm tra 8 route, lang, nav, chuyển VI/EN, pinning, resize mobile, menu và reduced-motion; ảnh kiểm tra lưu trong `test-results/`.

Ảnh mới tạo bằng công cụ imagegen tích hợp, nén WebP và giữ ảnh cũ:

- `public/images/team-parallax.webp`: prompt — nhóm ba đồng nghiệp Việt Nam trao đổi lịch làm việc ở bàn gỗ trong văn phòng hiện đại; chủ thể lệch phải, khoảng trống bên trái, ánh sáng tự nhiên, sắc vàng/kem/charcoal; ảnh editorial chân thực, không logo, chữ đọc được hay UI.
- `public/images/workday-parallax.webp`: prompt — một nhân viên Việt Nam xem bảng lịch công việc trong văn phòng, góc nhìn ba phần tư, ánh sáng tự nhiên và tông ấm; bảng lịch không có chữ đọc được, không logo/UI/watermark.

Tham chiếu API: [Anime.js React scope/cleanup](https://animejs.com/documentation/getting-started/using-with-react/) và [Iconify React](https://iconify.design/docs/icon-components/react/). Ví dụ Anime.js v3 trong plan đã đổi sang API v4 (`createTimeline`, `animate`, `createScope`).

Next.js xuất site tĩnh vào `out/`. Nền tảng hosting cần phục vụ tệp `index.html` trong từng thư mục route để các URL như `/privacy-policy` truy cập trực tiếp được.

Trước khi công bố các trang pháp lý, cần xác nhận tên pháp nhân đầy đủ, thời hạn lưu giữ dữ liệu, các bên nhận dữ liệu và quy trình xử lý yêu cầu xóa với đơn vị vận hành. Site hiện dùng tên hiển thị `Ouransoft Group`, email `contact@ors.vn` và website `https://ors.vn` theo app O-Bee.

Ảnh ở trang chủ là ảnh minh họa tạo riêng cho website, không phải ảnh chụp giao diện O-Bee. Nếu cần giới thiệu giao diện sản phẩm, hãy dùng ảnh chụp từ bản chạy thật.

Thông tin liên hệ tập trung tại `lib/site.ts`. Website dùng Be Vietnam Pro từ gói `@fontsource/be-vietnam-pro`, bao gồm bộ ký tự tiếng Việt và được tự phục vụ cùng bản build. Các file Cabinet Grotesk cũ không còn được sử dụng.

Ảnh `team-hero.webp` được tạo theo mô tả: hai đồng nghiệp Việt Nam trao đổi lịch làm việc trong văn phòng hiện đại, không có logo hay giao diện phần mềm. Ảnh `attendance-story.webp` được tạo theo mô tả: nhân viên đến văn phòng cầm điện thoại, màn hình không đọc được. Cả hai dùng tông vàng O-Bee và đã được nén WebP.
