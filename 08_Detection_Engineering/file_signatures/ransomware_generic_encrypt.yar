rule ransomware_generic_encrypt {
    meta:
        description = "Detects generic ransomware encryption behavior/strings"
        author = "SOC Standard"
        date = "2026-02-15"
        tlp = "WHITE"
        severity = "Critical"
    strings:
        $s1 = "vssadmin.exe Delete Shadows /All /Quiet" ascii wide
        $s2 = "wbadmin DELETE SYSTEMSTATEBACKUP" ascii wide
        $s3 = "bcdedit /set {default} recoveryenabled No" ascii wide
        $s4 = "WARNING: YOUR FILES ARE ENCRYPTED" ascii wide ignore_case
        $s5 = "restore_files.txt" ascii wide
    condition:
        2 of them
}
