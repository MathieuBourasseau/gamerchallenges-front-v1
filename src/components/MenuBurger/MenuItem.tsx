import { Link } from "react-router-dom";
import type { MenuItemProps } from "../../types/menu";

function MenuItem({ label, to, closeMenu }: MenuItemProps) {
  return (
    <Link
      to={to}
      onClick={closeMenu}
      className="border-b border-white/30 pb-3 cursor-pointer hover:text-green-light transition"
    >
      {label}
    </Link>
  );
}

export default MenuItem;