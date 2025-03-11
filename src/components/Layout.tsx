import "../styles/main.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
