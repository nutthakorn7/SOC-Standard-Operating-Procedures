# SOC Dashboard Templates

Pre-built dashboard templates for SOC operations monitoring. Import directly into your SIEM platform.

## Available Dashboards

| File | Platform | Panels | Import Method |
|:---|:---|:---:|:---|
| [grafana_soc_operations.json](grafana_soc_operations.json) | Grafana 10+ | 14 | Dashboards → Import → Upload JSON |
| [kibana_soc_operations.ndjson](kibana_soc_operations.ndjson) | Kibana / OpenSearch 8+ | 11 | Stack Management → Saved Objects → Import |

---

## 📊 Dashboard Panels

### Row 1 — KPI Stats
| Panel | Metric | Thresholds |
|:---|:---|:---|
| 🔴 Open P1/P2 Incidents | Count of unresolved critical/high | 🟢 0 → 🟡 1 → 🔴 3+ |
| 📊 Total Alerts Today | 24h alert count | 🟢 <100 → 🟡 <500 → 🔴 1000+ |
| ⏱️ MTTA | Mean Time to Acknowledge (minutes) | 🟢 <10 → 🟡 <30 → 🔴 30+ |
| ⏱️ MTTR | Mean Time to Respond (hours) | 🟢 <4 → 🟡 <8 → 🔴 8+ |
| 🎯 True Positive Rate | TP / Total alerts (%) | 🔴 <60% → 🟡 <80% → 🟢 80%+ |
| 📉 SLA Breach Rate | Breached / Total (%) | 🟢 <5% → 🟡 <15% → 🔴 15%+ |

### Row 2 — Trends & Distribution
| Panel | Description |
|:---|:---|
| 📈 Alert Volume Trend | 7-day trend: Total / True Positive / False Positive |
| 🏷️ Incidents by Severity | Pie chart: P1–P4 distribution |
| 📋 Top 10 Alert Types | Horizontal bar: most triggered rules |

### Row 3 — Deep Analysis
| Panel | Description |
|:---|:---|
| 🗺️ MITRE ATT&CK Hits | Top 15 techniques triggered (30 days) |
| 👥 Analyst Workload | Open tickets per analyst |
| ⏱️ MTTA/MTTR Trend | 30-day performance trend |

### Row 4 — Context (Grafana only)
| Panel | Description |
|:---|:---|
| 🌍 Geo Map | Alert source countries |
| 📊 Playbook Usage | Which playbooks are used most |

---

## 🔧 Setup Requirements

### Grafana
- **Data source**: Prometheus (for metrics) or Elasticsearch (for logs)
- **Required metrics** (if using Prometheus):
  - `soc_alerts_total` (labels: `rule_name`, `severity`, `verdict`)
  - `soc_incidents_total` (labels: `severity`, `assignee`)
  - `soc_mtta_seconds`, `soc_mttr_seconds`
  - `soc_mitre_technique_hits_total` (labels: `technique_id`, `technique_name`)

### Kibana / OpenSearch
- **Index patterns**: `soc-alerts-*`, `soc-incidents-*`
- **Required fields**: `@timestamp`, `severity`, `rule.name`, `assignee`, `verdict`, `mitre.technique_id`, `mtta_seconds`, `mttr_seconds`, `sla_breached`

---

## 📎 Related Documents
- [SOC Metrics & KPIs](../../06_Operations_Management/SOC_Metrics.en.md)
- [Severity Matrix](../../05_Incident_Response/Severity_Matrix.en.md)
- [MITRE ATT&CK Heatmap](../mitre_attack_heatmap.html)
