rule lolbin_dropper_script {
    meta:
        description = "Detects scripts and payloads that abuse LOLBins for download and execution"
        author = "SOC-SOP"
        date = "2026-03-06"
        severity = "high"
        playbook = "PB-39 Living Off The Land"
        mitre_attack = "T1218, T1218.005, T1218.011"
        reference = "https://lolbas-project.github.io/"

    strings:
        // certutil abuse
        $cert1 = "certutil -urlcache -split -f" ascii nocase
        $cert2 = "certutil -decode" ascii nocase
        $cert3 = "certutil -encode" ascii nocase

        // mshta abuse
        $mshta1 = "mshta vbscript:Execute" ascii nocase
        $mshta2 = "mshta javascript:" ascii nocase
        $mshta3 = "mshta http" ascii nocase

        // rundll32/regsvr32 abuse
        $rdll1 = "rundll32 javascript:" ascii nocase
        $rdll2 = "regsvr32 /s /n /u /i:" ascii nocase
        $rdll3 = "regsvr32 /s /n /u /i:http" ascii nocase

        // BITSAdmin abuse
        $bits1 = "bitsadmin /transfer" ascii nocase
        $bits2 = "bitsadmin /create" ascii nocase

        // Combined indicators
        $ps_download = "DownloadString" ascii nocase
        $ps_iex = "IEX" ascii
        $ps_webclient = "Net.WebClient" ascii

    condition:
        (any of ($cert*)) or
        (any of ($mshta*)) or
        (any of ($rdll*)) or
        (any of ($bits*)) or
        ($ps_download and ($ps_iex or $ps_webclient))
}
