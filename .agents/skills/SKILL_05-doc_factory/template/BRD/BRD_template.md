# Business Requirement Document (BRD)

## Rules
- Follow the structure as following **Output format**.
- Sections that contains "(Optional)" in section header can be skipped if there is no information, or is not required by user.


## Output format
```markdown
# BUSINESS REQUIREMENT DOCUMENT (BRD)
**Project:** [Project Name]
**Module:** [Module Name/Feature Set]
**Date:** [Today date]
**Proposer:** `Business Analyst` by default

---

## 1. OVERVIEW & CONTEXT
### 1.1. Document Objectives
[Describe the purpose of the document and what the MVP or module aims to achieve].

### 1.2. Scope
*   **In-Scope:** [List features or requirements included].
*   **Out-of-Scope:** `All the features not mentioned in the In-Scope section.` by default.

### 1.3. Pain Points Addressed
| Pain Point | Feature Solution | Impact |
| :--- | :--- | :--- |
| [Problem description] | [Feature ID] | [Critical/High/Medium] |

---

## 2. DETAILED FUNCTIONAL REQUIREMENTS
*Note: Repeat this sub-section for every functional requirement (FR-01, FR-02, etc.).*

### [FR-ID]: [Feature Name]
#### 2.1. Purpose
[Describe the objective of the feature and the problem it solves].

#### 2.2. Activity Flow (Happy Path)
1. [Step 1]
2. [Step 2]
3. [System Response]
4. [Result/Logging].

#### 2.3. User Stories
*   **As a [Primary User Persona]:** I want [action] so that [benefit].
*   **As a [Secondary User Persona]:** I want [action] so that [benefit].

#### 2.4. Technical Requirements
*   **[Platform A (e.g., Android)]:** [Specific APIs, services, or permissions required].
*   **[Platform B (e.g., iOS)]:** [Frameworks, limitations, or specific configurations].
*   **[Backend/Cloud/Sync]:** [Database needs, synchronization methods, or infrastructure].

#### 2.5. Acceptance Criteria
*   [ ] [Performance metric (e.g., latency < X ms)]
*   [ ] [Accuracy or success rate (e.g., > 95%)]
*   [ ] [User experience requirement]
*   [ ] [Validation rules (e.g., input validation, data format)]
*   [ ] [Resource usage constraint (e.g., < 3% battery)].

#### 2.6. Edge Cases & Error Handling
*   [Scenario 1 (e.g., Offline mode)]: [System response]
*   [Scenario 2 (e.g., User attempt to bypass)]: [System response]
*   [Scenario 3 (e.g., Database corruption)]: [Fallback mechanism].

---

## 3. NON-FUNCTIONAL REQUIREMENTS (OPTIONAL)
### 3.1. Performance (OPTIONAL)
*   **Battery/Resource Consumption:** [Maximum allowable usage].
*   **Network/Memory Usage:** [Usage limits].
*   **Latency:** [Response time targets].
*   [other requirements ...]

### 3.2. Security (OPTIONAL)
*   [Encryption standards, password hashing, session management, and API security].

### 3.3. Scalability (OPTIONAL)
*   [Concurrency support and database architecture (e.g., sharding)].

### 3.4. Compatibility (OPTIONAL)
| Platform | Minimum Version | Optimal Version | Notes |
| :--- | :--- | :--- | :--- |
| [OS Name] | [Version] | [Version] | [Compatibility notes] |

### 3.5. Compliance (OPTIONAL)
*   [Legal and regulatory standards (e.g., GDPR, COPPA, local laws)].

---

## 4. RISKS & MITIGATIONS (OPTIONAL)
### 4.1. Technical/UX/Business Risks
| Risk | Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| [Description of risk] | [High/Medium/Low] | [How to prevent or handle it] |

---

## 5. APPENDIX (OPTIONAL)
### 5.1. Glossary
*   **[Term]:** [Definition].

### 5.2. Reference Documents
*   [Links to API documentation or external resources].

### 5.3. Open Questions
*   [List of unresolved technical or design queries for the team].


---
```