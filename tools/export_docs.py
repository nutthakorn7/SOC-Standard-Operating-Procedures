#!/usr/bin/env python3
import os

# Configuration
SOURCE_DIR = "../"
OUTPUT_FILE = "SOC_Manual_Consolidated.md"
EXCLUDE_DIRS = [".git", "tools", ".github", "node_modules", "vendor"]
EXCLUDE_FILES = ["README.md", "SOC_Manual_Consolidated.md"]

def consolidate_docs():
    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        outfile.write("# SOC Standard Operating Procedures (Consolidated)\n\n")
        outfile.write("> This document is a consolidated export of all SOPs, Playbooks, and Templates.\n\n")

        # Walk through directories
        for root, dirs, files in os.walk(SOURCE_DIR):
            # Filter directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            
            for file in sorted(files):
                if file.endswith(".md") and file not in EXCLUDE_FILES:
                    filepath = os.path.join(root, file)
                    relpath = os.path.relpath(filepath, SOURCE_DIR)
                    
                    print(f"Processing: {relpath}")
                    
                    outfile.write(f"\n\n---\n\n")
                    outfile.write(f"## File: {relpath}\n\n")
                    
                    try:
                        with open(filepath, "r", encoding="utf-8") as infile:
                            content = infile.read()
                            outfile.write(content)
                    except Exception as e:
                        print(f"Error reading {filepath}: {e}")

    print(f"\nSuccess! All documents consolidated into: {OUTPUT_FILE}")

if __name__ == "__main__":
    if os.path.dirname(__file__):
        os.chdir(os.path.dirname(__file__))
    consolidate_docs()
