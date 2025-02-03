import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  return (
    <nav className=" bg-indigo-700 text-white p-3 ">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <ul className=" flex gap-3">
          <li>
            <Link href="/">Prodcuts</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
        </ul>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
export default Navbar;
