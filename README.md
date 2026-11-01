# OIL-LINK (P6 / Field Sync Layer)

**OIL-LINK** is an enterprise-grade field tracking and schedule reconciliation engine designed specifically for capital oil & gas and heavy industrial infrastructure projects. It bridges the operational divide between active field construction sites and project planning controls by mapping natural-language supervisor progress logs directly to Primavera P6 (L5/L6) schedule activities.

---

## 📌 The Problem
In upstream and industrial field operations, progress capture is typically messy—logged via handwritten daily logs, walkie-talkie updates, or colloquial Hindi/English voice notes. Manually mapping these informal updates to rigorous Primavera P6 WBS activities, tracking spool welds, and reconciling remaining quantities is a major bottleneck that delays earned value analysis and creates blind spots in schedule forecasting.

---

## 🚀 Key Features

* **VoiceTimeAgent (Field-First Multimodal Capture):**
  * Built for site supervisors to capture progress using voice notes or fast multilingual transcripts (e.g., *"Aaj Bay 4 pe pipe spool welding 14 joints complete"*).
  * Automatically compiles reports into structured multipart streams (`file` binary blobs with ISO `report_date`) for ingestion.

* **NLP Entity & Trade Extraction:**
  * Automatically recognizes disciplines (Piping & Fabrication, Civil, Electrical), work locations (e.g., Bay 4, Wells, Spools), quantity units, and completion metrics from raw audio/text.

* **ScheduleMatcher (AI Reconciliation Queue):**
  * Semantic alignment pipeline pairing extracted field metrics with Primavera P6 Activity IDs.
  * Side-by-side comparison of **Logged Qty** versus **Remaining in Schedule** accompanied by AI confidence scores.
  * Human-in-the-loop review queue supporting rapid batch decisions (`APPROVE` or `REJECT` / Remap) to maintain baseline schedule integrity.

* **Real-Time Project Metrics:**
  * Dashboards tracking pending reconciliations, P6 baseline spread variance, and mean AI model confidence across active field blocks.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 18, TypeScript, Vite
* **State Management & Server Cache:** TanStack Query (React Query v5)
* **Networking:** Axios
* **UI & Styling:** Tailwind CSS, Lucide Icons

### Backend
* **API Engine:** FastAPI (Python)
* **Ingestion & Validation:** Pydantic models for multipart file payloads and PATCH reconciliation workflows
* **Core AI/NLP:** Domain-adapted entity extraction and vector similarity matching against P6 activity dictionaries

---

## 🔄 Architecture & Data Flow

```text
Supervisor Audio / Transcript Note
                │
                ▼
      [VoiceTimeAgent] ─── (Blob + report_date) ───► POST /api/v1/reports/upload
                                                              │
                                                              ▼
                                                   [FastAPI NLP & P6 Engine]
                                                              │
                                                              ▼
    [ScheduleMatcher UI] ◄── Queue & Match Scores ── GET /api/v1/matches/review-queue
                │
                ▼
Supervisor Review (APPROVE / REJECT) ────► PATCH /api/v1/matches/{id}/review ──► P6 Schedule Sync


