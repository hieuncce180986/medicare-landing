import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import FacebookPageEmbed from "./facebook";
import { ROUTES, SOCIAL_LINKS } from "@/utils/route";
import { toast } from "@/hooks/use-toast";
import { IMAGES } from "@/utils/image";

const Footer: React.FC = () => {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(true);

  return (
    <>
      <footer
        className="w-full py-10 flex justify-center items-center"
        style={{ backgroundColor: "rgba(var(--primary-rgb), 0.65)" }}
      >
        <div>FOOTER</div>
      </footer>
      <div className="w-full text-center py-5 bg-[rgb(var(--primary-rgb))]">
        <div className="text-gray-600 text-sm">
          <p>Copyright © 2026 Medicare.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
