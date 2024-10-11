import "./globals.css";

export const metadata = {
  title: "Swyamvar.com",
  description: "Get your perfect match",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
