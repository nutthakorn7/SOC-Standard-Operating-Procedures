# Playbook: การตอบสนอง LLM Data Poisoning

**รหัส**: PB-52
**ความรุนแรง**: วิกฤต | **หมวดหมู่**: AI/ML Security
**MITRE ATT&CK**: [AML.T0020](https://atlas.mitre.org/techniques/AML.T0020) (Poison Training Data), [T1565](https://attack.mitre.org/techniques/T1565/) (Data Manipulation)
**ทริกเกอร์**: ประสิทธิภาพ Model ลดลง, ผลลัพธ์ผิดปกติ, แจ้งเตือนข้อมูล training ถูกแก้ไข

---

## 1. การวิเคราะห์ (Triage)

| ตรวจสอบ | วิธี | เครื่องมือ |
|:---|:---|:---|
| เปรียบเทียบประสิทธิภาพ | ตรวจ accuracy, F1 เทียบกับ baseline | MLOps monitoring |
| ความสมบูรณ์ข้อมูล training | ตรวจสอบข้อมูลที่เพิ่มเข้ามาล่าสุด | Data pipeline logs |
| แหล่งข้อมูลภายนอก | ตรวจ vendor data feeds ว่าถูกบุกรุกไหม | Vendor notifications |
| RAG knowledge base | สแกนหาเอกสารที่ถูกแก้ไข/ฝังอันตราย | Document versioning |
| ความถูกต้องของ embedding/vector | ตรวจการ rebuild embedding และการเปลี่ยนแปลงใน vector store ล่าสุด | Vector DB audit logs |

### 1.1 ประเภท Data Poisoning

| รูปแบบ | คำอธิบาย | ความรุนแรง |
|:---|:---|:---|
| **Training data poisoning** | ตัวอย่างอันตรายถูกฝังเข้าชุด training | วิกฤต |
| **RAG knowledge poisoning** | เอกสารที่เสียหายใน retrieval pipeline | สูง |
| **RLHF manipulation** | Feedback ที่ bias ในขั้นตอน alignment | วิกฤต |
| **Fine-tuning backdoor** | วลีทริกเกอร์ที่เปิดพฤติกรรมซ่อน | วิกฤต |

---

## 2. การจำกัดวง (Containment)

| # | การดำเนินการ | เครื่องมือ | เสร็จ |
|:---:|:---|:---|:---:|
| 1 | Rollback ไปยัง model checkpoint ที่สะอาด | MLOps platform | ☐ |
| 2 | หยุดงาน training/fine-tuning ทั้งหมด | Training orchestrator | ☐ |
| 3 | กักกันแหล่งข้อมูล training ที่สงสัย | Data pipeline | ☐ |
| 4 | เปิดการตรวจสอบ output แบบเข้มข้น | LLM monitoring | ☐ |
| 5 | หยุด automated หรือ third-party data ingestion จนกว่าจะยืนยัน provenance ได้ | Data pipeline / ETL | ☐ |

---

## 3. การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| Model ที่ใช้ production ส่ง output ที่ poison | CTO + AI Team Lead |
| การตัดสินใจที่ส่งผลต่อลูกค้าได้รับผลกระทบ | Legal + Product |
| ผู้ให้บริการข้อมูลภายนอกถูกบุกรุก | Vendor Management |
| AI ที่เกี่ยวกับการเงิน/การแพทย์ | Compliance + Legal |

---

## 4. Decision Matrix

| เงื่อนไข | การตัดสินใจ | ผู้รับผิดชอบ | SLA |
|:---|:---|:---|:---|
| ความผิดปกติของ performance อธิบายได้จาก model drift ปกติหรือ data refresh ที่วางแผนไว้ | ให้ระบบทำงานต่อ เฝ้าระวัง และบันทึกผล | SOC Analyst + AI Team | ภายในวันทำการเดียวกัน |
| พบข้อมูลหรือเอกสารต้องสงสัย แต่ยังไม่ยืนยันผลกระทบใน production | หยุด ingestion และสืบสวนแบบจำกัดขอบเขตต่อ | Security Engineer + SOC Manager | 30 นาที |
| ยืนยันว่า output ใน production ถูก poison หรือความถูกต้องของ model ไม่น่าเชื่อถือ | rollback ไปยังสถานะที่เชื่อถือได้และจำกัดวงทันที | IR Engineer + AI Team Lead | ทันที |
| ยืนยันผลกระทบต่อลูกค้า, regulated decisions, หรือผู้ให้บริการภายนอกถูก compromise | แจ้ง legal, compliance, procurement, และผู้บริหารตามความเหมาะสม | SOC Manager + CISO | ตาม incident policy |

---

## 5. การกู้คืน

- [ ] Train model ใหม่จากชุดข้อมูลที่สะอาดและตรวจสอบแล้ว
- [ ] ปรับใช้ data provenance tracking
- [ ] restore เฉพาะข้อมูลจากแหล่งที่มี lineage หรือ hash validation ที่อนุมัติแล้ว
- [ ] Deploy canary samples เพื่อตรวจจับ poisoning ในอนาคต
- [ ] ตรวจสอบ model กับ test suite ที่ครอบคลุม

---

## Detection Rules (Sigma)

| กฎ | ไฟล์ |
|:---|:---|
| LLM Data Poisoning Indicators | [ai_data_poisoning.yml](../../08_Detection_Engineering/sigma_rules/ai_data_poisoning.yml) |

## เอกสารที่เกี่ยวข้อง

- [IR Framework](../Framework.th.md)
- [Compliance Mapping](../../07_Compliance_Privacy/Compliance_Mapping.th.md)
- [PB-51 AI Prompt Injection](AI_Prompt_Injection.th.md)
- [PB-32 Supply Chain Attack](Supply_Chain_Attack.th.md)
- [SOC Use Case Library](../../08_Detection_Engineering/SOC_Use_Case_Library.th.md)

## References

- [MITRE ATLAS AML.T0020 — Poison Training Data](https://atlas.mitre.org/techniques/AML.T0020)
- [OWASP GenAI — LLM04:2025 Data and Model Poisoning](https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/)
- [NIST AI 100-2e2025 — Adversarial Machine Learning](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)
- [NIST AI RMF Playbook](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)
- [CISA — AI Data Security: Best Practices for Securing Data Used to Train & Operate AI Systems](https://www.cisa.gov/resources-tools/resources/ai-data-security-best-practices-securing-data-used-train-operate-ai-systems)
