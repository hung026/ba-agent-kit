# Output Schema

Standard template for the spec-analyzer output. Read this file before starting Step 6.

The output is a Markdown file. Copy the structure below and fill in the content.

---

## Template

```markdown
# [Project Name] — Screen Specification

## Metadata
- **Project**: [name]
- **Platform**: [Mobile App / Web Portal / Landing Page]
- **Source document**: [SRS file name or "pasted text"]
- **Analyzed date**: [date]
- **Total screens**: [number] (screens: [number], modals: [number], popups: [number], toasts: [number])
- **Total modules**: [number]
- **User roles**: [list]

---

## Module Overview

| Module | Name | Screens | Description |
|--------|------|---------|-------------|
| 01 | [module name] | S-0101 ~ S-01XX | [short description] |
| 02 | [module name] | S-0201 ~ S-02XX | [short description] |
| ... | ... | ... | ... |

---

## Screen Inventory

### Module 01: [Module Name]

#### S-0101: [Screen Name]
- **Type**: Screen
- **Source**: [SRS section/user story reference] or [inferred]
- **Access roles**: [roles that can view this screen]
- **Description**: [Short description of the screen's purpose]
- **Components**:
  | Component | Type | Behavior | Notes |
  |-----------|------|----------|-------|
  | [name] | [button/input/list/card/image/toggle/tab/...] | [tap/swipe/input/display] | [notes if any] |
- **States**:
  | State | Trigger | Description |
  |-------|---------|-------------|
  | default | - | [default state description] |
  | loading | [when] | [description] |
  | empty | [when] | [description] |
  | error | [when] | [description] |
- **Fake data**:
  ```json
  {
    "field_name": "sample value",
    "list_items": [
      {"id": 1, "name": "Item 1", "...": "..."},
      {"id": 2, "name": "Item 2", "...": "..."}
    ]
  }
  ```

#### M-0101: [Modal Name]
- **Type**: Modal / Bottom Sheet
- **Triggered from**: [Screen ID + trigger action]
- **Description**: [description]
- **Components**: [similar to screen]
- **Actions**:
  | Action | Result |
  |--------|--------|
  | [action name] | [where to navigate / what changes] |

#### T-0101: [Toast Name]
- **Type**: Toast / Snackbar
- **Triggered from**: [Screen ID + trigger action]
- **Message**: "[notification content]"
- **Duration**: [short: 2s / long: 4s]
- **Style**: [success / error / warning / info]

#### P-0101: [Popup Name]
- **Type**: Popup / Dialog
- **Triggered from**: [Screen ID + trigger action]
- **Description**: [description]
- **Actions**:
  | Button | Label | Result |
  |--------|-------|--------|
  | Primary | [text] | [action] |
  | Secondary | [text] | [action — usually dismiss] |

---

## Navigation Flow

### Global Navigation
- **Type**: [Bottom Tab Bar / Drawer / Top Tab / None]
- **Items**:
  | Tab | Label | Icon hint | Target Screen |
  |-----|-------|-----------|---------------|
  | 1 | [label] | [icon description] | [Screen ID] |
  | 2 | [label] | [icon description] | [Screen ID] |

### Flow Map

List all navigation paths:

| From | Trigger | To | Condition | Back behavior |
|------|---------|----|-----------|---------------|
| S-0101 | Tap "Login" button | S-0102 | Form valid | Pop |
| S-0101 | Tap "Register" link | S-0103 | - | Pop |
| S-0102 | Login success | S-0301 | - | Replace stack |
| ... | ... | ... | ... | ... |

**Back behavior options**: Pop (go to previous screen), Replace stack (clear old stack, replace with new screen), None (no back allowed)

### Conditional Flows

| Condition | Flow |
|-----------|------|
| First time user | S-0101 → S-0201 (Onboarding) → S-0301 (Home) |
| Returning user | S-0101 → S-0301 (Home) |
| [other condition] | [flow] |

---

## Fake Data Summary

Consolidate all fake data entities to be created:

| Entity | Fields | Sample count | Used in screens |
|--------|--------|--------------|-----------------|
| User | id, name, email, avatar, role | 3 | S-0301, S-0501 |
| [entity] | [fields] | [count] | [screen IDs] |

---

## Unresolved Items

Unclear points in the SRS requiring user clarification:

| # | Screen | Issue | Impact |
|---|--------|-------|--------|
| 1 | [Screen ID] | [issue description] | [impact if unresolved] |

---

## Inferred Items

Inferred screens/components (not in the original SRS):

| # | Item | Reasoning |
|---|------|-----------|
| 1 | [Screen/Component ID + name] | [why it's added] |
```

---

## Template Filling Rules

1. **Fake data must be realistic**: Use real names (John Doe), correct phone formats, valid emails. Do not use "test123" or "lorem ipsum".
2. **Components must be code-ready**: Developers must know what component to use and its behavior.
3. **Navigation flow must cover all paths**: Include both happy and error paths.
4. **List states only when necessary**: Not every screen needs a loading state. Static screens only need a default state.
5. **Fake data sample count**: List screens need at least 3-5 items. Detail screens need 1 fully populated item.
6. **JSON in fake data**: Must be valid JSON, with enough fields to demonstrate all display cases on that screen.