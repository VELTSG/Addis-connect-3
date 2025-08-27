const jwt = require('jsonwebtoken');

// Express middleware to validate JWT from Authorization: Bearer <token>
module.exports = function auth(requiredRoles = []) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!token) return res.status(401).json({ message: 'Missing token' });

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload; // { id, role }

            if (requiredRoles.length && !requiredRoles.includes(payload.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};
