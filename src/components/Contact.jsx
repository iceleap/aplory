/* Links that leave the page open in a new tab. Screen readers get an explicit
   warning, since an unannounced new window is disorienting. */
function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="visually-hidden"> (otvara se u novom prozoru)</span>
    </a>
  );
}

const ROWS = [
  {
    k: "Email",
    v: "stefanvujic869@gmail.com",
    href: "mailto:stefanvujic869@gmail.com",
  },
  { k: "Telefon", v: "069 844 0 885", href: "tel:+381698440885" },
  { k: "Dostupni i na", v: "WhatsApp · Viber · SMS" },
];

export default function Contact() {
  return (
    <section className="bg-ink pt-24 pb-12 text-white" id="kontakt" aria-labelledby="kontakt-title">
      <div className="wrap">
        <div className="grid items-start gap-x-16 gap-y-11 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="eyebrow text-[#7fb6f6]" aria-hidden="true">
              Kontakt
            </p>
            <h2 id="kontakt-title" className="h2 mt-4 max-w-[16ch] text-white">
              Recite nam kuda vam stižu upiti.
            </h2>
            <p className="mt-5 max-w-[52ch] text-[15px] text-white/65">
              Javite nam koliko poziva i poruka dnevno primate. Vraćamo se sa konkretnim
              predlogom — bez obaveze i bez dugog prodajnog razgovora.
            </p>
            <p className="mt-7">
              {/* Carries a subject line, so it isn't the same target as the
                  plain address in the list beside it. */}
              <ExternalLink
                className="btn btn-primary"
                href="mailto:stefanvujic869@gmail.com?subject=Upit%20sa%20sajta"
              >
                Pišite nam
              </ExternalLink>
            </p>
          </div>

          <dl className="m-0 flex flex-col">
            {ROWS.map((row, i) => (
              <div
                key={row.k}
                className={`flex flex-col gap-0.5 border-b border-white/15 py-4 ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <dt className="text-xs font-bold tracking-[0.14em] text-white/50 uppercase">
                  {row.k}
                </dt>
                <dd className="m-0 text-[19px] font-light tracking-[-0.02em]">
                  {row.href ? (
                    <ExternalLink
                      className="border-b border-white/20 hover:border-white"
                      href={row.href}
                    >
                      {row.v}
                    </ExternalLink>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer lives inside the dark section for now, on the same ground. */}
        <div className="mt-20 flex flex-wrap items-center gap-6 border-t border-white/15 pt-8">
          <span
            className="logo h-6 w-28 brightness-0 invert"
            role="img"
            aria-label="APLORY"
          />
          <p className="text-[13.5px] text-white/60">
            Automatizacija odgovora na upite
          </p>
          <p className="ml-auto text-[13.5px] text-white/45">
            Pravni podaci se dopunjuju
          </p>
        </div>
      </div>
    </section>
  );
}
