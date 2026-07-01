# JSON Schema Design

## Goals

The schema is designed around three principles.

1. Reliable AI extraction.

2. Honest comparison between products.

3. Complete provenance.

---

# Root Structure

```
ProductEPD

├── id
├── source
├── metadata
├── product
├── environmentalImpact
└── extraction
```

---

# Product

Contains product information used for filtering.

Examples

- Product Name
- Manufacturer
- Compressive Strength
- Manufacturing Location
- Declared Unit

---

# Environmental Impact

Each lifecycle stage is represented independently.

```
A1

A2

A3

A4

...

D
```

Stages are objects instead of primitive numbers.

Example

```
A1

value

unit

status

provenance
```

This allows the application to distinguish

- Declared
- Not Declared
- Not Applicable

instead of treating everything as zero.

---

# Provenance

Every carbon value contains

- page
- section
- table
- raw text

This satisfies the assessment requirement that every number must be traceable back to the original EPD.

---

# Why not flatten?

Instead of

```
A1: 123
```

the schema stores

```
A1

value

unit

status

provenance
```

This enables transparent auditing.

---

# Future Extensions

The schema intentionally supports future indicators including

- ODP
- AP
- EP
- Water Use
- Resource Use

without breaking compatibility.
