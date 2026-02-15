#!/usr/bin/env python3
"""
Sigma Rule Validator — SOC-SOP
Validates all Sigma detection rules in the repository for:
  - YAML syntax
  - Required fields (title, id, status, description, logsource, detection)
  - MITRE ATT&CK tag format
  - Level values
  - Duplicate rule IDs

Usage:
  python3 tools/sigma_validator.py
  python3 tools/sigma_validator.py --path 07_Detection_Rules/
  python3 tools/sigma_validator.py --strict
"""

import os
import sys
import glob
import argparse
import re
from collections import Counter

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML is required. Install with: pip3 install pyyaml")
    sys.exit(1)

# ─── Configuration ───────────────────────────────────────────────────────────

REQUIRED_FIELDS = ["title", "id", "status", "description", "logsource", "detection"]
RECOMMENDED_FIELDS = ["level", "tags", "falsepositives", "author", "date"]
VALID_STATUSES = ["test", "experimental", "stable", "deprecated", "unsupported"]
VALID_LEVELS = ["informational", "low", "medium", "high", "critical"]
MITRE_TAG_PATTERN = re.compile(r"^attack\.(t\d{4}(\.\d{3})?|[a-z_]+)$", re.IGNORECASE)

# ─── Colors ─────────────────────────────────────────────────────────────────

class Colors:
    RED = "\033[91m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    BOLD = "\033[1m"
    RESET = "\033[0m"

# ─── Validator ──────────────────────────────────────────────────────────────

class SigmaValidator:
    def __init__(self, strict=False):
        self.strict = strict
        self.errors = []
        self.warnings = []
        self.rule_ids = Counter()
        self.files_checked = 0
        self.files_passed = 0

    def validate_file(self, filepath):
        """Validate a single Sigma rule file."""
        self.files_checked += 1
        file_errors = []
        file_warnings = []

        # 1. YAML syntax check
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                rule = yaml.safe_load(f)
        except yaml.YAMLError as e:
            file_errors.append(f"YAML syntax error: {e}")
            self.errors.extend([(filepath, e) for e in file_errors])
            return False
        except Exception as e:
            file_errors.append(f"File read error: {e}")
            self.errors.extend([(filepath, e) for e in file_errors])
            return False

        if not isinstance(rule, dict):
            file_errors.append("File does not contain a valid YAML mapping")
            self.errors.extend([(filepath, e) for e in file_errors])
            return False

        # 2. Required fields
        for field in REQUIRED_FIELDS:
            if field not in rule:
                file_errors.append(f"Missing required field: '{field}'")

        # 3. Recommended fields
        for field in RECOMMENDED_FIELDS:
            if field not in rule:
                file_warnings.append(f"Missing recommended field: '{field}'")

        # 4. Status validation
        if "status" in rule and rule["status"] not in VALID_STATUSES:
            file_errors.append(
                f"Invalid status '{rule['status']}'. Must be one of: {', '.join(VALID_STATUSES)}"
            )

        # 5. Level validation
        if "level" in rule and rule["level"] not in VALID_LEVELS:
            file_errors.append(
                f"Invalid level '{rule['level']}'. Must be one of: {', '.join(VALID_LEVELS)}"
            )

        # 6. Rule ID format and uniqueness
        if "id" in rule:
            rule_id = str(rule["id"])
            self.rule_ids[rule_id] += 1

        # 7. Detection section structure
        if "detection" in rule:
            detection = rule["detection"]
            if isinstance(detection, dict):
                if "condition" not in detection:
                    file_errors.append("Detection section missing 'condition' field")
            else:
                file_errors.append("Detection section must be a YAML mapping")

        # 8. Logsource structure
        if "logsource" in rule:
            logsource = rule["logsource"]
            if isinstance(logsource, dict):
                if not any(k in logsource for k in ["category", "product", "service"]):
                    file_warnings.append(
                        "Logsource should have at least one of: category, product, service"
                    )
            else:
                file_errors.append("Logsource must be a YAML mapping")

        # 9. MITRE ATT&CK tags
        if "tags" in rule and isinstance(rule["tags"], list):
            for tag in rule["tags"]:
                if tag.startswith("attack.") and not MITRE_TAG_PATTERN.match(tag):
                    file_warnings.append(f"Non-standard MITRE tag format: '{tag}'")

        # 10. Title length
        if "title" in rule and len(str(rule["title"])) > 256:
            file_warnings.append(f"Title is very long ({len(rule['title'])} chars)")

        # Record results
        if file_errors:
            self.errors.extend([(filepath, e) for e in file_errors])
        if file_warnings:
            self.warnings.extend([(filepath, w) for w in file_warnings])

        if not file_errors and (not self.strict or not file_warnings):
            self.files_passed += 1
            return True
        return not bool(file_errors)

    def check_duplicates(self):
        """Check for duplicate rule IDs."""
        for rule_id, count in self.rule_ids.items():
            if count > 1:
                self.errors.append(
                    ("GLOBAL", f"Duplicate rule ID '{rule_id}' found {count} times")
                )

    def print_results(self):
        """Print validation results."""
        print(f"\n{'='*60}")
        print(f"{Colors.BOLD}Sigma Rule Validation Report{Colors.RESET}")
        print(f"{'='*60}\n")

        # Errors
        if self.errors:
            print(f"{Colors.RED}{Colors.BOLD}❌ ERRORS ({len(self.errors)}):{Colors.RESET}")
            current_file = None
            for filepath, error in self.errors:
                if filepath != current_file:
                    current_file = filepath
                    basename = os.path.basename(filepath) if filepath != "GLOBAL" else "GLOBAL"
                    print(f"\n  {Colors.CYAN}{basename}{Colors.RESET}")
                print(f"    {Colors.RED}✗{Colors.RESET} {error}")
            print()

        # Warnings
        if self.warnings:
            print(f"{Colors.YELLOW}{Colors.BOLD}⚠️  WARNINGS ({len(self.warnings)}):{Colors.RESET}")
            current_file = None
            for filepath, warning in self.warnings:
                if filepath != current_file:
                    current_file = filepath
                    print(f"\n  {Colors.CYAN}{os.path.basename(filepath)}{Colors.RESET}")
                print(f"    {Colors.YELLOW}△{Colors.RESET} {warning}")
            print()

        # Summary
        print(f"{'─'*60}")
        status_color = Colors.GREEN if not self.errors else Colors.RED
        print(f"  Files checked:  {Colors.BOLD}{self.files_checked}{Colors.RESET}")
        print(f"  Files passed:   {status_color}{Colors.BOLD}{self.files_passed}{Colors.RESET}")
        print(f"  Errors:         {Colors.RED if self.errors else Colors.GREEN}{len(self.errors)}{Colors.RESET}")
        print(f"  Warnings:       {Colors.YELLOW if self.warnings else Colors.GREEN}{len(self.warnings)}{Colors.RESET}")
        print(f"  Unique rule IDs: {len(self.rule_ids)}")
        print(f"{'─'*60}")

        if not self.errors:
            print(f"\n  {Colors.GREEN}{Colors.BOLD}✅ All Sigma rules are valid!{Colors.RESET}\n")
        else:
            print(f"\n  {Colors.RED}{Colors.BOLD}❌ Validation failed. Please fix errors above.{Colors.RESET}\n")

        return len(self.errors) == 0


def main():
    parser = argparse.ArgumentParser(description="Validate Sigma detection rules")
    parser.add_argument(
        "--path", "-p",
        default="07_Detection_Rules/",
        help="Path to Sigma rules directory (default: 07_Detection_Rules/)"
    )
    parser.add_argument(
        "--strict", "-s",
        action="store_true",
        help="Treat warnings as errors"
    )
    args = parser.parse_args()

    # Find project root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    rules_path = os.path.join(project_root, args.path)

    if not os.path.exists(rules_path):
        print(f"{Colors.RED}ERROR: Path not found: {rules_path}{Colors.RESET}")
        sys.exit(1)

    # Find all .yml files (exclude yara directory)
    yml_files = glob.glob(os.path.join(rules_path, "*.yml"))
    yml_files.sort()

    if not yml_files:
        print(f"{Colors.YELLOW}No .yml files found in {rules_path}{Colors.RESET}")
        sys.exit(0)

    print(f"\n{Colors.BLUE}🔍 Validating {len(yml_files)} Sigma rules in {args.path}...{Colors.RESET}\n")

    validator = SigmaValidator(strict=args.strict)

    for yml_file in yml_files:
        result = validator.validate_file(yml_file)
        basename = os.path.basename(yml_file)
        if result:
            print(f"  {Colors.GREEN}✓{Colors.RESET} {basename}")
        else:
            print(f"  {Colors.RED}✗{Colors.RESET} {basename}")

    validator.check_duplicates()
    success = validator.print_results()

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
