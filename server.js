const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      info: "Some information about the Company."
    }
  });
});

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get('users').find({ email, password }).value();

  if (user) {
    res.json({
      success: true,
      data: {
        token: user.token
      }
    });
  } else {
    res.status(401).json({
      success: false,
      data: {
        message: 'Access denied.'
      }
    });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});