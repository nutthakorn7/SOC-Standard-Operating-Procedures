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

---

## 3. การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| Model ที่ใช้ production ส่ง output ที่ poison | CTO + AI Team Lead |
| การตัดสินใจที่ส่งผลต่อลูกค้าได้รับผลกระทบ | Legal + Product |
| ผู้ให้บริการข้อมูลภายนอกถูกบุกรุก | Vendor Management |
| AI ที่เกี่ยวกับการเงิน/การแพทย์ | Compliance + Legal |

---

## 4. การกู้คืน

- [ ] Train model ใหม่จากชุดข้อมูลที่สะอาดและตรวจสอบแล้ว
- [ ] ปรับใช้ data provenance tracking
- [ ] Deploy canary samples เพื่อตรวจจับ poisoning ในอนาคต
- [ ] ตรวจสอบ model กับ test suite ที่ครอบคลุม

---

## Detection Rules (Sigma)

| กฎ | ไฟล์ |
|:---|:---|
| LLM Data Poisoning Indicators | [ai_data_poisoning.yml](../../08_Detection_Engineering/sigma_rules/ai_data_poisoning.yml) |

## เอกสารที่เกี่ยวข้อง

- [IR Framework](../Framework.th.md)
- [PB-51 AI Prompt Injection](AI_Prompt_Injection.th.md)
- [PB-21 Supply Chain Attack](Supply_Chain_Attack.th.md)

## References

- [MITRE ATLAS AML.T0020 — Poison Training Data](https://atlas.mitre.org/techniques/AML.T0020)
- [OWASP Top 10 for LLMs](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
