exports.trackVisit = (req, res) => {
    const { source, medium } = req.query;
    console.log(`[ANALYTICS] New Visit - Source: ${source || 'direct'}, Medium: ${medium || 'none'}`);
    res.json({ success: true, trackingId: require('../config/appConfig').analytics.trackingId });
};

exports.clickEvent = (req, res) => {
    const { elementId } = req.body;
    console.log(`[ANALYTICS] Click Event - ID: ${elementId}`);
    res.sendStatus(200);
};
