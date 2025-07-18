"use client";

import { useEffect, useState } from "react";
import { getNavigationMenu } from "@/lib/contentful";
import "@/styles/components/_navigationMenu.scss";

export default function NavigationMenu() {
  const [menu, setMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadMenu() {
      const data = await getNavigationMenu();
      setMenu(data);
    }

    loadMenu();
  }, []);

  if (!menu) return null;

  return (
    <nav className="nav-wrapper">
      <button
        className={`nav-icon ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        aria-controls="nav-menu"
      />
      <ul className={`menu ${isOpen ? "open" : ""}`}>
        {menu.pages?.map((page, index) => (
          <li key={index}>
            <a href={`/${page.fields.slug}`}>{page.fields.slug}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
