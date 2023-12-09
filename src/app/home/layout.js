import Menu from "./menu";

export default function RootLayout({ children }) {
  return (
    <main><Menu>{children}</Menu></main>
  )
}
