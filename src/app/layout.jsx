import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Authprovider } from "./Providers";

export const metadata = {
  title: "Thread",
  description: "Partagez des threads !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-threads-gray">
        <Authprovider>{children}</Authprovider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
