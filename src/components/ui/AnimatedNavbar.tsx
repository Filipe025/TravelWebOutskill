"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "../../lib/utils";
import ThemeToggle from "./ThemeToggle";

export function AnimatedNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div
      className={cn("fixed -top-1 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <div className="flex justify-end mb-2 pr-4">
        <ThemeToggle />
      </div>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Travel Tools">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/recommendations">Books & Movies</HoveredLink>
            <HoveredLink to="/visa-info">Visa Information</HoveredLink>
            <HoveredLink to="/currency-converter">Currency Converter</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Destinations">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Paris, France"
              href="/search?destination=Paris"
              src="https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=400"
              description="The city of lights and romance awaits your visit."
            />
            <ProductItem
              title="Tokyo, Japan"
              href="/search?destination=Tokyo"
              src="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400"
              description="Experience the perfect blend of tradition and modernity."
            />
            <ProductItem
              title="Bali, Indonesia"
              href="/search?destination=Bali"
              src="https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=400"
              description="Tropical paradise with stunning beaches and culture."
            />
            <ProductItem
              title="New York, USA"
              href="/search?destination=New York"
              src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400"
              description="The city that never sleeps with endless possibilities."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/about">About Us</HoveredLink>
            <HoveredLink to="/contact">Contact</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}