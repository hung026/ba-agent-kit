---
name: diagram-creator
description: Use this skill whenever a user wants a visual diagram — sequence, flowchart, activity diagram,... If the user specifies the diagram type, the skill goes straight to create the diagram.
---

# SKILL_06: DIAGRAM_CREATOR

## Purpose
Create various type of diagrams: sequence diagrams, flowcharts, activity diagrams,... based on user input.

## Workflow

### 1. Receive input
- For each use case/user story, create a dedicated diagram.
- In case there are too many use cases/user stories (more than 5), ask the user which one need to create diagram.

### 2. Create diagram

- Use the following template to create the diagram:

| Diagram type | Reference File |
|-------|----------------|
| Sequence Diagram  | `template\Sequence Diagram\sequence_diagram_template.md` |
| Activity Diagram  | `template\Activity Diagram\activity_diagram_template.md` |
| Entity Relationship Diagram  | `template\ERD\ERD_template.md` |

## Output format
- Output should be in markdown format with language `plantuml`.

```plantuml
@startuml
...
@enduml
```

### 3. Save output
- Save the generated diagram in the user workspace under the `.workspace\output\diagram\` directory.
- File name format: `{usecase_name}.md` (e.g. UC-1.md , login.md, chatbot.md). Feel free to set a name that match the requirement.
---