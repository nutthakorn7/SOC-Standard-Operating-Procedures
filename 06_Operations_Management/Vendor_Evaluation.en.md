# SOC Vendor & Tool Evaluation Template

> **Document ID:** VENDOR-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** SOC Manager / CISO

---

## Purpose

Provides a structured framework for evaluating and comparing SOC tools and vendor solutions. Use this template when considering new SIEM, EDR, SOAR, TI, or any security tool.

---

## Evaluation Process

```mermaid
graph LR
    Need[1. Define Need] --> Research[2. Research Options]
    Research --> Shortlist[3. Shortlist 3-5]
    Shortlist --> POC[4. POC / Trial]
    POC --> Score[5. Score & Compare]
    Score --> Decide[6. Decision & Contract]
```

---

## Evaluation Criteria (Scoring Matrix)

Score each criterion **1–5** (1 = Poor, 5 = Excellent)

### Core Capabilities

| # | Criterion | Weight | Vendor A | Vendor B | Vendor C |
|:---:|:---|:---:|:---:|:---:|:---:|
| 1 | **Detection accuracy** (true positive rate) | 3× | /5 | /5 | /5 |
| 2 | **Log ingestion capacity** (EPS/GB per day) | 3× | /5 | /5 | /5 |
| 3 | **Query performance** (search speed) | 2× | /5 | /5 | /5 |
| 4 | **Alert customization** (rule creation flexibility) | 2× | /5 | /5 | /5 |
| 5 | **MITRE ATT&CK coverage** (built-in detections) | 2× | /5 | /5 | /5 |
| 6 | **Dashboard & visualization** quality | 1× | /5 | /5 | /5 |

### Integration & Compatibility

| # | Criterion | Weight | Vendor A | Vendor B | Vendor C |
|:---:|:---|:---:|:---:|:---:|:---:|
| 7 | **API availability** (REST API, webhooks) | 2× | /5 | /5 | /5 |
| 8 | **Integration with existing stack** | 3× | /5 | /5 | /5 |
| 9 | **Log source support** (OS, cloud, network, app) | 2× | /5 | /5 | /5 |
| 10 | **SOAR integration** (playbook automation) | 2× | /5 | /5 | /5 |

### Operations & Management

| # | Criterion | Weight | Vendor A | Vendor B | Vendor C |
|:---:|:---|:---:|:---:|:---:|:---:|
| 11 | **Ease of deployment** | 1× | /5 | /5 | /5 |
| 12 | **Administration overhead** | 2× | /5 | /5 | /5 |
| 13 | **Scalability** | 2× | /5 | /5 | /5 |
| 14 | **Documentation quality** | 1× | /5 | /5 | /5 |
| 15 | **Training resources** (academy, videos, docs) | 1× | /5 | /5 | /5 |

### Support & Vendor

| # | Criterion | Weight | Vendor A | Vendor B | Vendor C |
|:---:|:---|:---:|:---:|:---:|:---:|
| 16 | **Support SLA** (response time, 24/7) | 2× | /5 | /5 | /5 |
| 17 | **Vendor stability** (market presence, funding) | 1× | /5 | /5 | /5 |
| 18 | **Local support** (Thailand office/partner) | 2× | /5 | /5 | /5 |
| 19 | **Community & ecosystem** | 1× | /5 | /5 | /5 |

### Cost

| # | Criterion | Weight | Vendor A | Vendor B | Vendor C |
|:---:|:---|:---:|:---:|:---:|:---:|
| 20 | **License cost** (per node/EPS/GB) | 3× | /5 | /5 | /5 |
| 21 | **Implementation cost** | 2× | /5 | /5 | /5 |
| 22 | **Ongoing maintenance cost** | 2× | /5 | /5 | /5 |
| 23 | **Hidden costs** (storage, overages, add-ons) | 2× | /5 | /5 | /5 |
| 24 | **Contract flexibility** (term, exit clause) | 1× | /5 | /5 | /5 |

---

## Total Score Calculation

```
Weighted Score = Σ (Score × Weight) for each criterion
Max Score = Σ (5 × Weight) = 5 × total_weight
Final % = (Weighted Score / Max Score) × 100

Recommendation thresholds:
  ≥ 80% → Strong recommendation
  60-79% → Acceptable with caveats
  < 60% → Not recommended
```

---

## POC Checklist

During the Proof-of-Concept trial (recommend 2–4 weeks):

```
□ Deploy in test/staging environment
□ Ingest real log data (anonymized if needed)
□ Create 5 detection rules
□ Test alert workflow end-to-end
□ Measure query performance vs current solution
□ Test API integrations with existing tools
□ Evaluate admin UI and daily workflow
□ Test at expected data volume (EPS/GB)
□ Get feedback from 2+ analysts who used it daily
□ Document any bugs or limitations found
□ Verify support response time (open a test ticket)
```

---

## Cost Comparison Template

| Cost Item | Vendor A | Vendor B | Vendor C |
|:---|---:|---:|---:|
| Year 1 License | ฿___ | ฿___ | ฿___ |
| Implementation/Professional Services | ฿___ | ฿___ | ฿___ |
| Training | ฿___ | ฿___ | ฿___ |
| Infrastructure (servers/cloud) | ฿___ | ฿___ | ฿___ |
| **Year 1 Total** | **฿___** | **฿___** | **฿___** |
| Year 2+ Annual (license + support) | ฿___ | ฿___ | ฿___ |
| **3-Year TCO** | **฿___** | **฿___** | **฿___** |

---

## Decision Record

| Field | Detail |
|:---|:---|
| **Tool category** | (SIEM / EDR / SOAR / TI / Other) |
| **Vendors evaluated** | Vendor A, Vendor B, Vendor C |
| **Winner** | ___________ |
| **Key reasons** | (top 3 differentiators) |
| **Risks/concerns** | (known limitations to monitor) |
| **Decision date** | YYYY-MM-DD |
| **Approved by** | SOC Manager / CISO |
| **Contract term** | ___ years |
| **Go-live target** | YYYY-MM-DD |

---

## Total Cost of Ownership (TCO) Model

### 3-Year TCO Comparison Template

| Cost Category | Vendor A | Vendor B | Vendor C |
|:---|:---:|:---:|:---:|
| **Year 1** | | | |
| License/subscription | $ | $ | $ |
| Implementation/deployment | $ | $ | $ |
| Training | $ | $ | $ |
| Hardware (if on-prem) | $ | $ | $ |
| **Year 2** | | | |
| License renewal | $ | $ | $ |
| Support/maintenance | $ | $ | $ |
| Staff time for management | $ | $ | $ |
| **Year 3** | | | |
| License renewal | $ | $ | $ |
| Upgrade costs | $ | $ | $ |
| **Total 3-Year TCO** | **$** | **$** | **$** |
| **Cost per protected endpoint/user** | $ | $ | $ |

## Proof of Concept (POC) Checklist

### Pre-POC
```
□ Define success criteria (minimum 5 measurable criteria)
□ Identify test environment (isolated lab or staging)
□ Assign POC lead and evaluation team
□ Set POC duration (recommended: 2-4 weeks)
□ Prepare test data and scenarios
□ Sign NDA and POC agreement
```

### During POC
```
□ Install/configure per vendor guidance
□ Test integration with existing tools (SIEM, EDR, SOAR)
□ Run detection tests (Atomic Red Team scenarios)
□ Measure false positive rate
□ Test alert response time
□ Evaluate UI/UX for daily analyst workflows
□ Test API capabilities
□ Measure resource consumption (CPU, RAM, storage)
□ Test at expected data volume
```

### Post-POC
```
□ Score against success criteria
□ Collect feedback from all evaluators
□ Compare against current solution (if upgrading)
□ Calculate actual vs. estimated TCO
□ Present findings to SOC Manager / CISO
□ Make recommendation with justification
```

## Minimum Decision Inputs Before Selection

| Input | Why It Matters | Owner |
|:---|:---|:---|
| Defined use cases and measurable success criteria | Prevents buying features without operational need | SOC Manager |
| Expected data volume and growth estimate | Validates scale and cost assumptions | Security Engineer |
| Integration map to current tooling and workflows | Confirms implementation feasibility | Security Engineer |
| POC results with analyst feedback | Validates daily usability and detection value | SOC Analyst / SOC Lead |
| 3-year TCO and contract exit assumptions | Supports CISO and budget approval | CISO / Procurement |

## Escalation Triggers During Evaluation

| Condition | Escalate To | SLA | Reason |
|:---|:---|:---:|:---|
| Vendor cannot support a critical use case in POC | SOC Manager + CISO | Same business day | Reassess shortlist or scope |
| Cost exceeds approved budget band by > 15% | CISO + Procurement | Same business day | Confirm funding or negotiate scope |
| Product requires unsupported architecture or risky data flow | Security Engineer + CISO | Within 24 hours | Assess security and implementation risk |
| Vendor refuses audit, security questionnaire, or data processing terms | CISO + Legal | Immediate | Contract and compliance blocker |
| POC results are inconclusive due to poor data quality or scope drift | SOC Manager | Within 24 hours | Reset criteria before decision |

## Related Documents

- [Technology Stack Selection Guide](../01_SOC_Fundamentals/Technology_Stack.en.md)
- [Budget & Staffing](../01_SOC_Fundamentals/Budget_Staffing.en.md)
- [Change Management SOP](Change_Management.en.md)

## References

- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [MITRE Center for Threat-Informed Defense](https://ctid.mitre.org/)
