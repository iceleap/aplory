import { useCopy } from "../i18n";

/**
 * "Kako APLORY funkcioniše, korak po korak" — sta-radimo.html only (see
 * StaRadimo.jsx). Answers the mechanism/data-handling/onboarding questions a
 * prospective buyer and an AI citation engine would both want and that the
 * page didn't previously cover: how the connection works without changing a
 * phone number, what happens to a client's data, and what stays a human
 * decision. See src/i18n/sr.js `mechanism` for the copy and its sourcing note.
 */
export default function Mechanism() {
  const copy = useCopy();

  return (
    <section className="sec bg-surface" id="mehanizam" aria-labelledby="mehanizam-title">
      <div className="wrap grid2">
        <div className="rail">
          <p className="eyebrow" aria-hidden="true">
            {copy.mechanism.eyebrow}
          </p>
        </div>
        <div>
          <h2 id="mehanizam-title" className="h2" data-reveal>
            {copy.mechanism.title}
          </h2>

          <ul
            className="mt-10 list-none border-b border-rule p-0"
            data-reveal
            style={{ "--reveal-delay": "80ms" }}
          >
            {copy.mechanism.items.map((item, i) => (
              <li key={i} className="grid gap-1.5 border-t border-rule py-6">
                <p className="text-[16.5px] leading-snug font-semibold tracking-[-0.012em] text-ink">
                  {item.name}
                </p>
                <p className="max-w-[64ch] text-[15px] leading-relaxed text-muted">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
