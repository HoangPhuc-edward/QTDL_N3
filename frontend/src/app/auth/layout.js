export default function AuthLayout({ children }) {
  console.log("⚡ Đang dùng Auth Layout");
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
