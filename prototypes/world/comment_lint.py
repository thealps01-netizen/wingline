"""Fails when a // line comment hides code: a statement (call or assignment ending in ';') after '//' on the same line.
Edits that appended a comment mid-line silently disabled the rest of that line four times. Usage: python comment_lint.py f.js"""
import re, sys
bad = []
for path in sys.argv[1:]:
    for n, line in enumerate(open(path, encoding='utf-8'), 1):
        i = line.find('//')
        while i >= 0 and (line[i - 1:i] == ':' or line[:i].count("'") % 2 or line[:i].count('`') % 2 or line[:i].count('"') % 2):
            i = line.find('//', i + 2)  # URL or inside a string
        if i < 0 or not line[:i].strip(): continue  # whole-line comments are prose; only trailing ones can swallow code
        tail = line[i + 2:]
        if re.search(r'[\w\])]\s*\([^()]*\)\s*;|\b\w+(\.\w+)*\s*=\s*[^=;]+;', tail): bad.append(f'{path}:{n}: {line.strip()[:160]}')
print('\n'.join(bad) if bad else 'comment-lint ok'); sys.exit(1 if bad else 0)
