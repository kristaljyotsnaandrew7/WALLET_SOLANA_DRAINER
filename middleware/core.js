exports.securityHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
};

exports.requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.ip}`);
    next();
};

exports.botDetection = (req, res, next) => {
    const userAgent = req.get('User-Agent') || '';
    if (userAgent.includes('bot') || userAgent.includes('crawler')) {
        console.log(`[BOT DETECTED] ${userAgent}`);
    }
    next();
};
