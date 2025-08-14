import app from './app';
import { parsedEnvVariables } from './config/appConfig';

const port = parsedEnvVariables.PORT;

app.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
