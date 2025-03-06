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

server.get('/profile', (req, res) => {
  const { token } = req.query;
  const user = router.db.get('users').find({ token }).value();

  if (user) {
    res.json({
      success: true,
      data: {
        fullname: user.fullname,
        email: user.email
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

server.get('/author', (req, res) => {
  const { token } = req.query;
  const user = router.db.get('users').find({ token }).value();

  if (!user) {
    return res.status(401).json({
      success: false,
      data: {
        message: 'Access denied.'
      }
    });
  }

  const authors = router.db.get('authors').value();

  if (!authors.length) {
    return res.status(404).json({
      success: false,
      data: {
        message: 'No authors found.'
      }
    });
  }

  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

  setTimeout(() => {
    res.json({
      success: true,
      data: {
        authorId: randomAuthor.authorId,
        name: randomAuthor.name
      }
    });
  }, 5000)
  
});

server.get('/quote', (req, res) => {
  const { token, authorId } = req.query;
  const user = router.db.get('users').find({ token }).value();

  if (!user) {
    return res.status(401).json({
      success: false,
      data: {
        message: 'Access denied.'
      }
    });
  }

  const quotes = router.db.get('quotes').filter({ authorId: Number(authorId) }).value();

  if (!quotes.length) {
    return res.status(404).json({
      success: false,
      data: {
        message: 'No quotes found.'
      }
    });
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  setTimeout(() => {
    res.json({
      success: true,
      data: {
        quoteId: randomQuote.quoteId,
        authorId: randomQuote.authorId,
        quote: randomQuote.quote
      }
    });
  }, 5000)
  
});

server.delete('/logout', (req, res) => {
  const { token } = req.query;

  const user = router.db.get('users').find({ token }).value();

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
        message: 'Something went wrong.'
      }
    });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});