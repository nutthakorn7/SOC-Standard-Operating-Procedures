rule hacktool_mimikatz {
    meta:
        description = "Detects Mimikatz Credential Dumper"
        author = "SOC Standard"
        date = "2026-02-15"
        tlp = "WHITE"
        severity = "High"
    strings:
        $s1 = "gentilkiwi" ascii wide
        $s2 = "mimikatz" ascii wide
        $s3 = "sekurlsa::logonpasswords" ascii wide
        $s4 = "lsadump::lsa" ascii wide
        $s5 = "crypto::certificates" ascii wide
    condition:
        2 of them
}
