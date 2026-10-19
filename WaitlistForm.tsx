"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const labels = site.waitlist.fields;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint || status === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setStatus("sending");
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      whatsapp: String(formData.get("whatsapp") || "").trim() || null,
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Envio não concluído.");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="waitlist section-pad" id={site.waitlist.id} aria-labelledby="waitlist-heading">
      <div className="waitlist__ornament" aria-hidden="true">✦</div>
      <div className="waitlist__copy" data-reveal>
        <span className="eyebrow">{site.waitlist.kicker}</span>
        <h2 id="waitlist-heading">{site.waitlist.title}</h2>
        <p>{site.waitlist.description}</p>
      </div>
      <form className="waitlist-form" method="post" action={endpoint || undefined} onSubmit={handleSubmit}>
        <label className="form-field">
          <span>{labels.name}</span>
          <input type="text" name="name" autoComplete="name" required aria-required="true" placeholder=" " />
        </label>
        <label className="form-field">
          <span>{labels.email}</span>
          <input type="email" name="email" autoComplete="email" required aria-required="true" placeholder=" " />
        </label>
        <label className="form-field">
          <span>{labels.whatsapp}</span>
          <input type="tel" name="whatsapp" autoComplete="tel" inputMode="tel" placeholder=" " />
        </label>
        <label className="consent-field">
          <input type="checkbox" name="consent" value="on" required aria-required="true" />
          <span>{labels.consent} <Link href="/privacidade">{labels.privacyLink}</Link>.</span>
        </label>
        <button className="button button--gold waitlist-form__submit" type="submit" disabled={!endpoint || status === "sending"} aria-describedby={!endpoint ? "waitlist-unavailable" : undefined}>
          {status === "sending" ? labels.sending : labels.submit}<span aria-hidden="true">↗</span>
        </button>
        <p className={`form-status${status === "error" ? " form-status--error" : ""}`} aria-live="polite" role="status">
          {status === "success" ? labels.success : status === "error" ? labels.error : ""}
        </p>
        {!endpoint && process.env.NODE_ENV === "development" && <p className="form-notice">{labels.developmentNotice}</p>}
        {!endpoint && <span className="visually-hidden" id="waitlist-unavailable">{labels.unavailable}</span>}
      </form>
    </section>
  );
}
