const db = require('../services/database');
const security = require('../utils/security');

class Visitor {
    constructor(data) {
        this.id = data.id;
        this.ipAddress = data.ipAddress;
        this.userAgent = data.userAgent;
        this.visitedAt = data.visitedAt || new Date();
        this.metadata = data.metadata || {};
    }

    static async create(data) {
        const sanitized = {
            ipAddress: data.ipAddress,
            userAgent: security.sanitizeInput(data.userAgent),
            metadata: JSON.stringify(data.metadata)
        };

        const result = await db.query(
            'INSERT INTO visitors (ip_address, user_agent, metadata, created_at) VALUES (?, ?, ?, ?)',
            [sanitized.ipAddress, sanitized.userAgent, sanitized.metadata, new Date()]
        );

        return new Visitor({
            id: result.insertId,
            ...data
        });
    }

    static async findByIp(ipAddress) {
        const rows = await db.query('SELECT * FROM visitors WHERE ip_address = ? LIMIT 1', [ipAddress]);
        if (rows.length === 0) return null;
        return new Visitor(rows[0]);
    }

    async save() {
        await db.query(
            'UPDATE visitors SET metadata = ?, last_seen_at = ? WHERE id = ?',
            [JSON.stringify(this.metadata), new Date(), this.id]
        );
    }
}

module.exports = Visitor;
