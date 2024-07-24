import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="text-center py-6 bg-base-300">
      <ul className="flex justify-around md:justify-between max-w-[800px] m-auto text-lg font-semibold">
        <NavLink to={"/"} className={({ isActive }) => (isActive ? "underline underline-offset-2" : "")}>
          <li className="hover:text-primary">Home</li>
        </NavLink>
        <NavLink to={"create-post"} className={({ isActive }) => (isActive ? "underline underline-offset-2" : "")}>
          <li className="hover:text-primary">Create a Post</li>
        </NavLink>
      </ul>
    </div>
  );
}
