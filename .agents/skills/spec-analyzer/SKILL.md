---
name: spec-analyzer
description: >
  Read requirement documents (SRS, user story, PRD) and extract a structured screen specification —
  including screen lists, components, navigation flow, fake data specs, and state definitions.
  The output serves as input for both prototype coding and UI design.
  Use this skill when the user wants to convert software requirements into a screen list and interaction flow.
  Trigger when the user says "liệt kê màn hình", "list ra các màn hình mockup", "chuẩn bị cho prototype", "chuẩn bị cho mockup"
---

# SPEC ANALYZER

## Purpose

Convert software requirements (SRS, user story, PRD) into a structured screen specification.
The output serves 2 purposes:
1. **Input for prototype coding** — detailed enough to build an interactive prototype with fake data.
2. **Input for UI/UX design** — sufficient info for designers to create wireframes/mockups.

**DON'T:**
- Code the prototype yourself (→ use prototype-generator skill)
- Create designs/wireframes (→ use Figma or design tools)
- Rewrite the SRS or modify requirements

**DO:**
- Read and understand the requirement document
- Extract all screens (screens, modals, popups, toasts, bottom sheets, error states)
- Map the navigation flow between screens
- Identify necessary components for each screen
- Define required fake data for the demo
- List UI states (loading, empty, error, success)

---

## Input Handling

### Text or chat history
If the user pastes text directly or it exists in chat history → use it immediately, no file reading needed.

### File upload
If the user uploads one or more files → read all and consolidate into a single analysis.

---

## Pipeline

```
Step 1: Read & Understand Doc
    │
    ▼
Step 2: Extract Screen Inventory
    │
    ▼
Step 3: Analyze Components & Interactions
    │
    ▼
Step 4: Map Navigation Flow
    │
    ▼
Step 5: Define Fake Data & States
    │
    ▼
Step 6: Consolidate Output → Present for user review
```

---

## Step 1: Read & Understand Doc

Goal: Grasp the full product scope before detailed extraction.

Read the entire doc and identify:
- Product type (mobile app, web portal, landing page)
- Target users (user roles/actors)
- Main modules/features
- Overall business flow

If crucial info is missing (unclear platform, undefined roles) → ask the user before proceeding.

---

## Step 2: Extract Screen Inventory

Read `references/extraction-rules.md` for detailed extraction rules.

Core principles:
- Every "view" the user sees = 1 screen entry (including modals, popups, toasts, bottom sheets)
- Format IDs as: `S-XXX` (screen), `M-XXX` (modal/bottom sheet), `T-XXX` (toast/snackbar), `P-XXX` (popup/dialog)
- Group screens by feature/module
- If a feature is described but lacks explicit screens → infer necessary screens and mark as `[inferred]`

---

## Step 3: Analyze Components & Interactions

For each screen, identify:
- UI components (button, input, list, card, image, icon, tab, toggle,...)
- Interaction behaviors (tap → navigate, long press → show options, swipe → delete,...)
- Form validation rules (if any)
- Conditional display logic (when to show/hide elements)

---

## Step 4: Map Navigation Flow

Create a navigation map:
- Screen A → (trigger action) → Screen B
- Back navigation
- Deep link entries (if any)
- Tab bar / bottom navigation structure
- Conditional navigation (login → home vs login → onboarding)

---

## Step 5: Define Fake Data & States

For each screen:
- **Fake data**: Hardcoded sample data for demo (user names, item lists, figures,...)
- **States**: UI states to represent
  - `default` — normal state with data
  - `loading` — when fetching (if applicable)
  - `empty` — no data available
  - `error` — when an error occurs
  - `success` — successful operation

Only list states practically needed for the demo. Do not list all theoretical states.

---

## Step 6: Consolidate Output

Read `references/output-schema.md` to use the correct output format.

After completing the analysis:
1. Generate the output file following the schema
2. Present it to the user:
   - Summary: total screens, modules, user roles
   - Highlight inferred items `[inferred]` — for user verification
   - Highlight unclear points in the SRS — for user clarification
3. Ask for confirmation or adjustments before finalizing

---

## Output Format

The output is a Markdown (.md) file saved at `/mnt/user-data/outputs/`.

File name: `[project-name]-screen-spec.md`

Detailed output structure: see `references/output-schema.md`
Complete output example: see `examples/sample-output.md`

---

## Important Notes

1. **Do not miss hidden screens**: Confirm delete modals, success toasts, error/empty states — all are screen entries.
2. **Logical inference**: SRS often omits some screens. Infer necessary screens and mark as `[inferred]`.
3. **Consistent IDs**: Once assigned, IDs do not change. Add new screens using the next available ID.
4. **Mobile-first**: Default to mobile app analysis. If web → specify in metadata.
5. **Always ask for confirmation**: Do not finalize on your own. Always present a draft and ask for user review.