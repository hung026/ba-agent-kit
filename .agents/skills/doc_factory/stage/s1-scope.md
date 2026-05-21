# Stage 1 — Define Scope

**Goal:** Extract scope from input → present to user → get confirmation before writing anything.

---

## 1.1 Extract from Input

Parse the input (chat history / file / text) and identify:

- **Actors** — who interacts with the system?
- **Main use cases** — what are the core functional goals?
- **Constraints mentioned** — any NFRs, technical limits, deadlines?
- **Explicit exclusions** — anything user said is out of scope?

---

## 1.2 Output Format

Present scope in this exact format:

```
## Scope

### Main Use Cases
| # | Use Case | Purpose |
|---|---|---|
| UC-01 | [name] | [one-line description of what it achieves] |
| UC-02 | ... | ... |

### Edge Cases (if mentioned)
- [edge case from input]

### Non-Functional Requirements (if mentioned)
- [performance / security / scalability from input]

### Out of Scope (if clear from input)
- [explicit exclusions]
```

Then ask:
> "Đúng yêu cầu chưa? Nếu đúng, muốn viết loại tài liệu nào: (BRD / Use Case Spec / User Story)"

---

## 1.3 Rules

- **Only include what's in the input.** Don't invent scope.
- **If scope has 8+ complex use cases** → recommend splitting into multiple docs before proceeding.
- **Do not proceed to Stage 2 until user confirms.**