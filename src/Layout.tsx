import NavHeader from "./NavHeader";
import "./layout.css";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-layout">
      <header>
        <NavHeader />
      </header>
      <main className="page-content">{children}</main>
    </div>
  );
};

export default Layout;
