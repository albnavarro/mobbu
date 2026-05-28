#!/bin/bash
set -e

# Uccidi istanze precedenti
pkill -f "orca" 2>/dev/null || true
pkill -f "firefox.*mobbu" 2>/dev/null || true

# Avvia bus accessibility
/usr/libexec/at-spi-bus-launcher --launch-immediately 2>/dev/null &

# Avvia Orca
orca --replace &
sleep 3

# Avvia Firefox Flatpak con permessi a11y
flatpak run \
  --talk-name=org.a11y.Bus \
  --env=GTK_MODULES=gail:atk-bridge \
  org.mozilla.firefox \
  http://localhost:3000 &

echo "Orca + Firefox avviati. Premi Alt+Super+S se Orca non parla."
