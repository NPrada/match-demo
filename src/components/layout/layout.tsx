import Head from "next/head";
import Image from "next/image";
import * as React from "react";

import logo from "../../../public/assets/logo.svg";
import groupIcon from "../../../public/assets/group-icon.svg";
import navIcon1 from "../../../public/assets/nav-icon-1.svg";
import navIcon2 from "../../../public/assets/nav-icon-2.svg";
import navIcon3 from "../../../public/assets/nav-icon-3.svg";
import navIcon4 from "../../../public/assets/nav-icon-4.svg";
import navIcon5 from "../../../public/assets/nav-icon-5.svg";
import { AccountControls } from "../account-controls/account-controls";
import { AuthContextProvider } from "../context/auth-context";
import type { DehydratedState } from "@tanstack/react-query";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  dehydratedState,
}) => {
  const { current: queryClient } = React.useRef(new QueryClient());

  return (
    <>
      <Head>
        <title>MVP match demo</title>
        <meta name="description" content="coding challenge for mvp match" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <AuthContextProvider>
            <nav className="navigation">
              <div className="navigation-content">
                <div>
                  <Image src={logo} alt="logo" className="logo" />
                  <Image
                    src={groupIcon}
                    alt="group icon"
                    className="group-icon"
                  />
                </div>
                <AccountControls />
              </div>
            </nav>
            <div className="content-wrapper">
              <nav className="side-nav">
                {[navIcon1, navIcon2, navIcon3, navIcon4, navIcon5].map(
                  (src, i) => (
                    <Image
                      key={src + i}
                      src={src}
                      alt={`second nav logo${i}`}
                      className="side-nav-icon"
                    />
                  )
                )}
              </nav>
              <div className="vertical-content-wrapper">
                <main className="main-content">{children}</main>
                <footer className="footer">
                  <p className="text-highlighted">
                    Terms & Conditions | Privacy Policy
                  </p>
                </footer>
              </div>
            </div>
          </AuthContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};
