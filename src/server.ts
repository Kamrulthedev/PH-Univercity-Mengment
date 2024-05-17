import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {

    try{
        await mongoose.connect(config.database_url as string);
        app.listen(config.prot, () => {
          console.log(`Example app listening on port ${config.prot}`)
      });
    }catch(error){
        console.log(error)
    }
}; 

main()

