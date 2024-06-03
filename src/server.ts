import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { server } from "http";


let server: server 

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
   server =   app.listen(config.prot, () => {
      console.log(`Example app listening on port ${config.prot}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
process.on('unhandledRejection', () =>{
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1);
});

process.on('uncaughtException', ()=>{
  console.log(`uncaughtException is detrced, shutting down`)
  process.exit(1)
})
