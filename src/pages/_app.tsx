import { type AppType } from "next/dist/shared/lib/utils";
import { Roboto } from "@next/font/google";
import "../styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
