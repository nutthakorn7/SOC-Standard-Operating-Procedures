rule credential_dumping_tools {
    meta:
        description = "Detects credential dumping tools (Mimikatz, LaZagne, Rubeus) by binary strings and exports"
        author = "SOC-SOP"
        date = "2026-03-06"
        severity = "critical"
        playbook = "PB-36 Credential Dumping"
        mitre_attack = "T1003.001, T1003.002, T1003.003"
        reference = "https://attack.mitre.org/techniques/T1003/"

    strings:
        $mimi1 = "mimikatz" ascii wide nocase
        $mimi2 = "sekurlsa" ascii wide
        $mimi3 = "kiwi_" ascii wide
        $mimi4 = "gentilkiwi" ascii wide
        $mimi5 = "lsadump" ascii wide

        $lazagne1 = "lazagne" ascii wide nocase
        $lazagne2 = "softwares.browsers" ascii
        $lazagne3 = "softwares.sysadmin" ascii

        $rubeus1 = "Rubeus" ascii wide
        $rubeus2 = "asktgt" ascii wide
        $rubeus3 = "kerberoast" ascii wide

        $dump1 = "MiniDumpWriteDump" ascii
        $dump2 = "NtReadVirtualMemory" ascii
        $dump3 = "DbgUiRemoteBreakin" ascii

    condition:
        (2 of ($mimi*)) or
        (2 of ($lazagne*)) or
        (2 of ($rubeus*)) or
        (2 of ($dump*) and filesize < 5MB)
}

rule sam_database_extraction {
    meta:
        description = "Detects attempted SAM/SYSTEM/SECURITY registry hive extraction"
        author = "SOC-SOP"
        date = "2026-03-06"
        severity = "high"
        playbook = "PB-36 Credential Dumping"
        mitre_attack = "T1003.002"

    strings:
        $reg1 = "reg save HKLM\\SAM" ascii nocase
        $reg2 = "reg save HKLM\\SYSTEM" ascii nocase
        $reg3 = "reg save HKLM\\SECURITY" ascii nocase
        $shadow1 = "vssadmin create shadow" ascii nocase
        $shadow2 = "copy \\\\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy" ascii nocase

    condition:
        any of them
}
