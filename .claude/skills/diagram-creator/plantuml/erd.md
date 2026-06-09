# Entity-Relationship Diagram (ERD)

## Goal:
- Illustrate database entities, their attributes, and relationships.

## Conventions:
- Entity names: PascalCase singular nouns (e.g., `User`, `Order`, `Product`).
- Attribute naming: snake_case (e.g., `created_at`, `user_id`).
- Always show: primary key (PK), foreign keys (FK), and key attributes.
- Relationship labels: verb phrases describing the relationship (e.g., "places", "contains", "belongs to").
- Cardinality: always explicit — use `||--o{`, `||--||`, `}o--o{` etc.

## Output format:
- Here is the final output format that you will deliver to users:

```plantuml
@startuml
entity "User" as user {
  * user_id : INT <<PK>>
  --
  * email : VARCHAR(255)
  * password_hash : VARCHAR(255)
  name : VARCHAR(100)
  created_at : TIMESTAMP
}

entity "Order" as order {
  * order_id : INT <<PK>>
  --
  * user_id : INT <<FK>>
  * status : ENUM
  total_amount : DECIMAL
  created_at : TIMESTAMP
}

user ||--o{ order : "places"
@enduml
```
```
**Mô tả:**
- [3–5 sentence summary of the data model.]
- [Notable constraints, indexes, or design decisions.]
```

## Relationship notation:
| PlantUML | Meaning |
|----------|---------|
| `\|\|--o{` | One-to-Many |
| `\|\|--\|\|` | One-to-One |
| `}o--o{` | Many-to-Many |
| `o\|--o{` | Zero-or-One to Many |
