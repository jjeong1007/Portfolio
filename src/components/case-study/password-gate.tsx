"use client";

import { useActionState, useId } from "react";
import { unlockCaseStudy } from "@/app/projects/[slug]/actions";
import { BackLink } from "@/components/ui/back-link";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";

/**
 * Shown in place of a `protected` case study until the password is in. The
 * server renders this instead of the case study, so its content never reaches
 * the browser before then (see lib/case-study-access.ts).
 */
export function PasswordGate() {
  const [state, action, pending] = useActionState(unlockCaseStudy, {});
  const id = useId();

  return (
    <main className="pb-30">
      <Container className="pt-6">
        <BackLink href="/#projects" label="Back to projects" className="-ml-3" />
      </Container>
      <Container className="mt-18 flex justify-center">
        <section aria-labelledby={`${id}-title`} className="w-full max-w-100 rounded-card bg-paper p-6 shadow-float">
          <h1 id={`${id}-title`} className="type-subheading">
            Password protected
          </h1>
          <p className="type-body-sm mt-2 text-ink-body">
            This case study includes confidential work. Enter the password to view it.
          </p>
          <form action={action} className="mt-6">
            <label htmlFor={`${id}-password`} className="type-micro text-ink-subtle">
              Password
            </label>
            <input
              id={`${id}-password`}
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              aria-invalid={Boolean(state.error)}
              aria-describedby={state.error ? `${id}-error` : undefined}
              className="type-body-md mt-1 w-full rounded-control border border-line bg-paper px-3 py-2"
            />
            {state.error && (
              <p id={`${id}-error`} role="alert" className="type-body-sm mt-2 text-ink">
                {state.error}
              </p>
            )}
            <Chip type="submit" disabled={pending} className="mt-4 w-full font-body!">
              {pending ? "Checking…" : "View case study"}
            </Chip>
          </form>
        </section>
      </Container>
    </main>
  );
}
