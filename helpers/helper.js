
const helper = {}

helper.auth = function(req, res, next) {
    if (req.session && req.session.userid != null)
      return next();
    else
      return res.sendStatus(401);
};

module.exports = helper;