# Detection Rule Testing SOP

> **Document ID:** DRT-001  
> **Version:** 1.0  
> **Last Updated:** 2026-02-15  
> **Owner:** Detection Engineer / SOC Lead

---

## Purpose

Defines the process for testing detection rules (Sigma, YARA, custom SIEM) before deploying to production. Ensures rules detect real threats without excessive false positives.

---

## Testing Pipeline

```mermaid
graph LR
    Write[1. Write Rule] --> Validate[2. Syntax Validate]
    Validate --> BackTest[3. Backtest]
    BackTest --> Stage[4. Staging Test]
    Stage --> Peer[5. Peer Review]
    Peer --> Deploy[6. Deploy]
    Deploy --> Monitor[7. Monitor 7 Days]
```

### Step 1: Write Rule
- Follow [Sigma specification](https://sigmahq.io/docs/basics/rules.html)
- Include: title, description, author, date, MITRE ATT&CK mapping

### Step 2: Syntax Validation

```bash
# Use the project's validator
python tools/sigma_validator.py path/to/rule.yml

# Or use sigmac directly
sigmac -t splunk path/to/rule.yml
```

**Pass criteria:** Zero syntax errors, valid MITRE mapping.

### Step 3: Backtest (Historical Data)

Run the rule against **7–30 days** of historical logs:

```bash
# Splunk
index=windows sourcetype=WinEventLog:Security
| where [translate_sigma_to_spl]
| stats count by ComputerName, User

# Elastic
GET /logs-*/_search
{
  "query": { ... translated sigma ... },
  "aggs": { "per_host": { "terms": { "field": "host.name" } } }
}
```

**Pass criteria:**
- [ ] Detects known-bad events (if available in test data)
- [ ] False positive rate ≤ 20% (review top 20 hits manually)
- [ ] Alert volume ≤ 50/day (otherwise needs tuning)

### Step 4: Staging Test

If you have a staging SIEM:
1. Deploy rule to staging
2. Run Atomic Red Team test for the corresponding technique
3. Verify alert triggers with correct severity and context

If no staging:
1. Deploy rule as **disabled** in production
2. Run manually against live data for 24 hours
3. Review results before enabling

### Step 5: Peer Review

Another detection engineer or T2 analyst reviews:
- [ ] Logic is correct (no gaps, no over-matching)
- [ ] Whitelist/exclusions are appropriate
- [ ] MITRE mapping is accurate
- [ ] Description is clear for T1 analysts
- [ ] Related playbook is referenced

### Step 6: Deploy via Change Management

Follow [Change Management SOP](Change_Management.en.md):
- Standard category for new rules
- Git commit with descriptive message
- Tag with version

### Step 7: Monitor (7-Day Bake Period)

After deployment, monitor for 7 days:

| Metric | Target | Action if Failed |
|:---|:---:|:---|
| False positive rate | ≤ 20% | Tune whitelists |
| Alert volume | ≤ 50/day | Adjust thresholds |
| True positive detection | ≥ 1 (if applicable) | Verify by simulation |
| Performance impact | ≤ 5% query time increase | Optimize query |

---

## Rule Quality Checklist

```
□ Title is descriptive and unique
□ Description explains what the rule detects
□ Author and date are set
□ MITRE ATT&CK technique is mapped
□ Level (severity) is appropriate
□ Logsource is specified correctly
□ Detection logic uses correct field names
□ False positive section documents known FPs
□ References include source/blog/CVE
□ Tests pass: syntax, backtest, staging
□ Peer review approved
□ Change request submitted
```

---

## Related Documents

- [Change Management SOP](Change_Management.en.md)
- [Detection Rules Index](../07_Detection_Rules/README.md)
- [Use Case Prioritization](../01_SOC_Fundamentals/Use_Case_Prioritization.en.md)
