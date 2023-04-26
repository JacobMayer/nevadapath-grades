import Navbar from "./navbar";
export default function Layout({ children }: any) {
  const links = [{ link: "/", label: "Home" }];
  return (
    <>
      <Navbar links={links} />
      <main className="pt-6">{children}</main>
    </>
  );
}
