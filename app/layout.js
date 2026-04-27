export const metadata = {
  title: "MBG Versus",
  description: "Seberapa besar anggaran MBG jika dibandingkan dengan kebutuhan nyata rakyat Indonesia?",
  openGraph: {
    title: "MBG Versus",
    description: "Seberapa besar anggaran MBG jika dibandingkan dengan kebutuhan nyata rakyat Indonesia?",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
