import * as dotenv from 'dotenv';
import server from './server';

dotenv.config();

async function start() {
  try {
    const port: number = Number(process.env.PORT);

    const serv = await server();
    serv.listen(port, (err, address) => {
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
