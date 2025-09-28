import Logo from "@/app/(public)/_component/Logo";
import NavList from "@/app/(public)/_component/NavList";
import UserNav from "@/app/(public)/_component/UserNav";

export default function Header() {
  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b py-5 backdrop-blur-sm">
      <nav className="flex items-center px-5">
        <aside className="flex items-center gap-6">
          <Logo />
          <NavList />
        </aside>
        <UserNav />
      </nav>
    </header>
  );
}
