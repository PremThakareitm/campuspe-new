const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');
    context.log('Method:', req.method);
    context.log('URL:', req.url);
    // CORS headers for all responses
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        context.res = {
            status: 200,
            headers: corsHeaders
        };
        return;
    }

    if (req.method !== "POST") {
        context.res = {
            status: 405,
            headers: corsHeaders,
            body: { error: "Method not allowed" }
        };
        return;
    }

    try {
        const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
        
        if (!connectionString) {
            throw new Error("Azure Communication Services connection string not configured");
        }

        const { from, to, subject, htmlContent, plainTextContent } = req.body;

        // Validate required fields
        if (!from || !to || !subject || !htmlContent) {
            context.res = {
                status: 400,
                headers: corsHeaders,
                body: { 
                    error: "Missing required fields",
                    required: ["from", "to", "subject", "htmlContent"]
                }
            };
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            context.res = {
                status: 400,
                headers: corsHeaders,
                body: { error: "Invalid email format" }
            };
            return;
        }

        context.log(`Sending email from ${from} to ${to} with subject: ${subject}`);

        const emailClient = new EmailClient(connectionString);

        const emailMessage = {
            senderAddress: from,
            content: {
                subject: subject,
                html: htmlContent,
                plainText: plainTextContent || subject
            },
            recipients: {
                to: [{ address: to }]
            }
        };

        const poller = await emailClient.beginSend(emailMessage);
        const result = await poller.pollUntilDone();

        context.log(`Email sent successfully. Message ID: ${result.id}, Status: ${result.status}`);

        context.res = {
            status: 200,
            headers: corsHeaders,
            body: {
                success: true,
                messageId: result.id,
                status: result.status,
                timestamp: new Date().toISOString()
            }
        };

    } catch (error) {
        context.log.error("Email sending failed:", error);
        
        context.res = {
            status: 500,
            headers: corsHeaders,
            body: {
                success: false,
                error: error.message || "Failed to send email",
                timestamp: new Date().toISOString()
            }
        };
    }
};
