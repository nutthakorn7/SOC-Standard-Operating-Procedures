rule cobalt_strike_beacon {
    meta:
        description = "Detects Cobalt Strike Beacon payloads by common strings and shellcode patterns"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "critical"
        playbook = "PB-13 C2 Communication, PB-12 Lateral Movement"
        mitre_attack = "T1071.001, T1059.003"
        reference = "https://attack.mitre.org/software/S0154/"

    strings:
        $beacon1 = "%s as %s\\%s: %d" ascii
        $beacon2 = "beacon.dll" ascii
        $beacon3 = "beacon.x64.dll" ascii
        $beacon4 = "%s (admin)" ascii
        $beacon5 = "ReflectiveLoader" ascii

        $cfg1 = "sleeptime" ascii
        $cfg2 = "publickey" ascii
        $cfg3 = "jitter" ascii
        $cfg4 = ".start" ascii
        $cfg5 = "pipename" ascii

        $pipe1 = "\\\\.\\pipe\\msagent_" ascii
        $pipe2 = "\\\\.\\pipe\\MSSE-" ascii
        $pipe3 = "\\\\.\\pipe\\postex_" ascii
        $pipe4 = "\\\\.\\pipe\\status_" ascii

        $ua1 = "Mozilla/5.0 (compatible; MSIE" ascii
        $ua2 = "Mozilla/4.0 (compatible; MSIE" ascii

        // Common shellcode XOR key patterns
        $xor_key = { 69 69 69 69 }
        $mz_header = { 4D 5A }

    condition:
        (
            (2 of ($beacon*)) or
            (1 of ($beacon*) and 2 of ($cfg*)) or
            (2 of ($pipe*)) or
            ($mz_header at 0 and 1 of ($beacon*) and 1 of ($pipe*))
        )
}

rule cobalt_strike_stager {
    meta:
        description = "Detects Cobalt Strike stager shellcode patterns"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "critical"
        playbook = "PB-13 C2 Communication"
        mitre_attack = "T1071.001"

    strings:
        // Common CS stager shellcode patterns
        $sc1 = { FC E8 ?? 00 00 00 }  // call $+5
        $sc2 = { 68 ?? ?? ?? ?? FF D5 }  // push addr; call ebp
        $sc3 = "VirtualAlloc" ascii
        $sc4 = "InternetOpenA" ascii
        $sc5 = "InternetConnectA" ascii
        $sc6 = "HttpOpenRequestA" ascii
        $sc7 = "HttpSendRequestA" ascii
        $sc8 = { E8 ?? ?? ?? ?? 83 C0 ?? 50 }  // call; add eax; push

    condition:
        filesize < 1MB and
        (
            ($sc1 and $sc2) or
            (3 of ($sc3, $sc4, $sc5, $sc6, $sc7)) or
            ($sc1 and 2 of ($sc3, $sc4, $sc5, $sc6, $sc7))
        )
}
