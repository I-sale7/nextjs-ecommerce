import { Nav, NavLink } from "@/components/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
    <Nav>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/products">products</NavLink>
      <NavLink href="/orders">Orders</NavLink>
    </Nav>
    <div className="container mt-6 mx-auto">
      {children}
    </div>
  </>
}