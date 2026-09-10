"use client";

import { useState } from "react";
import type { CareerRole } from "@/data/mockdata/careers";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export function ApplyPageBody({ role }: { role: CareerRole }) {
  const [sent, setSent] = useState(false);

  return (
    <>
      {!sent && (
        <div className="mt-8 text-center">
          <p className="eyebrow">{role.department}</p>
          <h1 className="font-display mt-4 text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.1] font-semibold">
            Apply for {role.name}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate">
            Tell us a bit about you — we read every application and get back
            to shortlisted candidates within a week.
          </p>
        </div>
      )}

      <div className="mt-14">
        <ApplicationForm role={role} onSentChange={setSent} />
      </div>
    </>
  );
}
