import { MdSearch } from "react-icons/md";
import scanIcon from "../assets/cart.png";

function Header({ search, setSearch }) {
  return (
    <header className="flex items-center gap-2 mb-4">
      <h1 className="text-xl font-bold flex items-center gap-2 flex-1"><img className="w-8 h-8 object-contain" src={scanIcon} alt=""/>Products</h1>
      <div className="flex items-center bg-gray-800 rounded-md px-2">
        <MdSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-transparent outline-none px-2 py-1 text-sm"
        />
      </div>
    </header>
  );
``}   

export default Header;
