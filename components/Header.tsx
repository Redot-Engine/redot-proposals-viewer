import Banner from "@/components/Banner";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xs">
      <Banner
        subMessage="Upgrade to the latest version."
        mainMessage="Redot Engine is now stable!"
        link="https://www.redotengine.org/blog/release-4-3-stable"
      />
      <div className="py-5">
        <div className="w-full px-5 lg:px-40">
          <div className="flex items-center justify-between">
            <Link
              href="https://www.redotengine.org/"
              className="select-none rounded-md border border-slate-800 bg-black p-2"
            >
              <Image src="/logo.webp" alt="Redot Engine Logo" width={30} height={30} />
            </Link>
            <nav className="flex items-center gap-4">
              <ModeToggle />
              <Button asChild>
                <Link href="https://github.com/Redot-Engine/redot-proposals">Proposals</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
