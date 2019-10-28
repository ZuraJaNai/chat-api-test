const updateToken = async (req, res) => {
  const token = await req.user.generateAuthToken();
  res.json({ response: req.body.response, token });
};

module.exports = updateToken;
