import Navbar from "@/components/shared/navbar";
import { ThemeProvider } from "@/components/shared/theme-provider";


export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}