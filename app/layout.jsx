import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html Lang="en">
      <body>
        <div className="main">
          <div className="gradient" />

          <main className="app">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
