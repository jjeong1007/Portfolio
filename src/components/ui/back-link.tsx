import Image from "next/image";
import Link from "next/link";
import { NAV_BACK } from "@/lib/site-nav";

type BackLinkProps = {
  href?: string;
  label?: string;
  className?: string;
};

/** "‹ Back to main page" link shown top-left on secondary pages. */
export function BackLink({ href = "/", label = "Back to main page", className = "" }: BackLinkProps) {
  return (
    <Link
      href={href}
      transitionTypes={NAV_BACK}
      className={`group type-body-md inline-flex items-center gap-2 rounded-tab px-3 py-2 leading-none! text-ink-body transition-colors duration-150 hover:bg-surface hover:text-ink ${className}`}
    >
      <Image
        src="/brand/icon-chevron-left.svg"
        alt=""
        width={20}
        height={24}
        className="transition-transform duration-200 ease-spring group-hover:-translate-x-1"
      />
      {label}
    </Link>
  );
}
