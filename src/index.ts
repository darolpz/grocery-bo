import * as dotenv from 'dotenv';
import server from './server';

dotenv.config();

async function start() {
  try {
    const serv = await server();
    serv.listen(process.env.PORT || 8080, '0.0.0.0', (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
start();
