# Extraction Rules

Rules for extracting screens from requirement documents. Read this file before starting Step 2.

---

## 1. Screen Entry Classification

Every "view" the user sees on the device = 1 screen entry.

| Type | Prefix | Description | Examples |
|------|--------|-------------|----------|
| Screen | `S-` | Full screen, occupies the entire viewport | Login, Home, Profile, Settings |
| Modal / Bottom Sheet | `M-` | Overlay occupying part of the viewport with a backdrop | Filter modal, Date picker, Confirm dialog |
| Popup / Dialog | `P-` | Small dialog, usually with 2 buttons (confirm/cancel) | Delete confirmation, Logout confirmation |
| Toast / Snackbar | `T-` | Temporary notification, auto-dismisses | "Saved successfully", "Network error" |

### Numbering Rules
- Format: `{Prefix}{Module number}{Screen number}` — e.g., `S-0101`, `M-0201`
- Module number: 2 digits (01, 02, 03,...)
- Screen number: 2 digits within the module (01, 02, 03,...)
- Example: Module 01 (Auth) has 3 screens → `S-0101`, `S-0102`, `S-0103`

---

## 2. Extraction Sources

Screens are extracted from the following SRS sources:

### Explicit Sources
- **Use case descriptions**: Each step in a use case flow usually matches 1 screen or interaction
- **User stories**: "As a user, I want to see a list of..." → list screen
- **UI requirements section**: If the SRS has a UI description section
- **Wireframe/mockup references**: If the SRS mentions specific screen names
- **Screen flow diagrams**: If available

### Inferred Sources
- **Authentication flow**: If SRS mentions login → infer: Login, Register, Forgot password, OTP verification screens
- **CRUD operations**: If SRS says "manage X" → infer: List X, Detail X, Create/Edit X, Delete confirmation
- **Search/Filter**: If SRS mentions searching → infer: Search screen or search bar + filter modal
- **Settings**: If SRS mentions settings → infer: Settings list, sub-settings screens
- **Notifications**: If mentioned → infer: Notification list, notification detail
- **Error handling**: All forms need error states, all API calls can fail
- **Empty states**: All list screens need empty states
- **Onboarding**: For complex features → consider adding an onboarding flow

All inferred screens must be marked `[inferred]` for the user to know and verify.

---

## 3. Module Grouping Rules

Group screens by feature/module. Priority order:

1. **By SRS structure**: If the SRS clearly divides modules → follow the SRS
2. **By user flow**: If not clearly divided → group by user flow
3. **Common default** (if unclear):
   - Module 01: Authentication (login, register, forgot password)
   - Module 02: Onboarding (if any)
   - Module 03: Home / Dashboard
   - Module 04-N: Feature modules (by business priority)
   - Last Module-1: Settings / Profile
   - Last Module: Common (shared modals, toasts, errors)

---

## 4. Special Cases Handling

### SRS is too short / lacks details
- Extract what is available
- Infer the rest based on context
- Clearly mark `[inferred]` and note the reasoning
- Ask the user to confirm before proceeding

### SRS is too long / many modules
- List all discovered modules
- Ask the user whether to analyze all or select specific modules
- If > 30 screens: recommend splitting into multiple analysis sessions

### SRS has conflicts
- Note both versions
- Mark `[conflict]` and describe the conflict
- Ask the user to decide

### Multiple user roles
- Create separate screen entries for each role if the UI differs
- If it's the same screen but different permissions → 1 entry, specify conditional display logic
- Clearly state which role sees which screen in the navigation flow

---

## 5. Pre-completion Checklist

Before moving to Step 3, verify:

- [ ] Every use case / user story in the SRS has at least 1 corresponding screen
- [ ] Every CRUD operation is complete: List, Detail, Create/Edit, Delete confirm
- [ ] Authentication flow is complete (if any)
- [ ] Error states and empty states are included
- [ ] Toast/snackbar for main actions are present (save, delete, error)
- [ ] Navigation entry points are clear (tab bar, drawer, deep links)
- [ ] `[inferred]` screens are clearly marked