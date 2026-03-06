#!/usr/bin/env bash
set -euo pipefail

staged_files="$(git diff --cached --name-only --diff-filter=ACMR)"

if [ -z "${staged_files}" ]; then
  exit 0
fi

# Common credential signatures. Keep this list short to reduce false positives.
readonly secret_pattern='(OPENAI_API_KEY\s*=|sk-(proj|live|test)-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{32,}|ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z\-_]{35}|-----BEGIN (RSA|EC|DSA|OPENSSH|PGP|PRIVATE) KEY-----|xox[baprs]-[A-Za-z0-9-]{10,}|aws_secret_access_key\s*=)'

has_findings=0

while IFS= read -r file; do
  [ -z "${file}" ] && continue

  # Read staged content only, not working-tree content.
  if ! git cat-file -e ":${file}" 2>/dev/null; then
    continue
  fi

  staged_content="$(git show ":${file}")"

  # Skip likely binary blobs.
  if ! printf '%s' "${staged_content}" | LC_ALL=C grep -Iq .; then
    continue
  fi

  match="$(printf '%s' "${staged_content}" | rg -n --pcre2 -m 1 "${secret_pattern}" || true)"
  if [ -n "${match}" ]; then
    has_findings=1
    echo "Secret-like content detected in staged file: ${file}" >&2
    echo "${match}" >&2
    echo "" >&2
  fi
done <<EOF
${staged_files}
EOF

if [ "${has_findings}" -ne 0 ]; then
  cat >&2 <<'EOF'
Commit blocked to protect secrets.

Actions:
1. Remove the secret from staged content.
2. Move it to .env.local (already gitignored).
3. Re-stage and commit again.
EOF
  exit 1
fi

exit 0
