rule webshell_php_generic_sig {
    meta:
        description = "Detects generic PHP Webshells"
        author = "SOC Standard"
        date = "2026-02-15"
        tlp = "WHITE"
        severity = "Critical"
    strings:
        $php = "<?php" nocase
        $cmd1 = "fail(shell_exec(" nocase
        $cmd2 = "system($_GET" nocase
        $cmd3 = "eval(base64_decode(" nocase
        $cmd4 = "passthru(" nocase
    condition:
        $php and 1 of ($cmd*)
}
