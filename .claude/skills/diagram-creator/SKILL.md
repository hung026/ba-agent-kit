---
name: diagram-creator
description: "Create any type of diagram: sequence, activity, ERD (PlantUML) or BPMN process diagrams (XML). Triggers when user asks to 'vẽ diagram', 'tạo diagram', 'create diagram', 'sequence diagram', 'activity diagram', 'ERD', 'BPMN', 'vẽ quy trình', 'generate workflow', 'create process diagram', or uploads/pastes content describing a process, workflow, or system interactions. Also triggers when user describes a flow with actors, steps, decisions, if/else logic, or cross-system interactions."
---

# diagram-creator SKILL

## Purpose
Unified skill for creating ALL diagram types. Routes to the correct module based on detected type.

## Workflow

### 1. Input handling
- For each use case/user story → create a dedicated diagram.
- If there are more than 5 use cases/user stories → ask user which ones to create.
- Don't create diagram types that have no module unless user provides a template.

### 2. Detect diagram type

Scan user input for signals. Match the FIRST rule that hits:

| Signal | Diagram Type | Module |
|--------|-------------|--------|
| User explicitly says "BPMN" or "business process" or "workflow" or "vẽ quy trình" | **BPMN** | `bpmn/pipeline.md` |
| User explicitly says "sequence diagram" | **Sequence** | `plantuml/sequence.md` |
| User explicitly says "activity diagram" | **Activity** | `plantuml/activity.md` |
| User explicitly says "ERD" / "entity relationship" / "database diagram" | **ERD** | `plantuml/erd.md` |
| Input describes entities, tables, relationships, foreign keys | **ERD** | `plantuml/erd.md` |

**Ambiguous cases:** If the type cannot be determined, ask the user to choose: Sequence / Activity / ERD / BPMN. One question only.

### 3. Load module

Read ONLY the matched module file. Do NOT read other modules.

- **BPMN** → Read `bpmn/pipeline.md` (it will instruct you to read further reference files)
- **Sequence** → Read `plantuml/sequence.md`
- **Activity** → Read `plantuml/activity.md`
- **ERD** → Read `plantuml/erd.md`

### 4. Save output
- Save the generated diagram in the user workspace under the `\output\diagram\` directory.
- File name format: `{usecase_name}.md` (e.g. UC-1.md , login.md, chatbot.md). Feel free to set a name that match the requirement.
---