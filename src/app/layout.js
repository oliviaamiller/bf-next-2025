import Layout from "../components/layout/Layout";
import "@/styles/globals.scss";

export const metadata = {
  title: "My Contentful Site",
  description: "Built with Next.js + Contentful",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <main>{children}</main>
        </Layout>
      </body>
    </html>
  );
}
