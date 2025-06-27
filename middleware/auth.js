function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ msg: 'Não autorizado' });
}
module.exports = ensureAuthenticated;