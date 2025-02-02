import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" bg-indigo-700 text-white p-5">
      <ul className="max-w-5xl mx-auto flex gap-3">
        <li>
          <Link href="/">Prodcuts</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
