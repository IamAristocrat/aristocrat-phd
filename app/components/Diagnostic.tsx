"use client";

import { useMemo, useState } from "react";

const stages = [
  "Topic or proposal",
  "Methodology or data",
  "Thesis chapters",
  "Paper submission",
  "Reviewer revision",
  "Viva preparation",
];

const pressures = [
  "Graduation deadline",
  "Promotion or increment",
  "Repeated rejection",
  "Supervisor corrections",
  "Lost confidence or direction",
];

const timelines = ["Within 15 days", "Within 30 days", "Within 3 months", "Planning ahead"];

function recommendation(stage: string) {
  if (stage === "Thesis chapters") return "Thesis Momentum Audit";
  if (stage === "Paper submission" || stage === "Reviewer revision") return "Publication Rescue Audit";
  if (stage === "Methodology or data") return "Method & Evidence Audit";
  if (stage === "Viva preparation") return "Viva Readiness Audit";
  return "Research Direction Audit";
}

export default function Diagnostic() {
  const [stage, setStage] = useState("");
  const [pressure, setPressure] = useState("");
  const [timeline, setTimeline] = useState("");
  const [complete, setComplete] = useState(false);

  const result = useMemo(() => recommendation(stage), [stage]);
  const ready = Boolean(stage && pressure && timeline);
  const message = encodeURIComponent(
    `Hello Aristocrat Research, I completed the PhD Bottleneck Diagnostic. Stage: ${stage}. Main pressure: ${pressure}. Timeline: ${timeline}. Recommended starting point: ${result}. I want a confidential consultation.`
  );

  if (complete) {
    return (
      <div className="diagnostic-result" aria-live="polite">
        <p className="diagnostic-label">Recommended starting point</p>
        <h3>{result}</h3>
        <p>
          Your first conversation should verify the scope, source material and deadline before
          any work or payment begins.
        </p>
        <div className="result-summary">
          <span><b>Stage</b>{stage}</span>
          <span><b>Pressure</b>{pressure}</span>
          <span><b>Timeline</b>{timeline}</span>
        </div>
        <a
          className="button button-primary"
          href={`https://wa.me/919894595035?text=${message}`}
          target="_blank"
          rel="noreferrer"
        >
          Discuss this recommendation <span aria-hidden="true">↗</span>
        </a>
        <button className="text-button" type="button" onClick={() => setComplete(false)}>
          Change my answers
        </button>
      </div>
    );
  }

  return (
    <div className="diagnostic-card">
      <div className="diagnostic-header">
        <div>
          <p className="diagnostic-label">Private · approximately 2 minutes</p>
          <h3>PhD Bottleneck Diagnostic</h3>
        </div>
        <span>No document upload</span>
      </div>

      <fieldset>
        <legend>Where is your work currently stuck?</legend>
        <div className="choice-grid">
          {stages.map((item) => (
            <button
              className={stage === item ? "choice active" : "choice"}
              type="button"
              key={item}
              onClick={() => setStage(item)}
              aria-pressed={stage === item}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>What makes this urgent now?</legend>
        <div className="choice-grid compact">
          {pressures.map((item) => (
            <button
              className={pressure === item ? "choice active" : "choice"}
              type="button"
              key={item}
              onClick={() => setPressure(item)}
              aria-pressed={pressure === item}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>What is your working timeline?</legend>
        <div className="choice-grid timeline-grid">
          {timelines.map((item) => (
            <button
              className={timeline === item ? "choice active" : "choice"}
              type="button"
              key={item}
              onClick={() => setTimeline(item)}
              aria-pressed={timeline === item}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        className="button button-primary diagnostic-submit"
        type="button"
        disabled={!ready}
        onClick={() => setComplete(true)}
      >
        Show my recommended starting point <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
