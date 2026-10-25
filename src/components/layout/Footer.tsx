import { footer } from "@/data/site";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-3">
      <div className="flex w-full flex-col items-center justify-between gap-3 text-center font-ui text-[14px] text-ink-soft sm:flex-row sm:text-left sm:text-label md:gap-6">
        <p>{footer.copyright}</p>

        {footer.links.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {footer.links.map((link, index) => (
              <span key={link.label} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">•</span>}
                <a href={link.href} className="transition-colors duration-300 hover:text-cta">
                  {link.label}
                </a>
              </span>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}