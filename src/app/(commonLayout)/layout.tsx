import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { getUserInfo } from "@/services/auth.services";


export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getUserInfo()
  const userActive = !!user?.id

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex min-h-screen flex-col">
        <Navbar userActive={userActive}/>
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}