import { useCopy } from "../i18n";
import ContactForm from "./ContactForm";
const ICONS = {
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />,
};

/* Values are language-neutral; only the labels translate. One number covers the
   call and every messenger running on it, so they share a cell. */
const CHANNELS = [
  { icon: "mail", key: "email", value: "office.aplory@gmail.com", href: "mailto:office.aplory@gmail.com" },
  { icon: "phone", key: "phone", value: "069 844 0 885", href: "tel:+381698440885", note: true },
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

  const body = (
    <>
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-lg bg-paper text-brand-b transition-colors"
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
        {channel.value}
      </span>
      {channel.note && (
        <span className="mt-1 block text-[13.5px] text-muted">{copy.contact.otherValue}</span>
      )}
    </>
  );

  /* `h-full` so both cells match the tallest one — the phone cell carries an
     extra line, and a short email card beside it looks unfinished. */
  const shell =
    "group block h-full rounded-2xl border border-rule bg-surface-2 p-5 transition-colors hover:border-ink";

  return (
    <li data-reveal style={{ "--reveal-delay": `${index * 70}ms` }}>
      <Outbound href={channel.href} className={shell}>
        {body}
      </Outbound>
    </li>
  );
}

export default function Contact({ initialIndustry } = {}) {
  const copy = useCopy();

  /* aria-label, not aria-labelledby: the h2 it used to point at is gone, and a
     dangling reference leaves the section unnamed in the landmark list. The
     eyebrow is aria-hidden decoration, so the name is set here instead. */
  return (
    <section
      className="border-t border-rule bg-paper pt-24 pb-12"
      id="kontakt"
      aria-label={copy.contact.eyebrow}
    >
      <div className="wrap">
        <div data-reveal>
          <p className="eyebrow" aria-hidden="true">
            {copy.contact.eyebrow}
          </p>
          <h2 className="h2 mt-4">{copy.contact.title}</h2>
          <p className="lead-note">{copy.contact.lede}</p>
        </div>

        {/* The form takes the full width and the channels sit under it: the
            option cards want the room, and squeezing them into half a row put
            two words on three lines. Writing here is the path we want; the
            address and number are for people who would rather use their own
            client, which is a footnote to the form, not its equal. */}
        <div className="mt-12" data-reveal>
          <ContactForm initialIndustry={initialIndustry} />
        </div>

        <ul className="mt-3 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
          {/* Keyed by the channel, never by its label: a label-keyed element is
              torn down and rebuilt on a language switch, and the rebuilt node is
              one the reveal observer has never seen — it would stay invisible. */}
          {CHANNELS.map((channel, i) => (
            <Tile key={channel.key} channel={channel} index={i} />
          ))}
        </ul>

        {/* Footer lives inside the dark section for now, on the same ground. */}
        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-8 text-[13.5px] text-muted">
          <span className="logo h-6 w-28" role="img" aria-label="APLORY" />
          <span>{copy.contact.footer.rights}</span>
          {/* The two documents travel together. `w-full` drops the pair onto its
              own centred line while the footer is stacked; from sm up the wrapper
              takes over the right-alignment the first link used to carry. */}
          <div className="flex w-full justify-center gap-x-6 sm:ml-auto sm:w-auto">
            <a className="transition-colors hover:text-ink" href="/politika-privatnosti.html">
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
            <a className="transition-colors hover:text-ink" href="/politika-kolacica.html">
              {copy.contact.footer.cookies}
              {copy.contact.footer.legalNote && (
                <span className="ml-1 text-faint">({copy.contact.footer.legalNote})</span>
              )}
            </a>
            <a className="transition-colors hover:text-ink" href="/izjava-o-pristupacnosti.html">
              {copy.contact.footer.accessibility}
              {copy.contact.footer.legalNote && (
                <span className="ml-1 text-faint">({copy.contact.footer.legalNote})</span>
              )}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
