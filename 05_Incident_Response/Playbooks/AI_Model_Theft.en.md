# Playbook: AI Model Theft / Exfiltration Response

**ID**: PB-53
**Severity**: Critical | **Category**: AI/ML Security  
**MITRE ATT&CK**: [AML.T0024](https://atlas.mitre.org/techniques/AML.T0024) (Exfiltration via ML Inference API), [T1020](https://attack.mitre.org/techniques/T1020/) (Automated Exfiltration)
**Trigger**: Unusual API volume, model extraction pattern detected, intellectual property alert, insider threat indicator

### Model Theft IR Flow

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
| API call volume anomaly | Compare against baseline usage | API analytics |
| Query pattern analysis | Check for systematic input probing (model extraction) | API logs |
| User/key identification | Identify who is making suspicious queries | Auth logs |
| Data download audit | Check for model weight, config, or training data downloads | Storage access logs |
| Internal access review | Audit employee access to model repositories | IAM logs |
| Model inventory status | Confirm where weights, checkpoints, and export paths are registered | Model registry, storage audit |

### 1.2 Theft Vector Classification

| Vector | Indicator | Severity |
|:---|:---|:---|
| **Model extraction via API** | Systematic queries to replicate model behavior | Critical |
| **Weight/checkpoint theft** | Direct download of model files from storage | Critical |
| **Training data exfiltration** | Bulk download of proprietary training datasets | Critical |
| **Insider model copy** | Employee copying model to personal devices/repos | Critical |
| **Side-channel extraction** | Timing/confidence score analysis to infer architecture | High |

### 1.3 Scope Assessment

- [ ] What model(s) are targeted? What is their business value?
- [ ] How much of the model has been potentially extracted?
- [ ] Is this an external attacker or insider threat?
- [ ] Are training data, model weights, or both at risk?

---

## 2. Containment

### 2.1 Immediate Actions (within 15 minutes)

| # | Action | Tool | Done |
|:---:|:---|:---|:---:|
| 1 | Rate-limit or block suspicious API consumer | API Gateway | ☐ |
| 2 | Revoke compromised API keys/tokens | API management | ☐ |
| 3 | Lock access to model weight storage (S3/GCS/Blob) | Cloud IAM | ☐ |
| 4 | Enable watermark verification on model outputs | ML platform | ☐ |
| 5 | Freeze employee access under investigation | HR + IAM | ☐ |
| 6 | Disable non-essential artifact export, snapshot, or repo clone paths | Registry / SCM / Storage | ☐ |

### 2.2 If Model Extraction via API

| # | Action | Done |
|:---:|:---|:---:|
| 1 | Add randomized perturbation to API outputs | ☐ |
| 2 | Implement CAPTCHA or proof-of-work for high-volume requests | ☐ |
| 3 | Reduce output detail (hide confidence scores, logprobs) | ☐ |

### 2.3 If Insider Theft

| # | Action | Done |
|:---:|:---|:---:|
| 1 | Preserve all access logs and evidence | ☐ |
| 2 | Engage HR and Legal for investigation | ☐ |
| 3 | Cross-reference with [PB-14 Insider Threat](Insider_Threat.en.md) | ☐ |
| 4 | Check all repositories the employee had access to | ☐ |

---

## 3. IoC Collection

| Type | Value | Source |
|:---|:---|:---|
| Attacking IP/User | | API gateway logs |
| API key used | | Auth logs |
| Query volume (count/timeframe) | | API analytics |
| Downloaded files | | Storage access logs |
| Target model(s) | | Service routing |
| Employee ID (if insider) | | IAM/HR logs |

---

## 4. Escalation Criteria

| Condition | Escalate To |
|:---|:---|
| Production model weights confirmed stolen | CTO + CISO + Legal |
| Proprietary training data exfiltrated | Data Protection Officer + Legal |
| Insider confirmed | HR + Legal + CISO |
| Competitor suspected | Legal + Executive Leadership |
| Regulatory-protected model (finance/health) | Compliance + Legal |

---

## 5. Decision Matrix

| Condition | Decision | Owner | SLA |
|:---|:---|:---|:---|
| Query spike explained by approved load test or known partner behavior | Keep service running, document, and tune thresholds | SOC Analyst | Same shift |
| Suspicious extraction pattern observed, but no confirmed artifact or data theft yet | Rate-limit, preserve evidence, and continue investigation | SOC Analyst + Security Engineer | 15 minutes |
| Model files, checkpoints, or proprietary datasets accessed without authorization | Contain immediately and revoke access | IR Engineer + SOC Manager | Immediate |
| Insider theft, legal exposure, or executive/business impact confirmed | Notify legal, HR, privacy, and executive stakeholders | SOC Manager + CISO | Per incident policy |

---

## 6. Recovery

- [ ] Rotate all API keys and access tokens for affected model
- [ ] Implement model watermarking for future theft detection
- [ ] Add output perturbation to prevent future extraction
- [ ] Review and tighten IAM policies for model storage
- [ ] Reconcile model inventory and registry records with known-good versions
- [ ] Verify no unauthorized model copies exist

---

## 7. Post-Incident

- [ ] Implement API usage anomaly detection (baseline + alerts)
- [ ] Add model fingerprinting for theft attribution
- [ ] Deploy DLP rules for model file formats (.pt, .safetensors, .onnx, .gguf)
- [ ] Review external sharing paths for models, checkpoints, and datasets
- [ ] Review employee exit procedures for AI/ML teams
- [ ] Document in [Incident Report](../../11_Reporting_Templates/incident_report.en.md)

---

## Detection Rules (Sigma)

| Rule | File |
|:---|:---|
| AI Model Theft / Extraction Pattern | [ai_model_theft.yml](../../08_Detection_Engineering/sigma_rules/ai_model_theft.yml) |

## Related Documents

- [IR Framework](../Framework.en.md)
- [Compliance Mapping](../../07_Compliance_Privacy/Compliance_Mapping.en.md)
- [PB-08 Data Exfiltration](Data_Exfiltration.en.md)
- [PB-14 Insider Threat](Insider_Threat.en.md)
- [PB-51 AI Prompt Injection](AI_Prompt_Injection.en.md)

## References

- [MITRE ATLAS AML.T0024 — Exfiltration via ML Inference API](https://atlas.mitre.org/techniques/AML.T0024)
- [OWASP GenAI — LLM10: Model Theft](https://genai.owasp.org/llmrisk2023-24/llm10-model-theft/)
- [NIST AI 100-2e2025 — Adversarial Machine Learning](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)
- [NIST AI RMF Playbook](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)
- [CISA — Joint Guidance on Deploying AI Systems Securely](https://www.cisa.gov/news-events/alerts/2024/04/15/joint-guidance-deploying-ai-systems-securely)
