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

# Environmental Impact Schema

Environmental impact data is represented as an array of lifecycle stage entries.

Each entry contains **exactly one lifecycle stage** and **one environmental indicator**.

For this project, only the **Global Warming Potential total (GWPt)** indicator is extracted because the comparison application focuses on embodied carbon.

Example:

```json
{
  "stage": "A1-A3",
  "indicator": "GWPt",
  "impact": {
    "value": 275,
    "unit": "kg CO2 eq.",
    "status": "DECLARED",
    "provenance": {
      "page": 11,
      "section": "Environmental Performance",
      "table": "Table 13",
      "rawText": "1.27E+02"
    }
  }
}
```

## Why only GWPt?

The assessment application compares products based on embodied carbon across lifecycle stages.

Although an EPD may contain many environmental indicators (ODP, AP, EP, POCP, WDP, ADP, etc.), these values are not required by the comparison application.

During batch extraction, extracting every environmental indicator significantly increased the response size and, for larger EPDs, could exceed the model's output limit.

To improve reliability while remaining aligned with the assessment requirements, the extraction scope was intentionally reduced to **GWPt only**.

## Lifecycle Stages

Lifecycle stages are preserved exactly as published in the source EPD.

Typical stages include:

```text
A1-A3
A4
A5
B1
B2
B3
B4
B5
B6
B7
C1
C2
C3
C4
D
```

## Provenance

Every extracted impact value includes provenance information:

* page
* section
* table
* rawText

This allows every carbon value displayed in the application to be traced back to its original location inside the source EPD.

## Status

Each impact entry preserves the declaration status reported by the EPD.

Possible values include:

* DECLARED
* NOT_DECLARED
* NOT_APPLICABLE

Keeping the original status avoids incorrectly interpreting missing values as zero and preserves the intent of the published declaration.


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
