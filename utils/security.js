const crypto = require('crypto');

class SecurityManager {
    static hash(data) {
        return crypto.createHmac('sha256', process.env.APP_SECRET || 'default-secret')
            .update(data)
            .digest('hex');
    }

    static generateToken(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }

    static validateTarget(ip) {
        const blacklist = ['0.0.0.0', '127.0.0.1'];
        return !blacklist.includes(ip);
    }

    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        return input.replace(/[<>]/g, '');
    }

    static encryptPayload(payload) {
        const iv = crypto.randomBytes(16);
        const key = crypto.scryptSync(process.env.APP_SECRET || 'secret', 'salt', 32);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(JSON.stringify(payload));
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return {
            iv: iv.toString('hex'),
            data: encrypted.toString('hex')
        };
    }

    static decryptPayload(encryptedData, ivHex) {
        const iv = Buffer.from(ivHex, 'hex');
        const key = crypto.scryptSync(process.env.APP_SECRET || 'secret', 'salt', 32);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

        let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return JSON.parse(decrypted.toString());
    }
}

module.exports = SecurityManager;
