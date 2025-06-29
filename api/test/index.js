module.exports = async function (context, req) {
    context.log('Test API endpoint called');
    
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    if (req.method === "OPTIONS") {
        context.res = {
            status: 200,
            headers: corsHeaders
        };
        return;
    }

    context.res = {
        status: 200,
        headers: corsHeaders,
        body: {
            message: "Test API endpoint is working!",
            method: req.method,
            timestamp: new Date().toISOString()
        }
    };
};
