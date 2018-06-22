module.exports = function user(req, res, next)
{
	if (req.client.role !== 'admin' && req.client.role !== 'user')
		return res.status(403).send('Access denied.');
	next();
}
