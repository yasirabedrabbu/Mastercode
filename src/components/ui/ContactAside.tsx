import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon, Clock01Icon } from "@hugeicons/core-free-icons";

export default function ContactAside() {
  return (
    <div data-reveal className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-bg-deep">
      <Image src="/images/contact-workspace.jpg" alt="A calm workspace with a laptop by the window" fill sizes="(min-width:1024px) 40vw, 100vw" className="contact-img object-cover" />
      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-on-brand">
        <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden />
        Available for new projects
      </div>
      <dl className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line">
        <div className="flex items-center gap-3 bg-bg p-4 text-ink">
          <HugeiconsIcon icon={Location01Icon} size={22} aria-hidden className="shrink-0 text-brand" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Based in</dt>
            <dd className="font-semibold">Dhaka, BD</dd>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-bg p-4 text-ink">
          <HugeiconsIcon icon={Clock01Icon} size={22} aria-hidden className="shrink-0 text-brand" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-widest text-ink-soft">Replies</dt>
            <dd className="font-semibold">Within 24h</dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
