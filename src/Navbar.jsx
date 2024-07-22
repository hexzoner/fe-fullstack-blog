import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="text-center py-6 bg-base-300">
      <ul className="flex justify-between max-w-[700px] m-auto text-lg font-semibold">
        <NavLink to={"/"} className={({ isActive }) => (isActive ? "underline underline-offset-2" : "")}>
          <li>Home</li>
        </NavLink>
        <NavLink to={"create-post"} className={({ isActive }) => (isActive ? "underline underline-offset-2" : "")}>
          <li>Create a Post</li>
        </NavLink>
      </ul>
    </div>
  );
}
