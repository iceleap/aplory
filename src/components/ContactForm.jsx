import { useEffect, useRef, useState } from "react";
import { useCopy } from "../i18n";

/* Must match the `name` on the static twin in index.html — Netlify files the
   submission under this, and an unknown name is rejected outright. */
const FORM_NAME = "kontakt";

/* Slugs, not labels. These are what Netlify stores, so they have to survive a
   language switch and a reordering of the lists below — the visible text lives
   in the locale files, keyed by the slug. */
const OTHER_INDUSTRY = "drugo";

const INDUSTRIES = [
  "stomatoloske-ordinacije",
  "veterinarske-klinike",
  "advokatske-kancelarije",
  "servisi-i-radionice",
  "medical-spa-saloni",
  "ecommerce",
  "klima-i-grejanje",
  "pvc-stolarija",
  "majstori",
  OTHER_INDUSTRY,
];

/* Kept last, and named so the reveal below has something to compare against
   rather than a bare string in the middle of the JSX. */
const OTHER_SERVICE = "ostalo";

const SERVICES = ["promasen-poziv", "chat", "sajt", OTHER_SERVICE];

/* Both "other" options open a free-text field, so neither may auto-advance. */
const OTHERS = new Set([OTHER_SERVICE, OTHER_INDUSTRY]);

/* Long enough for the checkmark to finish drawing, short enough that it reads
   as a response rather than a wait. */
const ADVANCE_MS = 450;

const STEPS = ["services", "industry", "details"];

/* Step 3 is the only one that can block a send. */
const REQUIRED = ["ime", "email"];

/* The form carries noValidate so that nothing reddens on its own, which also
   means the browser's own email check no longer runs — this stands in for it.
   Deliberately loose: rejecting an address a real person owns is far worse
   than accepting one that bounces. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Keyed by the name each answer is submitted under, so serialising is a plain
   walk of the object rather than a translation table. */
const EMPTY = {
  usluge: "",
  "usluge-drugo": "",
  delatnost: "",
  "delatnost-drugo": "",
  ime: "",
  email: "",
  telefon: "",
};

/* Netlify takes submissions as a urlencoded POST to any path on the site, with
   the form's own name carried in the body. We post from JS instead of letting
   the browser navigate, so a visitor who has scrolled this far stays where they
   are and reads the answer in place.

   Built from state, never from FormData: only the step on screen has inputs in
   the DOM, so FormData would quietly post a third of the answers and still look
   like it had worked. */
async function submitToNetlify(answers) {
  const body = new URLSearchParams({ "form-name": FORM_NAME });
  for (const [name, value] of Object.entries(answers)) {
    if (value) body.append(name, value);
  }

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!response.ok)
    throw new Error(`Netlify forms responded ${response.status}`);
}

/* Two whole variants rather than one base plus `user-invalid:` overrides. The
   pseudo-class was the bug: it also matches on blur after any interaction, so
   tabbing through the step reddened every empty field before anyone had tried
   to send anything. Which variant applies is now decided in React, and only a
   real submit attempt can choose the red one. Separate strings also mean the
   focus ring cannot out-rank the error colour — there is only ever one of
   each in play. */
const FIELD_BASE =
  "mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 " +
  "text-[15px] font-light text-ink transition-colors placeholder:text-faint";

const FIELD_OK =
  "border-rule bg-paper hover:border-ink/40 focus:border-ink";

const FIELD_BAD = "border-danger bg-danger/5 focus:border-danger";

const LABEL =
  "block text-eyebrow font-bold tracking-[0.14em] text-muted uppercase";

function Field({
  name,
  type = "text",
  required = true,
  autoComplete,
  rows,
  copy,
  value,
  onChange,
  invalid = false,
}) {
  const id = `kontakt-${name}`;
  const Tag = rows ? "textarea" : "input";
  /* One message for every required field, so it lives on the form rather than
     being repeated in each field's copy. */
  const error = useCopy().contact.form.requiredError;

  return (
    <p>
      <label
        htmlFor={id}
        className={`${LABEL} ${invalid ? "text-danger" : ""}`}
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
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={`${FIELD_BASE} ${invalid ? FIELD_BAD : FIELD_OK} ${
          rows ? "resize-y min-h-[7.5rem]" : ""
        }`}
      />
      {invalid && (
        <span
          id={`${id}-error`}
          className="mt-1.5 block text-[13px] text-danger"
        >
          {error}
        </span>
      )}
    </p>
  );
}

/* group-has, not peer: Tailwind's `peer-*` only reaches following *siblings* of
   the input, and everything styled here is nested inside the card. Hanging the
   group off the label lets the indicator and the text react to :checked too. */
const CARD =
  "flex h-full items-center gap-3.5 rounded-2xl border border-rule bg-paper " +
  "p-4 text-[15px] font-normal text-ink-2 " +
  "transition-[color,background-color,border-color,transform] duration-150 " +
  "group-hover:border-ink/50 group-hover:text-ink " +
  "motion-safe:group-hover:-translate-y-px motion-safe:group-active:scale-[0.99] " +
  "group-has-[:checked]:border-ink group-has-[:checked]:bg-surface-2 " +
  "group-has-[:checked]:text-ink " +
  /* The input is sr-only, so its own focus ring is invisible — the card has to
     wear it or keyboard users lose their place entirely. */
  "group-has-[:focus-visible]:outline-2 group-has-[:focus-visible]:outline-offset-2 " +
  "group-has-[:focus-visible]:outline-brand-a";

const INDICATOR =
  "grid size-6 shrink-0 place-items-center border border-rule bg-paper " +
  "transition-colors group-has-[:checked]:border-ink group-has-[:checked]:bg-ink";

/* Radios throughout: every step takes exactly one answer now that a pick
   advances on its own, and a checkbox would promise a second choice the form
   never gives you. Radios also bring arrow-key navigation between cards. */
function OptionCard({ name, value, label, checked, onPick }) {
  return (
    <label className="option group relative block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onPick(name, value)}
        className="sr-only"
      />
      <span className={CARD}>
        <span className={`${INDICATOR} rounded-full`}>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 10"
            className="w-3 fill-none stroke-paper stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]"
          >
            {/* pathLength normalises the dash, so the draw in base.css works
                without knowing the path's real length. */}
            <path
              className="card-check"
              pathLength="1"
              d="m1 5 3.2 3.2L11 1.4"
            />
          </svg>
        </span>
        {label}
      </span>
    </label>
  );
}

function OptionGrid({ name, options, labels, selected, onPick }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((slug) => (
        <OptionCard
          key={slug}
          name={name}
          value={slug}
          label={labels[slug]}
          checked={selected === slug}
          onPick={onPick}
        />
      ))}
    </div>
  );
}

/* Three filled-or-not segments rather than a sliding bar: the steps are
   discrete, and a bar creeping to 33% implies a precision the form does not
   have. aria-hidden because the counter beside it says the same in words. */
function Progress({ step }) {
  return (
    <span aria-hidden="true" className="flex gap-1.5">
      {STEPS.map((name, i) => (
        <span
          key={name}
          className={`h-1 w-7 rounded-full transition-colors duration-300 ${
            i <= step ? "bg-ink" : "bg-rule"
          }`}
        />
      ))}
    </span>
  );
}

/* Arriving from a niche landing page (e.g. /stomatolozi.html), the visitor has
   already told us their line of work — asking again on step 2 would be a
   second question with an answer they just gave. `initialIndustry` seeds that
   answer so the step opens pre-selected; the visitor can still change it. */
export default function ContactForm({ initialIndustry = "" }) {
  const copy = useCopy();
  const t = copy.contact.form;
  /* "idle" | "sending" | "sent" | "error" */
  const [status, setStatus] = useState("idle");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => ({ ...EMPTY, delatnost: initialIndustry }));
  /* Nothing on step 3 turns red until this is true. It is the whole fix for
     fields that used to redden just from being tabbed through. */
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const formRef = useRef(null);
  const headingRef = useRef(null);
  const advanceTimer = useRef(null);
  /* Skips the very first run: focusing the heading on mount would yank the page
     down to the form before anybody has asked to be here. The cleanup undoes
     the flag so StrictMode's dev-only double-invoke of this effect (mount,
     cleanup, mount again) doesn't see a stale "already mounted" from the first
     pass and focus the heading before the page has even settled. */
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }
    headingRef.current?.focus();
  }, [step, status]);

  const stopAdvance = () => {
    clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
  };

  /* A pending advance outliving the component would set state on an unmounted
     tree; one outliving a manual Back would land the visitor a step past where
     they asked to be. */
  useEffect(() => stopAdvance, []);

  const set = (name, value) =>
    setAnswers((prev) => ({ ...prev, [name]: value }));

  const goTo = (next) => {
    stopAdvance();
    setStep(next);
  };

  const pick = (name, slug) => {
    set(name, slug);
    stopAdvance();
    /* The "other" options reveal a text field the person still has to fill;
       sliding past it would throw the answer away. */
    if (OTHERS.has(slug)) return;
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, ADVANCE_MS);
  };

  /* Derived from state, so the red clears as soon as the field is filled in —
     no second submit needed to get rid of it. */
  const invalidField = (name) => {
    if (!submitAttempted) return false;
    const value = answers[name].trim();
    if (name === "email") return !EMAIL.test(value);
    return REQUIRED.includes(name) && value === "";
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const bad = REQUIRED.filter((name) =>
      name === "email"
        ? !EMAIL.test(answers.email.trim())
        : answers[name].trim() === "",
    );
    if (bad.length) {
      setSubmitAttempted(true);
      /* The form carries noValidate, so nothing moves focus for us. */
      formRef.current?.elements[bad[0]]?.focus();
      return;
    }

    setStatus("sending");
    try {
      /* Read off the DOM, not from state: a bot that sets `.value` directly
         never fires React's onChange, and a honeypot held in state would come
         back empty for exactly the submissions it exists to catch. */
      const bot = formRef.current?.elements["bot-field"]?.value ?? "";
      await submitToNetlify({ ...answers, "bot-field": bot });
      setAnswers(EMPTY);
      setSubmitAttempted(false);
      setStep(0);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const last = step === STEPS.length - 1;
  const stepCopy = t.steps[STEPS[step]];
  /* Every step is skippable; the button says so rather than sitting there
     disabled, which would read as something being broken. */
  const answered =
    step === 0
      ? answers.usluge !== ""
      : step === 1
        ? answers.delatnost !== ""
        : true;

  if (status === "sent") {
    return (
      <div className="rounded-[28px] border border-rule bg-surface-2 p-8 text-center sm:p-12">
        <span
          aria-hidden="true"
          className="mx-auto grid size-14 place-items-center rounded-full bg-live/15"
        >
          <svg
            viewBox="0 0 12 10"
            className="w-6 fill-none stroke-live stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <path d="m1 5 3.2 3.2L11 1.4" />
          </svg>
        </span>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="font-display mt-5 text-[24px] font-normal tracking-[-0.01em] outline-none"
        >
          {t.sentTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-[38ch] text-[15px] text-muted">
          {t.sent}
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      /* Nothing validates itself: the browser's own pass is what turned fields
         red on blur, and its bubbles arrive in the browser's language rather
         than the page's. handleSubmit checks explicitly instead. */
      noValidate
      className="rounded-[28px] border border-rule bg-surface-2 p-5 sm:p-8"
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

      <div className="flex items-center gap-4">
        <Progress step={step} />
        <span
          role="status"
          className="text-eyebrow font-bold tracking-[0.14em] text-muted uppercase"
        >
          {t.steps.counter
            .replace("{n}", step + 1)
            .replace("{total}", STEPS.length)}
        </span>
      </div>

      {/* Focus lands here on every step change — without it, pressing Dalje
          drops focus to the body and a keyboard user gets no signal at all. */}
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="font-display mt-5 text-[26px] font-normal tracking-[-0.01em] outline-none"
      >
        {stepCopy.title}
      </h3>
      <p className="mt-2 max-w-[46ch] text-[15px] text-muted">
        {stepCopy.lede}
      </p>

      {/* A floor, not a fixed height: enough that the nav row does not jump out
          from under a finger between the two short steps, without leaving the
          four-card step sitting over a field of empty card. */}
      {/* Keyed by step so React remounts it and the entry animation replays;
          without the key it is the same node re-rendered and nothing moves. */}
      <div key={step} className="step-in mt-7 sm:min-h-[11rem]">
        {step === 0 && (
          <>
            {/* The legend repeats the heading above rather than pointing at it via
                aria-labelledby: the heading is shared with steps that hold no
                radio group at all, so it can't double as this fieldset's name. */}
            <fieldset className="m-0 border-0 p-0">
              <legend className="visually-hidden">{stepCopy.title}</legend>
              <OptionGrid
                name="usluge"
                options={SERVICES}
                labels={t.fields.services.options}
                selected={answers.usluge}
                onPick={pick}
              />
            </fieldset>
            {answers.usluge === OTHER_SERVICE && (
              <div className="mt-4">
                <Field
                  name="usluge-drugo"
                  required={false}
                  value={answers["usluge-drugo"]}
                  onChange={set}
                  copy={{
                    label: t.fields.services.otherLabel,
                    placeholder: t.fields.services.otherPlaceholder,
                  }}
                />
              </div>
            )}
          </>
        )}

        {step === 1 && (
          <>
            <fieldset className="m-0 border-0 p-0">
              <legend className="visually-hidden">{stepCopy.title}</legend>
              <OptionGrid
                name="delatnost"
                options={INDUSTRIES}
                labels={t.fields.industry.options}
                selected={answers.delatnost}
                onPick={pick}
              />
            </fieldset>
            {answers.delatnost === OTHER_INDUSTRY && (
              <div className="mt-4">
                <Field
                  name="delatnost-drugo"
                  required={false}
                  value={answers["delatnost-drugo"]}
                  onChange={set}
                  copy={{
                    label: t.fields.industry.otherLabel,
                    placeholder: t.fields.industry.otherPlaceholder,
                  }}
                />
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="ime"
              autoComplete="name"
              value={answers.ime}
              onChange={set}
              invalid={invalidField("ime")}
              copy={t.fields.name}
            />
            <Field
              name="email"
              type="email"
              autoComplete="email"
              value={answers.email}
              onChange={set}
              invalid={invalidField("email")}
              copy={t.fields.email}
            />
            <div className="sm:col-span-2">
              <Field
                name="telefon"
                type="tel"
                required={false}
                autoComplete="tel"
                value={answers.telefon}
                onChange={set}
                copy={t.fields.phone}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-rule pt-6">
        {step > 0 && (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="btn btn-lg btn-ghost"
          >
            {t.steps.back}
          </button>
        )}

        {/* type="button" matters: a bare <button> inside a form submits it, so
            the first Dalje would fire the whole thing off on step one. */}
        {last ? (
          <button
            type="submit"
            className="btn btn-lg btn-primary ml-auto"
            disabled={status === "sending"}
          >
            {status === "sending" ? t.sending : t.submit}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goTo(step + 1)}
            className="btn btn-lg btn-primary ml-auto"
          >
            {answered ? t.steps.next : t.steps.skip}
          </button>
        )}
      </div>

      {/* Only on the step that actually sends: on steps one and two there is
          nothing yet to consent to, and a privacy line under a Dalje button
          reads as a warning about pressing it. */}
      {last && (
        <p className="mt-4 text-[13px] text-faint">
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
      )}

      {/* Only the failure needs a live region now — success replaces the whole
          card, which the focus move already announces. */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-[14px] text-danger ${status === "error" ? "" : "hidden"}`}
      >
        {status === "error" ? t.error : ""}
      </p>
    </form>
  );
}
