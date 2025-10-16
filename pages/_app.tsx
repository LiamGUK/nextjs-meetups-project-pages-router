import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

/**
 *
 * _app component acts as the initial starting point for Next.js pages apps - will look at this file first to render all routes from
 *
 * Set global css file import in here to share global styles throughout entire app
 *
 */

// pageProps are passed to the App Component automatically by Next.js - pageProps are the contents that should be rendered
// Component is the main component function used to render a page
export default function App({ Component, pageProps }: AppProps) {
  return (
    // Adding the Layout component and wrapping around the main Component in here would result in all page routes sharing and inheriting the Layout component - every page would receive the navigation bar
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
