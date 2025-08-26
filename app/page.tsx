// app/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";

/** ---------- Utility ---------- */
const cx = (...cls: (string | false | null | undefined)[]) =>
  cls.filter(Boolean).join(" ");

/** ---------- 1) Hero ---------- */
function CapabilityChips() {
  const chips = [
    "Payment Links",
    "Hosted Checkout",
    "Embedded Checkout",
    "Automated Renewals",
    "Fraud & AML",
    "Direct Settlement",
  ];
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {chips.map((c, i) => (
        <span
          key={c}
          className={cx(
            "rounded-full border border-emerald-200/60 bg-white px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm",
            "animate-[fadeInUp_0.45s_ease_forwards]",
          )}
          style={{ animationDelay: `${i * 80}ms` } as React.CSSProperties}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function FlowDiagram() {
  const [route, setRoute] = useState<"credit" | "debit">("credit");
  const nodes = [
    { id: "customer", label: "Customer" },
    { id: "checkout", label: "Hosted Checkout" },
    { id: "globapay", label: "Globapay · Route / Protect" },
    { id: "acquirer", label: route === "credit" ? "Nuvei" : "FAC / Scotia" },
    { id: "merchant", label: "Merchant (settled direct)" },
  ];

  return (
    <div className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setRoute("credit")}
          className={cx(
            "rounded-full border px-3 py-1 text-xs",
            route === "credit" ? "border-emerald-600 text-emerald-700" : "text-gray-600",
          )}
        >
          Credit (Nuvei)
        </button>
        <button
          onClick={() => setRoute("debit")}
          className={cx(
            "rounded-full border px-3 py-1 text-xs",
            route === "debit" ? "border-emerald-600 text-emerald-700" : "text-gray-600",
          )}
        >
          Local Debit (FAC/Scotia)
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {nodes.map((n, i) => (
          <div key={n.id} className="flex items-center">
            <div
              className={cx(
                "rounded-full border px-3 py-2 text-sm shadow-sm",
                n.id === "globapay" ? "border-emerald-600 text-emerald-700" : "border-gray-300 text-gray-800",
              )}
            >
              {n.label}
            </div>
            {i < nodes.length - 1 && <div className="mx-2 h-px w-8 bg-gray-300" />}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Toggle routes to see how orchestration directs traffic while funds settle directly to the merchant.
      </p>
    </div>
  );
}

/** ---------- 2) Benefits ---------- */
function Benefits() {
  const items = [
    {
      title: "Collect payments any way you need",
      body: "Payment links, hosted checkout, and embedded forms — ready to drop into your platform.",
    },
    {
      title: "Route with global reach",
      body: "Orchestrate across Nuvei, FAC, and Cybersource to maximize acceptance and reduce cost.",
    },
    {
      title: "Protect & settle",
      body: "Fraud, AML, and PCI handled by us. Funds settle direct to your merchants, not us.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900">{it.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** ---------- 3) Demos ---------- */
function LinkSandbox() {
  const [amt, setAmt] = useState("129.99");
  const [ref, setRef] = useState("POL-2025-00123");
  const url = useMemo(
    () => `https://pay.globapay.com/l/demo?amount=${encodeURIComponent(amt)}&ref=${encodeURIComponent(ref)}`,
    [amt, ref],
  );
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h4 className="text-base font-semibold text-gray-900">Try a payment link (demo)</h4>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
          placeholder="Amount"
        />
        <input
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm sm:col-span-2"
          placeholder="Reference"
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <input
          className="w-full rounded-lg border px-3 py-2 font-mono text-xs text-gray-800"
          value={url}
          readOnly
        />
        <button
          onClick={() => navigator.clipboard.writeText(url)}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white"
        >
          Copy
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">Opens a hosted checkout preview. No real payment is taken.</p>
    </div>
  );
}

function CheckoutPreview() {
  const [theme, setTheme] = useState<"light" | "dark" | "brand">("brand");
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-semibold text-gray-900">Hosted checkout preview</h4>
        <div className="flex gap-2">
          {(["brand", "light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cx(
                "rounded-full border px-3 py-1 text-xs capitalize",
                theme === t ? "border-emerald-600 text-emerald-700" : "text-gray-600",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div
        className={cx(
          "mt-4 rounded-xl border p-4",
          theme === "light" && "bg-white",
          theme === "dark" && "bg-gray-950 text-white",
          theme === "brand" && "bg-emerald-50",
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-emerald-600" />
            <span className="text-sm font-medium">Insurer / Merchant</span>
          </div>
          <span className="text-sm font-semibold">€129.99</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border p-3 text-xs opacity-70">Card number (hosted field)</div>
          <div className="rounded-lg border p-3 text-xs opacity-70">Expiry (hosted field)</div>
          <div className="rounded-lg border p-3 text-xs opacity-70">CVC (hosted field)</div>
        </div>
        <button className="mt-4 w-full rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white">
          Pay securely
        </button>
        <p className="mt-2 text-[11px] text-gray-500">
          3-D Secure handled by our PCI-certified providers.
        </p>
      </div>
    </div>
  );
}

/** ---------- 4) Use Cases ---------- */
function UseCases() {
  const cases = [
    { title: "SaaS CRMs", bullets: ["No PCI burden", "Faster collections", "Share in fees"] },
    { title: "Marketplaces", bullets: ["Seamless checkout", "Direct settlement", "Less ops overhead"] },
    { title: "B2B Networks", bullets: ["Invoice to link", "Better auth rates", "Recon exports"] },
    { title: "Property & Rent", bullets: ["Scheduled links", "Overdue reminders", "Owner statements"] },
    { title: "Education", bullets: ["Tuition links", "Installments as links", "Campus finance visibility"] },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900">Built for platforms of all kinds</h2>
      <p className="mt-2 max-w-2xl text-sm text-gray-600">
        If your customers need to collect payments, Globapay gives you the rails to make it happen.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cases.map((c) => (
          <div key={c.title} className="group rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold">{c.title}</h3>
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** ---------- 5) Platform Split + Webhooks ---------- */
function WebhookInspector() {
  const [events, setEvents] = useState<
    { id: string; type: string; time: string; json: string; open?: boolean }[]
  >([]);

  useEffect(() => {
    const seed = [
      {
        type: "transaction.authorized",
        payload: { txn_id: "txn_9ab3", amount: 12999, currency: "EUR" },
      },
      {
        type: "transaction.captured",
        payload: { txn_id: "txn_9ab3", captured_at: new Date().toISOString() },
      },
      {
        type: "transaction.failed",
        payload: { txn_id: "txn_1xy2", reason: "do_not_honor" },
      },
    ];
    setEvents(
      seed.map((s, i) => ({
        id: `e_${i}`,
        type: s.type,
        time: new Date(Date.now() - (seed.length - i) * 1000 * 12).toLocaleTimeString(),
        json: JSON.stringify(s.payload, null, 2),
      })),
    );
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-semibold text-gray-900">Webhook inspector (demo)</h4>
        <span className="text-xs text-gray-500">Mock events</span>
      </div>
      <ul className="mt-4 divide-y">
        {events.map((e) => (
          <li key={e.id} className="py-3">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between">
                <span className="text-sm font-medium text-gray-800">{e.type}</span>
                <span className="text-xs text-gray-500">{e.time}</span>
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-800">
                {e.json}
              </pre>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlatformSplit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900">What we handle, so you don’t have to</h2>
      <p className="mt-2 max-w-2xl text-sm text-gray-600">
        We power the rails — you own the experience.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">You get</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>∙ Embed payments in your UI</li>
            <li>∙ Show statuses & build workflows</li>
            <li>∙ Links, hosted checkout, embedded checkout, renewals</li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">We handle</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>∙ PCI, 3-D Secure, and tokenisation</li>
            <li>∙ Fraud monitoring & AML checks</li>
            <li>∙ Multi-acquirer orchestration & direct settlement</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <WebhookInspector />
      </div>
    </section>
  );
}

/** ---------- 6) Partners ---------- */
function Partners() {
  const logos = ["Nuvei", "Gr4vy", "FAC", "Cybersource", "Vespia", "Sift"];
  return (
    <section className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-center text-xs uppercase tracking-wide text-gray-500">
          Trusted connections
        </p>
        <div className="mt-4 grid grid-cols-3 items-center justify-items-center gap-6 sm:grid-cols-6">
          {logos.map((l) => (
            <div
              key={l}
              className="h-8 w-28 rounded bg-gray-200/70 text-center text-[11px] text-gray-500"
              title={l}
            >
              <div className="flex h-full w-full items-center justify-center">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ---------- 7) Final CTA ---------- */
function FinalCTA() {
  const [active, setActive] = useState<"Platform" | "Merchant" | "Investor">("Platform");
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Ready to embed payments?</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Talk to us about piloting payment links, checkout, and orchestration for your platform.
        </p>
        <div className="mt-5 flex gap-2">
          {["Platform", "Merchant", "Investor"].map((t) => (
            <button
              key={t}
              onClick={() => setActive(t as "Platform" | "Merchant" | "Investor")}
              className={cx(
                "rounded-full border px-3 py-1 text-xs",
                active === t ? "border-emerald-600 text-emerald-700" : "text-gray-600",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <form className="mt-6 grid gap-3 sm:grid-cols-2">
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Name" />
          <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Company" />
          <input className="rounded-lg border px-3 py-2 text-sm sm:col-span-2" placeholder="Email" />
          <textarea className="h-28 rounded-lg border px-3 py-2 text-sm sm:col-span-2" placeholder={`Message (${active})`}/>
          <div className="sm:col-span-2">
            <button className="w-full rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white">
              Talk to us
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/** ---------- Page ---------- */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 to-white">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-emerald-600" />
            <span className="text-sm font-semibold">Globapay</span>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-gray-700 md:flex">
            <a href="#solutions" className="hover:text-emerald-700">Solutions</a>
            <a href="#demos" className="hover:text-emerald-700">Demos</a>
            <a href="#platform" className="hover:text-emerald-700">Platform</a>
            <a href="#contact" className="hover:text-emerald-700">Contact</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-8">
        <div className="rounded-3xl border bg-white p-8 shadow-sm md:p-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            The payment platform behind your platform.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-700">
            Embed payments into your software with links, hosted checkout, and renewals —
            all with fraud, AML, and settlement handled.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#solutions"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
            >
              See Solutions
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700"
            >
              Talk to Us
            </a>
          </div>
          <CapabilityChips />
          <FlowDiagram />
        </div>
      </section>

      <section id="solutions">
        <Benefits />
      </section>

      <section id="demos" className="mx-auto max-w-6xl px-4 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">See how it works</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Generate a demo payment link or preview a checkout page — no card required.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <LinkSandbox />
          <CheckoutPreview />
        </div>
      </section>

      <UseCases />

      <section id="platform">
        <PlatformSplit />
      </section>

      <Partners />

      <section id="contact">
        <FinalCTA />
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-gray-500">
          © {new Date().getFullYear()} Globapay. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
