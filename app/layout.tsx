import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulse — Analytics overview",
  description: "An interactive analytics dashboard for your business.",
};

const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('pulse-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
