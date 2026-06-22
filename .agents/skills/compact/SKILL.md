---
name: compact
description:
  Compress a long conversation into a portable summary block that can be pasted into a new chat session so the AI picks up exactly where it left off.
  Trigger this skill whenever the user types "/compact", "compact this", "tóm tắt conversation", "nén conversation", "summarize this chat", or any phrase that signals they want to compress the current conversation into a carry-over summary. 
---

# Compact — Conversation Compressor

## Purpose

Replace a long, token-heavy conversation with a single structured summary block.
The user copies this block into a new chat → the new AI session understands the full context (role, goal, decisions, current state) and continues seamlessly.

This is the manual equivalent of Claude Code's `/compact` command, adapted for any chat-based AI interface.

---

## Execution Steps

When triggered:

### Step 1 — Scan the full conversation

Read the entire conversation from first message to the message just before the compact trigger. Identify:

- **Objective**: What is the user trying to accomplish?
- **Key decisions**: What was agreed upon, chosen, or ruled out?
- **Artifacts produced**: Any code, documents, designs, plans created
- **Current state**: Where did the work stop? What's done vs pending?
- **Constraints & rules**: Any explicit rules, preferences, or boundaries set
- **Open questions**: Unresolved issues or pending user decisions

### Step 2 — Detect language

Use the same language the conversation has been conducted in.
If mixed languages, use the language of the majority of user messages.

### Step 3 — Generate the Compact Block

Output the summary using the exact template below. The block must be self-contained — a new AI session reading ONLY this block should have enough context to continue the work without asking "what were we doing?".

### Step 4 — Give paste instruction

After the compact block, add one short line telling the user what to do:
copy the block above, open a new chat, paste it as the first message.

---

## Output Template

Always use this exact structure. Omit any section that has no content (e.g., skip Artifacts if none were produced). Keep each section concise — the goal is compression, not transcription.

```markdown
## CONVERSATION SUMMARY

### Objective
[The main goal of this conversation. What is the user trying to achieve?]

### Key Decisions
- [Decision 1: what was decided and why (brief)]
- [Decision 2]
- [...]

### Artifacts
- [File/output 1: what it is, current status]
- [File/output 2]
- [...]

### Current State
[Where the work stands right now. What's completed, what's in progress.]

### Next Steps
- [ ] [Immediate next action]
- [ ] [Following action]
- [ ] [...]

### Constraints & Rules
- [Rule/preference 1]
- [Rule/preference 2]
- [...]

### Open Questions
- [Unresolved question 1]
- [Unresolved question 2]
- [...]

```

---

## Quality Rules

1. **Compression, not transcription.** The output should be 5-15% the length of
   the original conversation. If the conversation was 50 messages, the summary
   should be roughly 1-2 messages long.

2. **Decisions > discussion.** Capture WHAT was decided, not the back-and-forth
   that led to it. Only include reasoning if it's critical to avoid re-litigating.

3. **Preserve specifics.** Names, file paths, version numbers, exact config values,
   code snippets that were finalized — these must survive compression. Vague
   summaries like "discussed database options" are useless. Write "Chose PostgreSQL
   over SQLite because of concurrent write requirements" instead.

4. **Honor preserve/focus directives.** If the user specified `/compact preserve X`,
   section X must have maximum detail. Everything else can be more aggressively
   compressed.

5. **Self-contained.** A new AI reading this block with ZERO prior context must
   understand the situation fully. No references to "as we discussed" or
   "the earlier decision" without stating what it was.

6. **Match conversation language.** If the conversation was in Vietnamese, the
   summary is in Vietnamese. If English, English. Do not mix unless the
   conversation itself was mixed.

---

## Examples

**Example 1 — Basic compact**

User: `/compact`

Output:
```markdown
## CONVERSATION SUMMARY

### Objective
Build an automation system for product development workflow using AI skills.

### Key Decisions
- Using Claude Projects + portable SKILL.md files (not platform-locked)
- Skills will cover: BA docs, diagrams, release notes, spec analysis
- Template-based approach with doc-factory pattern

### Current State
Completed: analyst-advisor, doc-factory, diagram-creator skills.
In progress: compact skill (this conversation).

### Next Steps
- [ ] Finalize compact skill
- [ ] Test across Claude Chat, ChatGPT, Cursor
- [ ] Build remaining skills (API spec, test case generator)

### Constraints & Rules
- All skills must be platform-agnostic (markdown-based)
- Vietnamese as primary language, English for technical terms
- Caveman communication style: short, direct, no filler

```

**Example 2 — Compact with preserve directive**

User: `/compact preserve the API endpoint list and auth decisions`

→ The "Key Decisions" and "Artifacts" sections will include full detail on
API endpoints and auth architecture, while other sections are compressed normally.

---

## Anti-patterns (what NOT to do)

- ❌ Output the entire conversation as a wall of text
- ❌ Use vague language: "various things were discussed"
- ❌ Forget the role/persona — this causes the new session to behave differently
- ❌ Include the compact trigger message itself in the summary
- ❌ Add commentary outside the compact block ("Here's your summary! I've...")
- ❌ Skip the paste instruction at the end