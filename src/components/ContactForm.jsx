import { useState } from "react";
import { useCopy } from "../i18n";

/* Must match the `name` on the static twin in index.html — Netlify files the
   submission under this, and an unknown name is rejected outright. */
const FORM_NAME = "kontakt";

/* Slugs, not labels. These are what Netlify stores, so they have to survive a
   language switch and a reordering of the lists below — the visible text lives
   in the locale files, keyed by the slug. */
const INDUSTRIES = [
  "stomatoloske ordinacije",
  "veterinarske klinike",
  "advokatske kancelarije",
  "servisi i radionice",
  "medical spa saloni",
  "ecommerce",
  "drugo",
];

/* Kept last, and named so the reveal below has something to compare against
   rather than a bare string in the middle of the JSX. */
const OTHER_SERVICE = "ostalo";

const SERVICES = ["promasen-poziv", "chat", "sajt", OTHER_SERVICE];

/* Netlify takes submissions as a urlencoded POST to any path on the site, with
   the form's own name carried in the body. We post from JS instead of letting
   the browser navigate, so a visitor who has scrolled this far stays where they
   are and reads the answer in place. */
async function submitToNetlify(form) {
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(form)).toString(),
  });
  if (!response.ok)
    throw new Error(`Netlify forms responded ${response.status}`);
}

/* Split so the select can take the box without the label gap — its wrapper
   carries that instead. Overriding mt-1.5 with mt-0 would leave the winner up
   to the order Tailwind happens to emit the two rules in. */
const FIELD_BOX =
  "block w-full rounded-lg border border-rule bg-surface-2 px-3.5 py-2.5 " +
  "text-[15px] font-light text-ink transition-colors placeholder:text-faint " +
  /* :user-invalid, not :invalid — an untouched required field is invalid from
     first paint, and a form that greets you in red is worse than one that says
     nothing. This waits for a submit attempt, or for the field to be entered
     and left empty. Hover and focus come after, so a field being corrected
     stops shouting while the cursor is in it. */
  /* The compound `user-invalid:focus:` is doing real work: a blocked submit
     moves focus to the first invalid field, and plain `focus:border-brand-a`
     would otherwise paint that one field blue — the very field the browser is
     pointing at. Two pseudo-classes outrank one, whatever order Tailwind emits
     them in. Typing a valid value clears :user-invalid and the blue returns. */
  "user-invalid:border-danger user-invalid:focus:border-danger " +
  "user-invalid:bg-danger/5 " +
  "hover:border-brand-a/60 focus:border-brand-a";

const FIELD = `mt-1.5 ${FIELD_BOX}`;

const LABEL =
  "block text-eyebrow font-bold tracking-[0.14em] text-muted uppercase";

function Field({
  name,
  type = "text",
  required = true,
  autoComplete,
  rows,
  copy,
}) {
  const id = `kontakt-${name}`;
  const Tag = rows ? "textarea" : "input";

  return (
    /* The label follows the box into red: on a textarea most of the border sits
       off to the sides, and the colour alone is easy to miss. */
    <p className="group">
      <label
        htmlFor={id}
        className={`${LABEL} group-has-[:user-invalid]:text-danger`}
      >
        {copy.label}
        {/* The space is a real text node, not margin: a label read aloud would
            otherwise run the two words together as "Telefonopciono". */}
        {copy.optional && (
          <span className="normal-case tracking-normal text-faint">
            {" "}
            ({copy.optional})
          </span>
        )}
      </label>
      <Tag
        id={id}
        name={name}
        rows={rows}
        type={rows ? undefined : type}
        required={required || undefined}
        autoComplete={autoComplete}
        placeholder={copy.placeholder}
        className={rows ? `${FIELD} resize-y min-h-[7.5rem]` : FIELD}
      />
    </p>
  );
}

/* The chevron is drawn over the field rather than left to the browser: the
   native arrow renders in the OS palette and reads as a light smudge here.
   `color-scheme` is separate again — it is the only thing that reaches the
   dropdown popup, which no CSS on the select itself can touch. */
function IndustrySelect({ value, onChange, copy }) {
  return (
    <p>
      <label htmlFor="kontakt-delatnost" className={LABEL}>
        {copy.label}
        <span className="normal-case tracking-normal text-faint">
          {" "}
          ({copy.optional})
        </span>
      </label>
      <span className="relative mt-1.5 block">
        <select
          id="kontakt-delatnost"
          name="delatnost"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${FIELD_BOX} appearance-none pr-10`}
        >
          <option value="">{copy.placeholder}</option>
          {INDUSTRIES.map((slug) => (
            <option key={slug} value={slug}>
              {copy.options[slug]}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 11 7"
          className="pointer-events-none absolute top-1/2 right-4 w-2.5 -translate-y-1/2 fill-none stroke-muted stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
        >
          <path d="m1 1 4.5 4.5L10 1" />
        </svg>
      </span>
    </p>
  );
}

/* A fieldset, not a labelled input: the question names the whole group, and a
   <label> can only ever name one control. */
function ServiceChecks({ otherChecked, onOtherChange, copy }) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className={`${LABEL} p-0`}>
        {copy.label}
        <span className="normal-case tracking-normal text-faint">
          {" "}
          ({copy.optional})
        </span>
      </legend>
      <p className="mt-1 text-[13px] text-faint">{copy.hint}</p>
      <div className="mt-2.5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
        {SERVICES.map((slug) => (
          <label
            key={slug}
            className="flex cursor-pointer items-start gap-2.5 text-[14.5px] font-light text-ink-2 transition-colors hover:text-ink"
          >
            <input
              type="checkbox"
              name="usluge"
              value={slug}
              onChange={
                slug === OTHER_SERVICE
                  ? (event) => onOtherChange(event.target.checked)
                  : undefined
              }
              className="mt-1 size-4 shrink-0"
            />
            {copy.options[slug]}
          </label>
        ))}
      </div>
      {otherChecked && (
        <div className="mt-3">
          <Field
            name="usluge-drugo"
            required={false}
            copy={{
              label: copy.otherLabel,
              placeholder: copy.otherPlaceholder,
            }}
          />
        </div>
      )}
    </fieldset>
  );
}

export default function ContactForm() {
  const copy = useCopy();
  const t = copy.contact.form;
  /* "idle" | "sending" | "sent" | "error" */
  const [status, setStatus] = useState("idle");
  /* Held in React, not read off the DOM, because the free-text field below the
     select only exists while "drugo" is the answer. */
  const [industry, setIndustry] = useState("");
  /* Same reason as `industry`: the field it reveals is not in the DOM to be
     read from until the box is ticked. */
  const [otherService, setOtherService] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      await submitToNetlify(form);
      form.reset();
      /* reset() clears the inputs but cannot reach React state, and a stale
         "drugo" would leave the free-text field hanging open under an empty
         select. */
      setIndustry("");
      setOtherService(false);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rounded-xl border border-rule bg-paper p-5 sm:p-6"
    >
      {/* Both travel in the POST body: the first tells Netlify which form this
          is, the second is the honeypot. A human never sees the honeypot, so
          anything that fills it in is a bot and the submission is dropped. */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          {t.honeypot}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <h3 className="text-[17px] font-light tracking-[-0.01em]">{t.legend}</h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field name="ime" autoComplete="name" copy={t.fields.name} />
        <Field
          name="email"
          type="email"
          autoComplete="email"
          copy={t.fields.email}
        />
        <Field
          name="telefon"
          type="tel"
          required={false}
          autoComplete="tel"
          copy={t.fields.phone}
        />
        <IndustrySelect
          value={industry}
          onChange={setIndustry}
          copy={t.fields.industry}
        />
        {industry === "drugo" && (
          <div className="sm:col-span-2">
            <Field
              name="delatnost-drugo"
              required={false}
              copy={{
                label: t.fields.industry.otherLabel,
                placeholder: t.fields.industry.otherPlaceholder,
              }}
            />
          </div>
        )}
        <div className="sm:col-span-2">
          <ServiceChecks
            otherChecked={otherService}
            onOtherChange={setOtherService}
            copy={t.fields.services}
          />
        </div>
        <div className="sm:col-span-2">
          <Field name="poruka" rows={4} copy={t.fields.message} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
        <p className="text-[13px] text-faint">
          {t.privacyBefore}
          <a
            className="text-muted underline underline-offset-2 transition-colors hover:text-ink"
            href="/politika-privatnosti.html"
          >
            {t.privacyLink}
          </a>
          {copy.contact.footer.legalNote &&
            ` (${copy.contact.footer.legalNote})`}
          {t.privacyAfter}
        </p>
      </div>

      {/* One live region for both outcomes, so a screen reader announces the
          result without the focus ever leaving the submit button. */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-[14px] ${status === "error" ? "text-danger" : "text-live"} ${
          status === "sent" || status === "error" ? "" : "hidden"
        }`}
      >
        {status === "sent" ? t.sent : status === "error" ? t.error : ""}
      </p>
    </form>
  );
}
