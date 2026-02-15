#!/usr/bin/env python3
import os
import re
import sys
import urllib.parse

# Configuration
SOURCE_DIR = "../"
EXCLUDE_DIRS = [".git", "tools", ".github", "node_modules", "vendor", "assets", "docs", "site"]
EXCLUDE_FILES = ["SOC_Manual_Consolidated.md"]

def check_links():
    print(f"Checking for broken links in {SOURCE_DIR}...")
    broken_links = []
    
    # Regex to find [link text](path)
    # This is a simple regex and might miss complex cases, but covers standard markdown
    link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')

    for root, dirs, files in os.walk(SOURCE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            if file.endswith(".md") and file not in EXCLUDE_FILES:
                filepath = os.path.join(root, file)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                matches = link_pattern.findall(content)
                for text, target in matches:
                    # Skip external links
                    if target.startswith(("http", "https", "mailto", "#")):
                        continue
                        
                    # Handle absolute paths (rare in this repo context, usually relative)
                    # We assume relative paths
                    
                    # Decouple anchor links (file.md#section)
                    target_file = target.split('#')[0]
                    if not target_file:
                        continue
                        
                    # Resolve path
                    # logic: matches are relative to the file 'filepath'
                    dir_of_file = os.path.dirname(filepath)
                    absolute_target = os.path.normpath(os.path.join(dir_of_file, target_file))
                    
                    if not os.path.exists(absolute_target):
                        start_print = os.path.relpath(filepath, SOURCE_DIR)
                        broken_links.append(f"File: {start_print} -> Broken Link: {target}")

    if broken_links:
        print("❌ Broken Links Found:")
        for err in broken_links:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("✅ All internal links are valid.")

if __name__ == "__main__":
    if os.path.dirname(__file__):
        os.chdir(os.path.dirname(__file__))
    check_links()
