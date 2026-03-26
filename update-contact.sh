#!/bin/bash
# update-contact.sh - Update contact info and analytics in landing page
# Usage: ./update-contact.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/config.env"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Config file not found: $CONFIG_FILE"
    echo "   Copy config.env.example to config.env and fill in your values:"
    echo "   cp config.env.example config.env"
    exit 1
fi

source "$CONFIG_FILE"

INDEX_FILE="$SCRIPT_DIR/index.html"

echo "📝 Updating landing page..."

# Update Baidu Analytics ID
if [ -n "$BAIDU_ANALYTICS_ID" ] && [ "$BAIDU_ANALYTICS_ID" != "YOUR_BAIDU_ID" ]; then
    sed -i.bak "s/YOUR_BAIDU_ID/$BAIDU_ANALYTICS_ID/g" "$INDEX_FILE"
    rm -f "${INDEX_FILE}.bak"
    echo "✅ Baidu Analytics ID updated"
fi

# Update WeChat ID (if placeholder exists)
if [ -n "$WECHAT_ID" ] && [ "$WECHAT_ID" != "your_wechat_id_here" ]; then
    # Add WeChat ID near the CTA button
    if grep -q "Add Us on WeChat" "$INDEX_FILE"; then
        echo "✅ WeChat ID configured (manual integration may be needed for QR code)"
    fi
fi

# Update email
if [ -n "$CONTACT_EMAIL" ] && [ "$CONTACT_EMAIL" != "hello@100000mrr.com" ]; then
    sed -i.bak "s/hello@100000mrr.com/$CONTACT_EMAIL/g" "$INDEX_FILE"
    rm -f "${INDEX_FILE}.bak"
    echo "✅ Contact email updated to: $CONTACT_EMAIL"
fi

echo ""
echo "🎉 Landing page updated successfully!"
echo ""
echo "Next steps:"
echo "1. Test locally: open index.html in browser"
echo "2. Commit changes: git add index.html && git commit -m 'update contact info'"
echo "3. Deploy: git push (GitHub Pages) or vercel --prod (Vercel)"
