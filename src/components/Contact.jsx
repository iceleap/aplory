import { useCopy } from "../i18n";
const ICONS = {
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />,
  chat: (
    <>
      <path d="M3.5 6.5h17v10h-9.5l-4 3v-3h-3.5Z" />
      <path d="M8 11.5h8" />
    </>
  ),
};

/* Values are language-neutral; only the labels translate. */
const CHANNELS = [
  { icon: "mail", key: "email", value: "stefanvujic869@gmail.com", href: "mailto:stefanvujic869@gmail.com" },
  { icon: "phone", key: "phone", value: "069 844 0 885", href: "tel:+381698440885" },
  { icon: "chat", key: "other" },
];

/* Links that leave the page open in a new tab; screen readers are told so,
   since an unannounced new window is disorienting. */
function Outbound({ href, className, children }) {
  const copy = useCopy();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="visually-hidden">{copy.contact.newWindow}</span>
    </a>
  );
}

function Tile({ channel, index }) {
  const copy = useCopy();
  const value = channel.value ?? copy.contact.otherValue;

  const body = (
    <>
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-lg bg-surface-2 text-brand-soft transition-colors group-hover:bg-paper"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4.5 fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
        >
          {ICONS[channel.icon]}
        </svg>
      </span>
      <span className="mt-4 block text-eyebrow font-bold tracking-[0.14em] text-muted uppercase">
        {copy.contact.channels[channel.key]}
      </span>
      <span className="mt-1 block text-[17px] font-light tracking-[-0.01em] wrap-break-word">
        {value}
      </span>
    </>
  );

  const shell =
    "group block rounded-xl border border-rule bg-paper p-5 transition-colors hover:border-brand-a";

  return (
    <li data-reveal style={{ "--reveal-delay": `${index * 70}ms` }}>
      {channel.href ? (
        <Outbound href={channel.href} className={shell}>
          {body}
        </Outbound>
      ) : (
        <div className={shell}>{body}</div>
      )}
    </li>
  );
}

export default function Contact() {
  const copy = useCopy();

  return (
    <section className="border-t border-rule bg-surface pt-24 pb-12" id="kontakt" aria-labelledby="kontakt-title">
      <div className="wrap">
        {/* Heading and CTA share a row so the ask sits level with the invitation
            rather than trailing a paragraph. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal>
            <p className="eyebrow" aria-hidden="true">
              {copy.contact.eyebrow}
            </p>
            <h2 id="kontakt-title" className="h2 mt-4 max-w-[18ch]">
              {copy.contact.title}
            </h2>
            <p className="mt-5 max-w-[52ch] text-[15px] text-muted">
              {copy.contact.lede}
            </p>
          </div>

          <div data-reveal style={{ "--reveal-delay": "100ms" }}>
            <Outbound
              className="btn btn-primary shrink-0"
              href="mailto:stefanvujic869@gmail.com?subject=Upit%20sa%20sajta"
            >
              {copy.contact.cta}
            </Outbound>
          </div>
        </div>

        <ul className="mt-12 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <Tile key={copy.contact.channels[channel.key]} channel={channel} index={i} />
          ))}
        </ul>

        {/* Footer lives inside the dark section for now, on the same ground. */}
        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-8 text-[13.5px] text-muted">
          <span className="logo h-6 w-28" role="img" aria-label="APLORY" />
          <span>{copy.contact.footer.rights}</span>
          <a className="ml-auto transition-colors hover:text-ink" href="/politika-privatnosti.html">
            {copy.contact.footer.privacy}
            {copy.contact.footer.legalNote && (
              <span className="ml-1 text-faint">({copy.contact.footer.legalNote})</span>
            )}
          </a>
          <a className="transition-colors hover:text-ink" href="/uslovi-koriscenja.html">
            {copy.contact.footer.terms}
            {copy.contact.footer.legalNote && (
              <span className="ml-1 text-faint">({copy.contact.footer.legalNote})</span>
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
