# CarbonLens

> AI-powered extraction and comparison of Environmental Product Declarations (EPDs) for concrete products.

## Overview

CarbonLens is a take-home assessment project for the **Low Carbon Materials Hub**.

The project has two objectives:

1. Extract structured information from Environmental Product Declaration (EPD) PDFs.
2. Provide a web application that enables users to compare concrete products by embodied carbon across their full life cycle.

The project intentionally separates extraction from presentation.

```
EPD PDFs
    │
    ▼
AI Extraction Pipeline
    │
    ▼
Normalized JSON
    │
    ▼
Next.js Comparison App
```

---

## Repository Structure

```
carbon-lens/

apps/
    web/

packages/
    extractor/

        src/

            prompts/
            validators/
            services/

            index.ts

            extractor.ts

            prompt.ts

            schema.ts
            types.ts

epds/

data/

README.md
EXTRACTION.md
schema.md
agent.md
```

---

## Technology

- Next.js
- TypeScript
- Node.js
- Gemini 3 Flash Preview
- Zod

---

## Goals

- Preserve provenance
- Never fabricate values
- Normalize lifecycle stages
- Make comparisons transparent

