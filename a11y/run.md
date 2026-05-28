```bash
chmod +x ./test-a11y-online.sh
./test-a11y-online.sh

chmod +x ./test-a11y-locale.sh
./test-a11y-locale.sh

pkill -f "orca" 2>/dev/null || true
pkill -f "firefox.*mobbu" 2>/dev/null || true
```
