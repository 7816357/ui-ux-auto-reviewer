const validUser = {
  email: 'user@example.com',
  password: 'password123',
  name: 'UX Reviewer'
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  if (email === validUser.email && password === validUser.password) {
    return res.json({
      success: true,
      message: 'Login successful.',
      user: {
        name: validUser.name,
        email: validUser.email
      },
      token: 'demo-auth-token'
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid email or password.' });
};

exports.status = (req, res) => {
  res.json({ success: true, message: 'Auth service is running.' });
};
