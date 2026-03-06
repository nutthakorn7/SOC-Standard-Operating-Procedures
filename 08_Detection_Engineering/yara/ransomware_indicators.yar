rule ransomware_extension_rename {
    meta:
        description = "Detects files with common ransomware-encrypted extensions"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "critical"
        playbook = "PB-02 Ransomware"
        mitre_attack = "T1486"
        reference = "https://attack.mitre.org/techniques/T1486/"

    strings:
        $ext1 = ".locked" ascii wide nocase
        $ext2 = ".encrypted" ascii wide nocase
        $ext3 = ".crypt" ascii wide nocase
        $ext4 = ".crypto" ascii wide nocase
        $ext5 = ".enc" ascii wide nocase
        $ext6 = ".rnsmwr" ascii wide nocase
        $ext7 = ".WNCRY" ascii wide nocase
        $ext8 = ".locky" ascii wide nocase
        $ext9 = ".cerber" ascii wide nocase
        $ext10 = ".zepto" ascii wide nocase

        $ransom_note1 = "YOUR FILES HAVE BEEN ENCRYPTED" ascii wide nocase
        $ransom_note2 = "HOW TO DECRYPT" ascii wide nocase
        $ransom_note3 = "pay the ransom" ascii wide nocase
        $ransom_note4 = "bitcoin wallet" ascii wide nocase
        $ransom_note5 = "README_TO_DECRYPT" ascii wide nocase
        $ransom_note6 = "DECRYPT_INSTRUCTIONS" ascii wide nocase

    condition:
        any of ($ransom_note*) or
        (filesize < 10KB and any of ($ext*))
}

rule ransomware_binary_indicators {
    meta:
        description = "Detects ransomware binaries by common behavioral strings"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "critical"
        playbook = "PB-02 Ransomware"
        mitre_attack = "T1486"

    strings:
        $s1 = "vssadmin delete shadows" ascii wide nocase
        $s2 = "wmic shadowcopy delete" ascii wide nocase
        $s3 = "bcdedit /set {default} recoveryenabled No" ascii wide nocase
        $s4 = "wbadmin delete catalog" ascii wide nocase
        $s5 = "vssadmin resize shadowstorage" ascii wide nocase
        $s6 = "cipher /w:" ascii wide nocase
        $s7 = "CryptEncrypt" ascii
        $s8 = "CryptGenKey" ascii
        $s9 = "CryptImportKey" ascii

    condition:
        uint16(0) == 0x5A4D and
        filesize < 5MB and
        3 of ($s*)
}
