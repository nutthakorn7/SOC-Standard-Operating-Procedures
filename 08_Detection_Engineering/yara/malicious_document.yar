rule suspicious_office_macro {
    meta:
        description = "Detects Office documents with suspicious VBA macros (auto-execute, shell commands, downloads)"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "high"
        playbook = "PB-01 Phishing, PB-03 Malware"
        mitre_attack = "T1566.001, T1204.002"
        reference = "https://attack.mitre.org/techniques/T1566/001/"

    strings:
        // OLE magic bytes
        $ole = { D0 CF 11 E0 A1 B1 1A E1 }
        // OOXML
        $pk = { 50 4B 03 04 }

        // Auto-execution triggers
        $auto1 = "AutoOpen" ascii nocase
        $auto2 = "Auto_Open" ascii nocase
        $auto3 = "AutoExec" ascii nocase
        $auto4 = "Workbook_Open" ascii nocase
        $auto5 = "Document_Open" ascii nocase
        $auto6 = "AutoClose" ascii nocase

        // Suspicious VBA functions
        $vba1 = "Shell(" ascii nocase
        $vba2 = "WScript.Shell" ascii nocase
        $vba3 = "PowerShell" ascii wide nocase
        $vba4 = "cmd.exe" ascii wide nocase
        $vba5 = "CreateObject" ascii nocase
        $vba6 = "GetObject" ascii nocase

        // Download indicators
        $dl1 = "URLDownloadToFile" ascii nocase
        $dl2 = "XMLHTTP" ascii nocase
        $dl3 = "WinHttp" ascii nocase
        $dl4 = "InternetExplorer.Application" ascii nocase
        $dl5 = "Net.WebClient" ascii nocase
        $dl6 = "DownloadFile" ascii nocase
        $dl7 = "DownloadString" ascii nocase
        $dl8 = "Invoke-WebRequest" ascii nocase

        // Obfuscation
        $obf1 = "Chr(" ascii nocase
        $obf2 = "ChrW(" ascii nocase
        $obf3 = "Replace(" ascii nocase
        $obf4 = "StrReverse(" ascii nocase
        $obf5 = "CallByName" ascii nocase

        // Env access
        $env1 = "Environ(" ascii nocase
        $env2 = "%TEMP%" ascii nocase
        $env3 = "%APPDATA%" ascii nocase

    condition:
        ($ole at 0 or $pk at 0) and
        filesize < 10MB and
        (
            (1 of ($auto*) and 1 of ($vba*) and 1 of ($dl*)) or
            (1 of ($auto*) and 2 of ($vba*) and 1 of ($obf*)) or
            (1 of ($auto*) and 1 of ($vba*) and 1 of ($env*))
        )
}

rule suspicious_pdf_javascript {
    meta:
        description = "Detects PDF files with embedded JavaScript or suspicious actions"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "medium"
        playbook = "PB-01 Phishing"
        mitre_attack = "T1566.001"

    strings:
        $pdf = "%PDF" ascii
        $js1 = "/JavaScript" ascii
        $js2 = "/JS(" ascii
        $js3 = "/JS <" ascii
        $action1 = "/OpenAction" ascii
        $action2 = "/AA" ascii
        $action3 = "/Launch" ascii
        $exploit1 = "util.printf" ascii
        $exploit2 = "app.doc" ascii
        $exploit3 = "Collab.getIcon" ascii
        $shellcode = /[\\x][0-9a-fA-F]{2}[\\x][0-9a-fA-F]{2}/ ascii

    condition:
        $pdf at 0 and
        filesize < 10MB and
        (
            (1 of ($js*) and 1 of ($action*)) or
            (1 of ($exploit*)) or
            (1 of ($js*) and $shellcode)
        )
}
