# Playbook: การตอบสนอง AI Model Theft / Exfiltration

**รหัส**: PB-53
**ความรุนแรง**: วิกฤต | **หมวดหมู่**: AI/ML Security
**MITRE ATT&CK**: [AML.T0024](https://atlas.mitre.org/techniques/AML.T0024) (Exfiltration via ML Inference API), [T1020](https://attack.mitre.org/techniques/T1020/) (Automated Exfiltration)
**ทริกเกอร์**: ปริมาณ API ผิดปกติ, ตรวจจับรูปแบบ model extraction, แจ้งเตือนทรัพย์สินทางปัญญา

---

## 1. การวิเคราะห์ (Triage)

| ตรวจสอบ | วิธี | เครื่องมือ |
|:---|:---|:---|
| ปริมาณ API call ผิดปกติ | เปรียบเทียบกับ baseline | API analytics |
| รูปแบบ query | ตรวจหาการ probe แบบเป็นระบบ | API logs |
| ระบุ user/key | ใครกำลังทำ query ที่น่าสงสัย | Auth logs |
| ตรวจสอบการดาวน์โหลด | model weights, config, training data | Storage access logs |
| ตรวจการเข้าถึงภายใน | ตรวจสอบ employee access | IAM logs |

### 1.1 ช่องทางการขโมย

| ช่องทาง | ตัวบ่งชี้ | ความรุนแรง |
|:---|:---|:---|
| **Model extraction ผ่าน API** | Query แบบเป็นระบบเพื่อ replicate model | วิกฤต |
| **ขโมย model weights** | ดาวน์โหลดไฟล์ model จาก storage โดยตรง | วิกฤต |
| **ขโมย training data** | ดาวน์โหลด dataset จำนวนมาก | วิกฤต |
| **คนเคลย์ copy model** | พนักงานคัดลอก model ไปอุปกรณ์ส่วนตัว | วิกฤต |

---

## 2. การจำกัดวง (Containment)

| # | การดำเนินการ | เครื่องมือ | เสร็จ |
|:---:|:---|:---|:---:|
| 1 | Rate-limit หรือบล็อก API consumer ที่สงสัย | API Gateway | ☐ |
| 2 | เพิกถอน API keys/tokens ที่ถูกบุกรุก | API management | ☐ |
| 3 | ล็อกการเข้าถึง model storage (S3/GCS/Blob) | Cloud IAM | ☐ |
| 4 | เปิดการตรวจสอบ watermark บน model output | ML platform | ☐ |
| 5 | ระงับสิทธิ์พนักงานที่อยู่ระหว่างสอบสวน | HR + IAM | ☐ |

---

## 3. การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| Model weights ถูกขโมยยืนยันแล้ว | CTO + CISO + Legal |
| Training data ที่เป็นความลับรั่วไหล | DPO + Legal |
| ยืนยันเป็นภัยคุกคามจากภายใน | HR + Legal + CISO |
| สงสัยว่าเป็นคู่แข่ง | Legal + ผู้บริหาร |

---

## 4. การกู้คืน

- [ ] Rotate API keys และ access tokens ทั้งหมดของ model ที่ได้รับผลกระทบ
- [ ] ปรับใช้ model watermarking เพื่อตรวจจับการขโมยในอนาคต
- [ ] เพิ่ม output perturbation เพื่อป้องกัน extraction
- [ ] ตรวจสอบและปรับปรุง IAM policies สำหรับ model storage

---

## Detection Rules (Sigma)

| กฎ | ไฟล์ |
|:---|:---|
| AI Model Theft / Extraction | [ai_model_theft.yml](../../08_Detection_Engineering/sigma_rules/ai_model_theft.yml) |

## เอกสารที่เกี่ยวข้อง

- [IR Framework](../Framework.th.md)
- [PB-08 Data Exfiltration](Data_Exfiltration.th.md)
- [PB-14 Insider Threat](Insider_Threat.th.md)
- [PB-51 AI Prompt Injection](AI_Prompt_Injection.th.md)

## References

- [MITRE ATLAS AML.T0024 — Exfiltration via ML Inference API](https://atlas.mitre.org/techniques/AML.T0024)
- [OWASP Top 10 for LLMs](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
