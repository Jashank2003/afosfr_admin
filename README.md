## Setting up Environment Variables

To securely manage sensitive information such as database URLs, we utilize environment variables. Follow these steps to set up your environment variables:

1. Create an `env` folder in the root directory of the project.

2. Inside the `env` folder, create a file named `env.js`.

3. Add the following code block to `env.js`, replacing `"Your mongodb atlas url here"` with your MongoDB Atlas URL:

```javascript
const env = {
    DATABASE_URL: "Your mongodb atlas url here"
};

export default env;

dsfsdf