# Playbook: LLM Data Poisoning Response

**ID**: PB-52
**Severity**: Critical | **Category**: AI/ML Security
**MITRE ATT&CK**: [AML.T0020](https://atlas.mitre.org/techniques/AML.T0020) (Poison Training Data), [T1565](https://attack.mitre.org/techniques/T1565/) (Data Manipulation)
**Trigger**: Model accuracy degradation, unexpected outputs, training data integrity alert, third-party data compromise

### Data Poisoning IR Flow

```mermaid
graph LR
    Detect["🚨 Detect"] --> Analyze["🔍 Analyze"]
    Analyze --> Contain["🔒 Contain"]
    Contain --> Eradicate["🗑️ Eradicate"]
    Eradicate --> Recover["♻️ Recover"]
    Recover --> Lessons["📝 Lessons"]
    style Detect fill:#e74c3c,color:#fff
    style Analyze fill:#f39c12,color:#fff
    style Contain fill:#e67e22,color:#fff
    style Eradicate fill:#27ae60,color:#fff
    style Recover fill:#2980b9,color:#fff
    style Lessons fill:#8e44ad,color:#fff
```

---

## 1. Analysis (Triage)

### 1.1 Initial Assessment

| Check | How | Tool |
|:---|:---|:---|
| Model performance change | Compare metrics (accuracy, F1) against baseline | MLOps monitoring |
| Training data integrity | Audit recent training data additions | Data pipeline logs |
| Third-party data sources | Check for compromised external data feeds | Vendor notifications |
| Fine-tuning logs | Review recent fine-tuning/RLHF sessions | Training platform |
| RAG knowledge base | Scan for injected/modified documents | Document versioning |
| Embedding/vector integrity | Review recent embedding rebuilds and vector store changes | Vector DB audit logs |

### 1.2 Poisoning Type Classification

| Type | Description | Severity |
|:---|:---|:---|
| **Training data poisoning** | Malicious samples injected into training set | Critical |
| **RAG knowledge poisoning** | Corrupted documents in retrieval pipeline | High |
| **RLHF manipulation** | Biased human feedback during alignment | Critical |
| **Fine-tuning backdoor** | Trigger phrase activates hidden behavior | Critical |
| **Label flipping** | Incorrect labels on training examples | High |

### 1.3 Scope Assessment

- [ ] When was the last clean model checkpoint?
- [ ] What data sources were added since last known-good state?
- [ ] How many users received potentially compromised outputs?  
- [ ] Is the poisoning targeted (specific topics) or broad?

---

## 2. Containment

### 2.1 Immediate Actions (within 30 minutes)

| # | Action | Tool | Done |
|:---:|:---|:---|:---:|
| 1 | Rollback to last known-good model checkpoint | MLOps platform | ☐ |
| 2 | Halt all ongoing training/fine-tuning jobs | Training orchestrator | ☐ |
| 3 | Quarantine suspected training data sources | Data pipeline | ☐ |
| 4 | Enable enhanced output monitoring | LLM monitoring | ☐ |
| 5 | Notify downstream consumers of potential data quality issues | Communication channels | ☐ |
| 6 | Freeze automated or third-party data ingestion until provenance is verified | Data pipeline / ETL | ☐ |

### 2.2 If RAG Knowledge Base Was Poisoned

| # | Action | Done |
|:---:|:---|:---:|
| 1 | Disable affected document collections from retrieval | ☐ |
| 2 | Audit all documents added in the suspect time window | ☐ |
| 3 | Restore documents from known-good backup | ☐ |
| 4 | Re-index clean knowledge base | ☐ |

---

## 3. IoC Collection

| Type | Value | Source |
|:---|:---|:---|
| Compromised data source | | Data pipeline logs |
| Suspect training samples | | Training dataset audit |
| Modified documents | | Version control diff |
| Model checkpoint before/after | | MLOps registry |
| Affected topics/domains | | Output analysis |

---

## 4. Escalation Criteria

| Condition | Escalate To |
|:---|:---|
| Production model serving poisoned outputs | CTO + AI Team Lead |
| Customer-facing decisions affected | Legal + Product |
| Third-party data provider compromised | Vendor Management + Procurement |
| Regulatory compliance at risk (financial/medical AI) | Compliance + Legal |
| Deliberate targeted attack confirmed | CISO + IR Team |

---

## 5. Decision Matrix

| Condition | Decision | Owner | SLA |
|:---|:---|:---|:---|
| Performance anomaly explained by benign model drift or expected data refresh | Keep service running, monitor, and document | SOC Analyst + AI Team | Same business day |
| Suspect poisoned records or documents, but no production impact confirmed | Freeze ingestion and continue scoped investigation | Security Engineer + SOC Manager | 30 minutes |
| Production outputs are poisoned or model integrity is untrusted | Roll back to known-good state and contain immediately | IR Engineer + AI Team Lead | Immediate |
| Customer impact, regulated decisions, or third-party provider compromise confirmed | Notify legal, compliance, procurement, and executives as needed | SOC Manager + CISO | Per incident policy |

---

## 6. Recovery

- [ ] Retrain model from clean, audited dataset
- [ ] Implement data provenance tracking for all training data
- [ ] Restore only from sources with approved lineage or hash validation
- [ ] Deploy canary samples to detect future poisoning
- [ ] Validate model against comprehensive test suite
- [ ] Restore RAG knowledge base from verified backup

---

## 7. Post-Incident

- [ ] Implement data validation gates in training pipeline
- [ ] Add automated anomaly detection for training data
- [ ] Establish regular model performance regression testing
- [ ] Require approval workflow for new data source onboarding and re-index jobs
- [ ] Preserve dataset lineage and hash manifests for future investigations
- [ ] Review and harden data source access controls
- [ ] Document in [Incident Report](../../11_Reporting_Templates/incident_report.en.md)

---

## Detection Rules (Sigma)

| Rule | File |
|:---|:---|
| LLM Data Poisoning Indicators | [ai_data_poisoning.yml](../../08_Detection_Engineering/sigma_rules/ai_data_poisoning.yml) |

## Related Documents

- [IR Framework](../Framework.en.md)
- [Compliance Mapping](../../07_Compliance_Privacy/Compliance_Mapping.en.md)
- [PB-51 AI Prompt Injection](AI_Prompt_Injection.en.md)
- [PB-32 Supply Chain Attack](Supply_Chain_Attack.en.md)
- [SOC Use Case Library](../../08_Detection_Engineering/SOC_Use_Case_Library.en.md)

## References

- [MITRE ATLAS AML.T0020 — Poison Training Data](https://atlas.mitre.org/techniques/AML.T0020)
- [OWASP GenAI — LLM04:2025 Data and Model Poisoning](https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/)
- [NIST AI 100-2e2025 — Adversarial Machine Learning](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)
- [NIST AI RMF Playbook](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)
- [CISA — AI Data Security: Best Practices for Securing Data Used to Train & Operate AI Systems](https://www.cisa.gov/resources-tools/resources/ai-data-security-best-practices-securing-data-used-train-operate-ai-systems)
