# Wiring Open Claw (Telegram + DeepSeek) to Work Proxy

This folder has everything Open Claw needs:

- **`system-prompt.txt`** — the bot's personality + rules + booking/payment flow.
- **`tools.json`** — the two tools (functions) Open Claw calls: `create_order` and
  `check_order_status`. Format is OpenAI/DeepSeek-compatible function calling.

## 1. Load the system prompt

However Open Claw takes its system prompt, point it at `system-prompt.txt`. Common cases:

- **Config field / web UI:** paste the contents of `system-prompt.txt`.
- **Env var:** `export OPEN_CLAW_SYSTEM_PROMPT="$(cat /path/to/system-prompt.txt)"`
- **File path setting:** give it the absolute path to `system-prompt.txt`.

## 2. Register the two tools

Give Open Claw the definitions in `tools.json`. When the model calls a tool, your bot
makes the matching HTTP request to the Work Proxy API and feeds the JSON response back.

### Tool → HTTP mapping

Set these on the Ubuntu box (e.g. in the bot's `.env` / systemd unit):

```
WORKPROXY_API=https://workproxy.fun
ORDER_WEBHOOK_SECRET=<the same secret set on the website>
```

**`create_order`**
```
POST $WORKPROXY_API/api/orders
Headers: Authorization: Bearer $ORDER_WEBHOOK_SECRET, Content-Type: application/json
Body:    { name, service, amount, whatsapp, email?, notes? }
Returns: { success, reference, status, paymentAccount, message }
```

**`check_order_status`**
```
GET $WORKPROXY_API/api/orders/status?reference=<REFERENCE>
Headers: Authorization: Bearer $ORDER_WEBHOOK_SECRET
Returns: { reference, status, paidAt, whatsapp, whatsappLink }
         whatsapp/whatsappLink are null until status == "PAID"
```

Payment confirmation itself is done by the team clicking the button in the order email —
Open Claw does not confirm payments, it only polls status.

## 3. Quick test from the Ubuntu box

```bash
# Create a test order
curl -X POST "$WORKPROXY_API/api/orders" \
  -H "Authorization: Bearer $ORDER_WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","service":"Academy","amount":"₦100,000","whatsapp":"+2348000000000"}'
# -> note the "reference" (e.g. WP-7F3K9Q), and check your email for the alert

# Check status (PENDING until you click the email button, then PAID)
curl "$WORKPROXY_API/api/orders/status?reference=WP-7F3K9Q" \
  -H "Authorization: Bearer $ORDER_WEBHOOK_SECRET"
```

## Notes
- The `ORDER_WEBHOOK_SECRET` here MUST equal the one configured on the website, or calls
  return 401.
- If Open Claw is a code project (Python/Node), implement two functions that make the
  requests above and return the JSON to the model. If it's a no-code/agent UI, paste the
  tool schemas and set the HTTP action with the headers above.
- Full reference: see `../WORKPROXY_SUPPORT_GUIDE.md` (sections 16b and 19).
