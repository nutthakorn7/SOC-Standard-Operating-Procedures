# Playbook: อุปกรณ์มือถือถูกบุกรุก

**ID**: PB-28
**ระดับความรุนแรง**: สูง | **หมวดหมู่**: ความปลอดภัยอุปกรณ์ปลายทาง
**MITRE ATT&CK**: [T1456](https://attack.mitre.org/techniques/T1456/) (Drive-By Compromise — Mobile), [T1474](https://attack.mitre.org/techniques/T1474/) (Supply Chain Compromise — Mobile)
**ทริกเกอร์**: MTD alert (malicious app), MDM compliance violation, ผู้ใช้รายงาน SIM swap, phishing on mobile


## หลังเหตุการณ์ (Post-Incident)

- [ ] ทบทวน MDM enrollment compliance
- [ ] อัพเดท mobile security policy (jailbreak/root detection)
- [ ] บังคับ OS version minimum ผ่าน MDM
- [ ] ทบทวน app sideloading policies
- [ ] ใช้ Mobile Threat Defense (MTD) solution
- [ ] จัดทำ [Incident Report](../../11_Reporting_Templates/incident_report.th.md)

### ผังตรวจจับภัยคุกคามมือถือ

```mermaid
graph TD
    MTD["🔍 MTD"] --> Type{"📱 ประเภท?"}
    Type -->|Malicious App| App["🦠 ลบ App"]
    Type -->|Jailbreak/Root| JB["⚠️ Block Access"]
    Type -->|Network Attack| Net["🌐 VPN Force"]
    Type -->|SIM Swap| SIM["📞 ติดต่อ Carrier"]
    App --> MDM["📲 MDM Action"]
    JB --> MDM
    Net --> MDM
```

### ผังขั้นตอนควบคุม BYOD

```mermaid
sequenceDiagram
    participant User as ผู้ใช้
    participant MDM
    participant SOC
    participant IT
    MDM->>SOC: 🚨 Compliance violation
    SOC->>MDM: Block corporate access
    SOC->>User: แจ้ง + คำแนะนำ
    User->>IT: นำอุปกรณ์มาตรวจ
    IT->>MDM: Remediate / Re-enroll
    MDM-->>SOC: ✅ Compliant
```

---

## ผังการตัดสินใจ

```mermaid
graph TD
    Alert["🚨 มือถือผิดปกติ"] --> Type{"📱 ประเภทการบุกรุก?"}
    Type -->|Spyware| Spy["🕵️ โปรไฟล์/แอปอันตราย"]
    Type -->|Jailbreak/Root| JB["🔓 ความสมบูรณ์ของอุปกรณ์ถูกทำลาย"]
    Type -->|แอปอันตราย| App["📦 แอปที่ไม่น่าเชื่อถือ"]
    Type -->|SIM Swap| SIM["📞 หมายเลขถูกขโมย"]
    Type -->|Smishing| Smish["📩 คลิกลิงก์ SMS"]
    Spy --> Scope["📊 ประเมินข้อมูลที่เปิดเผย"]
    JB --> Scope
    App --> Scope
    SIM --> Urgent["🔴 ด่วน — MFA/Auth เสี่ยง"]
    Scope --> Corp{"💼 เข้าถึงข้อมูลองค์กร?"}
    Corp -->|ใช่| Contain["🔒 ควบคุมเต็มรูปแบบ"]
    Corp -->|ไม่| Monitor["👁️ ติดตาม + ให้ความรู้"]
    Urgent --> Contain
```

---

## 1. การวิเคราะห์

### 1.1 ประเภทการบุกรุก

| ประเภท | ตัวบ่งชี้ | การตรวจจับ |
|:---|:---|:---|
| **Spyware/Stalkerware** | MDM profiles แปลก, แบตเตอรี่หมดเร็ว | MDM, MTD |
| **Jailbreak/Root** | Cydia, Magisk, SuperSU | MDM jailbreak detection |
| **แอปอันตราย** | APK/IPA ที่ sideload | MTD, MDM app inventory |
| **SIM Swap** | สูญเสียสัญญาณ, ไม่ได้รับ OTP | รายงานผู้ใช้, ผู้ให้บริการ |
| **Smishing** | คลิกลิงก์ SMS ที่น่าสงสัย | รายงานผู้ใช้, MTD |
| **การโจมตีเครือข่าย** | Wi-Fi ปลอม, MITM | MTD |

### 1.2 รายการตรวจสอบ

| รายการ | วิธีตรวจสอบ | เสร็จ |
|:---|:---|:---:|
| สถานะ MDM compliance | Intune / Jamf / WS1 | ☐ |
| App inventory — มีแอปที่ sideload? | MDM | ☐ |
| Configuration profiles — มีโปรไฟล์แปลก? | MDM | ☐ |
| การเชื่อมต่อเครือข่าย — IP ที่น่าสงสัย? | MTD | ☐ |
| เข้าถึงอีเมลองค์กรจากอุปกรณ์? | Exchange / M365 | ☐ |
| VPN connections จากอุปกรณ์? | VPN logs | ☐ |
| OS อัปเดตล่าสุดหรือไม่? | MDM | ☐ |

### 1.3 การประเมินข้อมูลที่เปิดเผย

| ประเภทข้อมูล | เข้าถึงได้จากอุปกรณ์? | รั่วไหล? |
|:---|:---|:---|
| อีเมลองค์กรและไฟล์แนบ | ☐ ใช่ ☐ ไม่ | ☐ |
| ปฏิทินและผู้ติดต่อ | ☐ ใช่ ☐ ไม่ | ☐ |
| Cloud storage (OneDrive/GDrive) | ☐ ใช่ ☐ ไม่ | ☐ |
| VPN access ไปเครือข่ายภายใน | ☐ ใช่ ☐ ไม่ | ☐ |
| Authenticator/MFA tokens | ☐ ใช่ ☐ ไม่ | ☐ |

---

## 2. การควบคุม

### 2.1 การดำเนินการทันที

| # | การดำเนินการ | เครื่องมือ | เสร็จ |
|:---:|:---|:---|:---:|
| 1 | **ล็อกอุปกรณ์** ระยะไกล | MDM | ☐ |
| 2 | **ลบข้อมูลองค์กร** (Selective Wipe) | MDM (Intune) | ☐ |
| 3 | **ถอดอุปกรณ์** จาก Conditional Access | IdP | ☐ |
| 4 | **บล็อกเครือข่าย** (Wi-Fi, VPN) | Wi-Fi / VPN | ☐ |
| 5 | **รีเซ็ตรหัสผ่าน** ผู้ใช้ | AD / IdP | ☐ |
| 6 | **เพิกถอน OAuth tokens** | IdP | ☐ |

### 2.2 กรณี SIM Swap

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | ติดต่อผู้ให้บริการทันทีเพื่อกู้หมายเลข | ☐ |
| 2 | เปลี่ยน MFA จาก SMS เป็น authenticator app / FIDO2 | ☐ |
| 3 | รีเซ็ตรหัสผ่าน **ทุกบัญชี** ที่ใช้ SMS MFA | ☐ |
| 4 | ตรวจสอบการเข้าถึงที่ไม่ได้รับอนุญาตระหว่าง SIM swap | ☐ |

---

## 3. การกำจัด

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | **Factory reset** อุปกรณ์ (หากยืนยัน spyware/rootkit) | ☐ |
| 2 | ลบโปรไฟล์และแอปอันตราย | ☐ |
| 3 | อัปเดต OS ล่าสุด | ☐ |
| 4 | ลงทะเบียนอุปกรณ์ใหม่ใน MDM | ☐ |

---

## 4. การฟื้นฟู

| # | การดำเนินการ | เสร็จ |
|:---:|:---|:---:|
| 1 | กู้คืนข้อมูลจาก backup ที่สะอาด (**ไม่รวมแอป**) | ☐ |
| 2 | ลงทะเบียน MFA ใหม่จากอุปกรณ์ที่สะอาด | ☐ |
| 3 | บังคับนโยบาย MDM: app allowlist, บล็อก sideloading | ☐ |
| 4 | เปิดใช้ MTD หากยังไม่ได้ deploy | ☐ |
| 5 | ติดตามอุปกรณ์ 30 วัน | ☐ |

---

## 5. Evidence Checklist

| ประเภทหลักฐาน | สิ่งที่ต้องเก็บ | แหล่งข้อมูล | เหตุผลที่ต้องเก็บ |
|:---|:---|:---|:---|
| หลักฐานอุปกรณ์ | device ID, OS version, jailbreak/root state, rogue profile, app list | MDM / MTD | ใช้ยืนยันสถานะความปลอดภัยของอุปกรณ์ |
| หลักฐานเครือข่าย | suspicious destination, captive portal abuse, MitM trace, VPN use | MTD / proxy / DNS | ใช้ดูเส้นทาง remote control หรือ interception |
| หลักฐานด้านตัวตน | account ที่เข้าถึง, MFA method, token reset, mail/cloud session | IdP / app logs | ใช้ดูว่ามี account abuse ต่อจาก mobile compromise หรือไม่ |
| หลักฐาน SIM | carrier event, number-transfer timeline, recovery action | Carrier / helpdesk | ใช้แยก device malware ออกจาก SIM-swap |
| หลักฐานข้อมูล | corporate mail, document, chat data, screenshot, clipboard artifact | App telemetry / DLP / MTD | ใช้ประเมิน breach impact |

---

## 6. Minimum Telemetry Required

| แหล่ง Telemetry | ใช้เพื่ออะไร | ความสำคัญ | Blind Spot ถ้าไม่มี |
|:---|:---|:---:|:---|
| MDM และ MTD telemetry | ดู device state, rogue app, root/jailbreak, policy violation | Required | ยืนยัน mobile compromise ไม่ได้ |
| Identity และ app-access logs | ดู mail, cloud, VPN, และ MFA activity จากอุปกรณ์ | Required | scope ของ account impact ไม่ชัด |
| Carrier และ SIM records | ดู SIM swap, number change, service interruption | Required | พลาด compromise path ที่เกี่ยวกับ SMS MFA |
| Network และ DNS telemetry | ดู suspicious destination และ callback | Recommended | remote-control behavior มองไม่ชัด |
| Backup และ asset records | ใช้กำหนดทางกู้คืนและ owner context | Recommended | clean rebuild path ช้าลง |

---

## 7. False Positive และ Tuning Guide

| Scenario | ทำไมจึงดูน่าสงสัย | วิธีตรวจสอบ | Tuning Action | ต้องยกระดับเมื่อ |
|:---|:---|:---|:---|:---|
| OS update หรือ MDM profile change | event ปกติจากการจัดการเครื่องอาจดูเหมือน rogue profile | ยืนยัน MDM action และเวลาปล่อยอัปเดต | suppress เฉพาะ profile/app change ที่อนุมัติ | พบ unknown profile, sideloaded app, หรือ root indicator |
| การ enroll โทรศัพท์เครื่องใหม่ | device/app event ใหม่อาจดูเหมือน compromise | ยืนยัน helpdesk ticket และผู้ใช้ | allowlist enrollment window และ device ID ที่อนุมัติ | account เดียวกันมี risky session หรือ network behavior แปลก |
| carrier outage หรือ roaming event | connectivity anomaly ดูเหมือน SIM-related abuse | ยืนยันสถานะกับ carrier และไม่พบ account misuse | ลด severity เมื่อยืนยันว่าเป็นปัญหา carrier | มี SMS MFA reset หรือ login จาก location ใหม่ตามมา |
| พฤติกรรมของ app บน BYOD | consumer app อาจทำให้ network noisy | ตรวจการแยก work container และไม่มี corporate-data access | tune เฉพาะขอบเขตของ BYOD container | corporate app, mail, หรือ VPN ได้รับผลกระทบ |

---

## 8. เกณฑ์การยกระดับ

| เงื่อนไข | ยกระดับไปยัง |
|:---|:---|
| อุปกรณ์ผู้บริหารถูกบุกรุก | CISO ทันที |
| SIM swap กับ admin/VIP | CISO + ทีม Identity |
| ข้อมูลองค์กรถูกนำออกจากอุปกรณ์ | Legal + DPO (PDPA 72 ชม.) |
| อุปกรณ์หลายเครื่องถูกบุกรุก (แคมเปญ) | Major Incident |

---

### ผัง Mobile Threat Classification

```mermaid
graph TD
    Threat["📱 Mobile Threat"] --> App["📦 Malicious App"]
    Threat --> Network["🌐 Network attack"]
    Threat --> OS["⚙️ OS exploit"]
    Threat --> Phish["🎣 Mobile phishing"]
    App --> MDM["🛡️ MDM block"]
    Network --> VPN["🔒 VPN enforce"]
    OS --> Update["🔄 Force update"]
    Phish --> Training["📚 Training"]
    style Threat fill:#e74c3c,color:#fff
```

### ผัง BYOD Security Architecture

```mermaid
graph LR
    Personal["📱 BYOD"] --> Enroll["📲 MDM enroll"]
    Enroll --> Container["🔒 Work container"]
    Container --> Access["📁 Corporate data"]
    Container --> Policy["📋 DLP policy"]
    Access --> Encrypt["🔐 Encrypted"]
    Policy --> Wipe["🗑️ Selective wipe"]
    style Container fill:#27ae60,color:#fff
    style Wipe fill:#e74c3c,color:#fff
```

## กฎตรวจจับ (Sigma)

| กฎ | ไฟล์ |
|:---|:---|
| Mobile Device Compromise Indicators | [cloud_mobile_compromise.yml](../../08_Detection_Engineering/sigma_rules/cloud_mobile_compromise.yml) |
| Device Offline for Extended Period | [mdm_device_offline.yml](../../08_Detection_Engineering/sigma_rules/mdm_device_offline.yml) |

## เอกสารที่เกี่ยวข้อง

- [กรอบการตอบสนองต่อเหตุการณ์](../Framework.th.md)
- [แม่แบบรายงานเหตุการณ์](../../11_Reporting_Templates/incident_report.th.md)
- [PB-05 บัญชีถูกบุกรุก](Account_Compromise.th.md)
- [PB-19 อุปกรณ์สูญหาย](Lost_Device.th.md)

## Mobile Threat Assessment

| Threat | iOS Risk | Android Risk | Detection |
|:---|:---|:---|:---|
| Jailbreak/Root | Medium | High | MDM check |
| Malicious app | Low | High | App scanning |
| Network MitM | Medium | Medium | Certificate pinning |
| SMS phishing | Medium | Medium | User report |
| Device theft | Medium | Medium | MDM geofencing |

### MDM Response Actions

| Action | iOS | Android | Impact |
|:---|:---|:---|:---|
| Remote lock | ✅ | ✅ | Low |
| Remote wipe | ✅ | ✅ | High |
| App removal | ✅ | ✅ | Medium |
| VPN force | ✅ | ✅ | Low |

### App Analysis Steps

| Check | Tool | Action |
|:---|:---|:---|
| App permissions | MDM report | Review |
| Network behavior | Proxy logs | Analyze |
| File system changes | Forensic tool | Investigate |

## References

- [MITRE ATT&CK Mobile — T1456](https://attack.mitre.org/techniques/T1456/)
- [NIST SP 800-124r2 — Guidelines for Managing Mobile Devices](https://csrc.nist.gov/publications/detail/sp/800-124/rev-2/final)
