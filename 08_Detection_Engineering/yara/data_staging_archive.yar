rule data_staging_archive {
    meta:
        description = "Detects suspicious data staging — password-protected archives and split archives used for exfiltration"
        author = "SOC-SOP"
        date = "2026-03-06"
        severity = "medium"
        playbook = "PB-08 Data Exfiltration, PB-35 Data Collection"
        mitre_attack = "T1074.001, T1560.001"
        reference = "https://attack.mitre.org/techniques/T1074/"

    strings:
        // Password-protected RAR
        $rar_magic = { 52 61 72 21 1A 07 }  // Rar! magic
        $rar_encrypt = { 04 }  // encrypted flag

        // Password-protected 7z
        $7z_magic = { 37 7A BC AF 27 1C }  // 7z magic

        // Password-protected ZIP
        $zip_magic = { 50 4B 03 04 }  // PK magic
        $zip_encrypt = { 01 00 }  // encrypted flag

        // Staging scripts
        $stage1 = "Compress-Archive" ascii nocase
        $stage2 = "-Password" ascii nocase
        $stage3 = "7z a -p" ascii nocase
        $stage4 = "rar a -hp" ascii nocase
        $stage5 = "split -b" ascii nocase

        // Exfiltration staging paths
        $path1 = "\\ProgramData\\" ascii nocase
        $path2 = "\\Recycle" ascii nocase
        $path3 = "\\Temp\\data" ascii nocase

    condition:
        ($rar_magic at 0 and $rar_encrypt) or
        ($zip_magic at 0 and $zip_encrypt) or
        (2 of ($stage*)) or
        (1 of ($stage*) and 1 of ($path*))
}
