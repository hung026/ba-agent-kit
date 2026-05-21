# Gate — Complexity Check

Classify input before analysis. Prevents over-engineering simple requests.

## Criteria

**Simple** (all true → answer directly, skip pipeline):
- Single question, one clear answer, no ambiguity
- No hidden trade-offs or multi-stakeholder impact

**Medium** (any true → enter pipeline, may skip sub-steps):
- 2–3 possible interpretations, or scope has edge cases
- Trade-offs exist but solution direction is somewhat clear

**Complex** (any true → full pipeline, all stages mandatory):
- Multiple stakeholders with conflicting needs
- Vague/unbounded scope, or significant regulatory trade-offs
- Cross-system impact, or unstated assumptions that could change everything

## Decision Tree

```
Can it be answered in 1-2 paragraphs with no ambiguity?
├─ Yes → Hidden trade-off or multi-party impact? → No: SIMPLE / Yes: MEDIUM
└─ No  → Multiple stakeholders, unclear scope, or regulatory? → Yes: COMPLEX / No: MEDIUM
```

State before proceeding: `**Complexity: [Simple/Medium/Complex]** — Reason: [one sentence]`
- Simple → answer directly. Do not enter pipeline.
- Medium/Complex → proceed to Stage 1.
