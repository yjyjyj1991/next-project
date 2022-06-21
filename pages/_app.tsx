import "../styles/global.css";
import { AuthContextProvider } from "../context/AuthContext";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/protectedRoute";
import Navbar from "../components/navbar";

const noAuthRequired = ["/", "/login", "/forum"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <Navbar />
      <Layout>
        {/* {noAuthRequired.includes(router.pathname) ? ( */}
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
