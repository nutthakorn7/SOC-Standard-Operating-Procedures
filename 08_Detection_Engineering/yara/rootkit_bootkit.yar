rule rootkit_bootkit_indicators {
    meta:
        description = "Detects rootkit and bootkit indicators including unsigned driver patterns and boot sector manipulation"
        author = "SOC-SOP"
        date = "2026-03-06"
        severity = "critical"
        playbook = "PB-45 Rootkit/Bootkit"
        mitre_attack = "T1014, T1542.001, T1542.003"
        reference = "https://attack.mitre.org/techniques/T1014/"

    strings:
        // Known rootkit families
        $tdl1 = "TDL" ascii wide
        $zeroaccess = "ZeroAccess" ascii wide
        $necurs = "Necurs" ascii wide

        // Driver manipulation
        $drv1 = "NtLoadDriver" ascii
        $drv2 = "ZwLoadDriver" ascii
        $drv3 = "IoCreateDevice" ascii
        $drv4 = "DriverEntry" ascii

        // Kernel hooks
        $hook1 = "KiServiceTable" ascii
        $hook2 = "KeServiceDescriptorTable" ascii
        $hook3 = "NtCreateFile" ascii
        $hook4 = "ZwQuerySystemInformation" ascii

        // Boot manipulation
        $boot1 = "bootmgfw.efi" ascii wide
        $boot2 = "winload.efi" ascii wide
        $boot3 = "bcdedit" ascii wide

        // DKOM (Direct Kernel Object Manipulation)
        $dkom1 = "EPROCESS" ascii
        $dkom2 = "ActiveProcessLinks" ascii

    condition:
        (any of ($tdl1, $zeroaccess, $necurs)) or
        (3 of ($drv*) and 2 of ($hook*)) or
        (2 of ($boot*) and filesize < 1MB) or
        (all of ($dkom*))
}
