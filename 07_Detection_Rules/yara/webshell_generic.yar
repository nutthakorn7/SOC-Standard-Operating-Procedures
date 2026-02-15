rule webshell_php_generic {
    meta:
        description = "Detects common PHP webshells by function calls and obfuscation patterns"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "high"
        playbook = "PB-10 Web Attack, PB-18 Exploit"
        mitre_attack = "T1505.003"
        reference = "https://attack.mitre.org/techniques/T1505/003/"

    strings:
        $php_tag = "<?php" ascii nocase

        $eval1 = "eval(" ascii nocase
        $eval2 = "assert(" ascii nocase
        $eval3 = "preg_replace" ascii nocase
        $eval4 = "create_function" ascii nocase
        $eval5 = "call_user_func" ascii nocase

        $exec1 = "system(" ascii nocase
        $exec2 = "exec(" ascii nocase
        $exec3 = "shell_exec(" ascii nocase
        $exec4 = "passthru(" ascii nocase
        $exec5 = "popen(" ascii nocase
        $exec6 = "proc_open(" ascii nocase

        $obf1 = "base64_decode" ascii nocase
        $obf2 = "str_rot13" ascii nocase
        $obf3 = "gzinflate" ascii nocase
        $obf4 = "gzuncompress" ascii nocase
        $obf5 = "chr(" ascii nocase
        $obf6 = "\\x" ascii

        $upload = "move_uploaded_file" ascii nocase
        $conn = "fsockopen" ascii nocase

    condition:
        $php_tag and
        filesize < 500KB and
        (
            (1 of ($eval*) and 1 of ($obf*)) or
            (2 of ($exec*)) or
            (1 of ($exec*) and ($upload or $conn)) or
            (1 of ($eval*) and 1 of ($exec*))
        )
}

rule webshell_jsp_generic {
    meta:
        description = "Detects common JSP webshells"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "high"
        playbook = "PB-10 Web Attack"
        mitre_attack = "T1505.003"

    strings:
        $jsp = "<%@" ascii
        $rt1 = "Runtime.getRuntime().exec" ascii
        $rt2 = "ProcessBuilder" ascii
        $rt3 = "getParameter" ascii
        $io1 = "BufferedReader" ascii
        $io2 = "InputStreamReader" ascii
        $cmd = "cmd" ascii
        $bash = "/bin/bash" ascii

    condition:
        $jsp and
        filesize < 200KB and
        (
            ($rt1 and ($cmd or $bash)) or
            ($rt2 and $rt3) or
            ($rt1 and $io1 and $io2)
        )
}

rule webshell_aspx_generic {
    meta:
        description = "Detects common ASPX webshells"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "high"
        playbook = "PB-10 Web Attack"
        mitre_attack = "T1505.003"

    strings:
        $aspx = "<%@ Page" ascii nocase
        $exec1 = "Process.Start" ascii
        $exec2 = "cmd.exe" ascii wide
        $exec3 = "powershell" ascii wide nocase
        $func1 = "Request.Form" ascii
        $func2 = "Request.QueryString" ascii
        $func3 = "Response.Write" ascii

    condition:
        $aspx and
        filesize < 200KB and
        (1 of ($exec*) and 1 of ($func*))
}
