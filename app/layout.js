export const metadata = {
  title: "MBG Versus",
  description: "Bandingkan anggaran MBG dengan kebutuhan nyata rakyat Indonesia.",
  openGraph: {
    title: "MBG Versus",
    description: "Bandingkan anggaran MBG dengan kebutuhan nyata rakyat Indonesia.",
    images: ["https://raw.githubusercontent.com/ridwantaufik11/mbg-versus/main/app/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://raw.githubusercontent.com/ridwantaufik11/mbg-versus/main/app/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
