const validUser = {
  email: 'user@example.com',
  password: 'password123',
  name: 'UX Reviewer'
};

// In-memory user store (in production, use a database)
const users = [validUser];

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return res.json({
      success: true,
      message: 'Login successful.',
      user: {
        name: user.name,
        email: user.email
      },
      token: 'demo-auth-token'
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid email or password.' });
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'User with this email already exists.' });
  }

  // Create new user
  const newUser = { name, email, password };
  users.push(newUser);

  return res.status(201).json({
    success: true,
    message: 'Registration successful.',
    user: {
      name: newUser.name,
      email: newUser.email
    },
    token: 'demo-auth-token'
  });
};

exports.status = (req, res) => {
  res.json({ success: true, message: 'Auth service is running.' });
};
