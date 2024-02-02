import Navigation from "../molecules/navigation";
import Footer from "../molecules/footer";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navigation />
      <main className="flex flex-1 flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}
