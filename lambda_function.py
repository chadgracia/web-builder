# lambda_function.py
# Placeholder for web-builder.
# Purpose: confirm the GitHub -> CodePipeline -> Lambda deploy rail works.
# This gets replaced by the real multi-mode Telegram bot handler.

import json


def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "msg": "web-builder placeholder is live"}),
    }
