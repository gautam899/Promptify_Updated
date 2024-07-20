import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Suspense } from "react";
import FeedbackBtn from "@components/FeedbackBtn";
export const metadata = {
  title: "Promtify",
  description: "Discover & Share AI Prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-stone-800 to-blue-900">
        <Provider>
          <main className="app">
            <Nav />
            <FeedbackBtn/>
            <Suspense>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
