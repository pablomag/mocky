module.exports = function admin(req, res, next)
{
	if (req.client.role !== 'admin')
		return res.status(403).send('Access denied.');
	next();
}
