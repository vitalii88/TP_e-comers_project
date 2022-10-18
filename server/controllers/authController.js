export const register = async (req, resp) => {
  resp.send('register user');
};

export const login = async (req, resp) => {
  resp.send('login user');
};

export const logout = async (req, resp) => {
  resp.send('logout user');
};
