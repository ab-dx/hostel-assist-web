import { AuthUserProvider } from "@/context/AuthUserContext";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata = {
  title: "Hostel Assist",
  description: "Platform for managing hostel grievances",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthUserProvider>
            {children}
          </AuthUserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
