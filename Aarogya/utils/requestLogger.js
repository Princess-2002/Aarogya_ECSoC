/**
 * ============================================
 * CENTRALIZED HTTP REQUEST LOGGER MIDDLEWARE
 * ============================================
 * Captures method, URL, status code, response time, and
 * formats logs for development/production.
 */

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const emoji = '📥';
        const method = req.method;
        const url = req.originalUrl || req.url;
        const statusCode = res.statusCode;

        // Clean log format for production
        let logMessage = `[${timestamp}] ${emoji} ${method} ${url} → ${statusCode} (${duration}ms)`;

        // Environment Awareness (default to development if NODE_ENV is unset)
        const currentEnv = process.env.NODE_ENV || 'development';
        const isDetailed = process.env.REQUEST_LOG_DETAIL === 'true' || 
                           (currentEnv === 'development' && process.env.REQUEST_LOG_DETAIL !== 'false');

        if (isDetailed) {
            const requestId = req.requestId || 'N/A';
            const ip = req.ip || req.connection?.remoteAddress || 'N/A';
            const userAgent = req.get('user-agent') || 'N/A';
            const query = JSON.stringify(req.query);
            logMessage += ` [ID: ${requestId}] [IP: ${ip}] [UA: ${userAgent}] [Query: ${query}]`;
        }

        console.log(logMessage);
    });

    next();
};

module.exports = requestLogger;
