#!/usr/bin/env python3
"""
CLI entry point for Sneha Chavan's Resume Generation.
Calls the core generate_resume function from generate_resume_pdf.py.
"""
import sys
from generate_resume_pdf import generate_resume

if __name__ == "__main__":
    out_arg = sys.argv[1] if len(sys.argv) > 1 else None
    generate_resume(out_arg)
