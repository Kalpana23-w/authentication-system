import "./globals.css";

export const metadata = {
  title: "Authentication App",
  description: "This app is generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
        {children}
      </body>
    </html>
  );
}
