#!/usr/bin/env bash
# Build script for MkDocs — creates docs/ directory with symlinks to actual content
# This is needed because MkDocs requires docs_dir to be a subdirectory of the config location
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$ROOT_DIR/docs"

echo "📂 Setting up docs/ directory with symlinks..."

# Clean existing docs directory
rm -rf "$DOCS_DIR"
mkdir -p "$DOCS_DIR"

# Symlink all content directories
for dir in 00_Getting_Started 01_Onboarding 01_SOC_Fundamentals 02_Platform_Operations 03_User_Guides 04_Troubleshooting 05_Incident_Response 06_Operations_Management 07_Detection_Rules 08_Simulation_Testing 09_Training_Onboarding 10_Compliance 10_File_Signatures 11_Reporting_Templates templates assets tools; do
    if [ -d "$ROOT_DIR/$dir" ]; then
        ln -s "$ROOT_DIR/$dir" "$DOCS_DIR/$dir"
        echo "  ✅ Linked: $dir"
    fi
done

# Symlink top-level files
for file in README.md; do
    if [ -f "$ROOT_DIR/$file" ]; then
        ln -s "$ROOT_DIR/$file" "$DOCS_DIR/$file"
        echo "  ✅ Linked: $file"
    fi
done

echo "✅ docs/ directory ready for MkDocs build"
