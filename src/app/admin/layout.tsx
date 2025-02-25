import { Nav, NavLink } from "@/components/Nav";

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Nav>
      <NavLink href="/admin">Admin</NavLink>
      <NavLink href="/admin/users">Users</NavLink>
      <NavLink href="/admin/orders">Orders</NavLink>
      <NavLink href="/admin/products">Products</NavLink>
    </Nav>
    <div className="container mt-6 mx-auto">
      {children}
    </div>
  </>
}