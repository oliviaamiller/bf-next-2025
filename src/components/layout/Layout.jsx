import Header from "./Header";

export default function Layout({ children }) {
  return (
    <main className="page-wrapper">
      <Header />
      <div>{children}</div>
    </main>
  );
}
