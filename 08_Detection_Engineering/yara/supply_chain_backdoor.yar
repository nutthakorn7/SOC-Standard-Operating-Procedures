rule supply_chain_backdoor {
    meta:
        description = "Detects supply chain backdoor indicators in packages, libraries, and build artifacts"
        author = "SOC-SOP"
        date = "2026-03-06"
        severity = "high"
        playbook = "PB-32 Supply Chain Attack"
        mitre_attack = "T1195.001, T1195.002"
        reference = "https://attack.mitre.org/techniques/T1195/"

    strings:
        // Backdoored npm packages
        $npm1 = "preinstall" ascii
        $npm2 = "postinstall" ascii
        $npm3 = "child_process" ascii
        $npm4 = "eval(" ascii

        // Python backdoor in setup.py
        $py1 = "setup(" ascii
        $py2 = "os.system(" ascii
        $py3 = "subprocess.call" ascii
        $py4 = "base64.b64decode" ascii

        // Known supply chain payload patterns
        $sc1 = "SolarWinds" ascii wide
        $sc2 = "SUNBURST" ascii wide
        $sc3 = "event-stream" ascii wide
        $sc4 = "ua-parser-js" ascii wide

        // Obfuscated reverse shell in package
        $rev1 = "socket" ascii
        $rev2 = "connect" ascii
        $rev3 = "/bin/sh" ascii
        $rev4 = "cmd.exe" ascii

    condition:
        ($npm1 and $npm3 and $npm4) or
        ($py1 and ($py2 or $py3) and $py4) or
        (any of ($sc*)) or
        ($rev1 and $rev2 and ($rev3 or $rev4) and filesize < 100KB)
}
