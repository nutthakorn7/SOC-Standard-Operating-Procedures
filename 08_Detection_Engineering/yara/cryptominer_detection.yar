rule cryptominer_binary {
    meta:
        description = "Detects cryptominer binaries by mining pool strings and algorithm references"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "high"
        playbook = "PB-23 Cryptomining"
        mitre_attack = "T1496"
        reference = "https://attack.mitre.org/techniques/T1496/"

    strings:
        $pool1 = "stratum+tcp://" ascii wide nocase
        $pool2 = "stratum+ssl://" ascii wide nocase
        $pool3 = "pool.minexmr.com" ascii wide nocase
        $pool4 = "xmrpool.eu" ascii wide nocase
        $pool5 = "pool.hashvault.pro" ascii wide nocase
        $pool6 = "gulf.moneroocean.stream" ascii wide nocase
        $pool7 = "mining.pool" ascii wide nocase

        $algo1 = "randomx" ascii wide nocase
        $algo2 = "cryptonight" ascii wide nocase
        $algo3 = "ethash" ascii wide nocase
        $algo4 = "kawpow" ascii wide nocase
        $algo5 = "autolykos" ascii wide nocase

        $tool1 = "xmrig" ascii wide nocase
        $tool2 = "cpuminer" ascii wide nocase
        $tool3 = "minerd" ascii wide nocase
        $tool4 = "NBMiner" ascii wide nocase
        $tool5 = "T-Rex" ascii wide nocase
        $tool6 = "PhoenixMiner" ascii wide nocase
        $tool7 = "lolMiner" ascii wide nocase

        $wallet = /[13][a-km-zA-HJ-NP-Z1-9]{25,34}/ ascii
        $xmr_wallet = /4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}/ ascii

    condition:
        (
            (1 of ($pool*) and 1 of ($algo*)) or
            (2 of ($tool*)) or
            (1 of ($tool*) and 1 of ($pool*)) or
            (1 of ($pool*) and ($wallet or $xmr_wallet))
        )
}

rule cryptominer_script {
    meta:
        description = "Detects cryptomining scripts (JS/Python/Shell) used for browser or server mining"
        author = "SOC-SOP"
        date = "2026-02-15"
        severity = "medium"
        playbook = "PB-23 Cryptomining"
        mitre_attack = "T1496"

    strings:
        $js_miner1 = "coinhive" ascii wide nocase
        $js_miner2 = "CoinImp" ascii wide nocase
        $js_miner3 = "cryptoloot" ascii wide nocase
        $js_miner4 = "miner.start" ascii nocase
        $js_miner5 = "WebAssembly" ascii

        $sh_miner1 = "xmrig" ascii nocase
        $sh_miner2 = "nohup ./mine" ascii nocase
        $sh_miner3 = "minergate" ascii nocase
        $sh_miner4 = "stratum" ascii nocase

        $py_miner1 = "cpuminer" ascii nocase
        $py_miner2 = "hashlib" ascii nocase
        $py_miner3 = "mining" ascii nocase

    condition:
        filesize < 1MB and
        (
            2 of ($js_miner*) or
            2 of ($sh_miner*) or
            ($py_miner1 and $py_miner2 and $py_miner3)
        )
}
