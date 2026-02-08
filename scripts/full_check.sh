#!/usr/bin/env bash
set -e

echo "[1/2] Running Jest tests..."
npm test

echo ""
echo "[2/2] Checking API endpoints (if server is running)..."
set +e
echo "- GET /health:"
curl -s http://127.0.0.1:3000/health
echo ""
echo "- GET /version:"
curl -s http://127.0.0.1:3000/version
echo ""
set -e

echo "Legal AI Engine full check complete."
