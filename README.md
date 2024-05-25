# Project Setup
## useing language and Tools :-
### ______TypeScript, JavaScript,,,,Mongoose, Mongodb, cors, dotenv, eslint, Prettier. 
## create a vs code file.
#### 1.npm init --y   //tarminal--(json file create)
#### 2.npm install mongoose //---Mongoose install(mongoose databse)
#### 3.npm install -D typescript //---typescript install(typescript programing language)
#### 4.npm install express //---express install(server create)
#### 5.npm i cors //---cors install(server tool)
#### 6.npm i dotenv //---dotenv install(.env file)
#### 7.npm i ts-node-dev //---ts-node-dev install(ts code run)
#### 8.tsc --init//---create a tsconfig.json
#### 9.npm i mongodb //install mongodb(mongodb install)
#### 10.setup rootDir("rootDir": "./src") and outDir("outDir": "./dist").. //tsconfig file
#### 11.folder structure..create 2 file ..src and dist
#### 12.src >[app > (config > index.ts) |
 #### {modules > student >( student.interface.ts | student.model.ts | 
 #### student.controler.ts | student.route.ts | student.service.ts) | 
 #### admin}] > server.ts and app.ts
#### 13. server.ts >..
 ####   import mongoose from "mongoose";
  #### 3   import config from "./app/config";
  ####  import app from "./app";

####  async function main() {
 ####  try {
  #####   await mongoose.connect(config.database_url as string);
   #####   app.listen(config.prot, () => {
  #####  console.log(`Example app listening on port ${config.prot}`);
  ##### });
 #####   } catch (error) {
 #####   console.log(error);
 #####   }
#####  }
 #####  main();
##### 14.app.ts > ..
 #####  import cors from "cors";
 #####  import express, { Application, Request, Response } from "express";
 #####  import { StudentRouts } from "./app/modules/student/student.route";
 #####  const app: Application = express();
#####
 ##### app.use(express.json());
##### app.use(cors());

##### //application routes
##### app.use('/api/v1/students', StudentRouts)
#####
#####
##### app.get("/",(req: Request, res: Response) => {
#####  const a = 19;
##### res.send(a);
####  });
  export default app;
#### 15.create .env file.
#### 16.create mongodb database connect and declard port..
####     (...NODE_ENV=development
####     USER_PROT=5000
####    DATABASE_URL=
####     mongodb+srv://admin-kh:45869ka35@cluster0.kqeap4x.mongodb.net/
 ####    first-project?retryWrites=true&w=majority&appName=Cluster0..)
#### 17.index.ts file .env file থেকে url গুলো নিয়ে এসে export করা > (...
 #####       import dotenv from "dotenv";
  ####  import path from "path";

 ####   dotenv.config({ path: path.join((process.cwd(), ".env")) });

 ####      export default {
####     prot: process.env.USER_PROT,
####    database_url: process.env.DATABASE_URL,
####   };
#### 18. Eslint install ..> 
#### 19.npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
#### 20.npx eslint --init //(give us qestion anser)
 #### 21.eslint.config.mjs ..file.....
   ####    import globals from "globals";
####   import pluginJs from "@eslint/js";
####  import tseslint from "typescript-eslint";

####  export default [
####    {
####      ignores: ["**/node_modules/", ".dist/"],
####         languageOptions: {
####          globals: {
####          ...globals.browser,
####         process: "readonly",
####        },
      
####      },
####      rules: {
####        "no-unused-vars": "error",
#####        "no-unused-expressions": "error",
 ####       "prefer-const": "error",
####        "no-console": "warn",
 ####       "no-undef": "error",
####       },
####      
####    },
####     pluginJs.configs.recommended,
####     ...tseslint.configs.recommended,
#### ];
#### 22.carate a file...(.gitignore)..>
####       node_modules
####          dist
####        .env
#### 23.added scripts package.json file..>
####            "scripts": {
 ####      "lint": "npx eslint src --ignore-pattern .ts",
####      "lint:fix": "npx eslint src --fix",
####      "star:prod":"node ./dist/server.js",
####      "start:dev": "ts-node-dev --respawn --transpile-only server.ts",
####      "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
 ####     "prettier:fix": "npx prettier --write src",
 ####     "test": "echo \"Error: no test specified\" && exit 1"
 ####   },
#### 24.added tsconfig.json file. একদম উপরে.>   
####  "include": ["src"], // which files to compile
####  "exclude": ["node_modules"], // which files to skip
#### 25. Prettier install....>
####   npm install --save-dev prettier
#### 26. create (prettierrc.json)..>
####     {
####    "semi": false, 
####    "singleQuote": true, 
####    "arrowParens": "avoid"
####  }
#### 27.tsc
#### 28.run project...node ./dist/server.js | scripts npm run start:dev
#### 29. create a interface ..(student.interface.ts) file..
####  import { Schema, model, connect } from 'mongoose';
####  export type Gardians = {
####    fatherName:string;
####    fatherContectNo:string;
####    fatherOccupation:string;
####    fatherAddress:string;
 ####   matherName:string;
####    matherContectNo:string;
####    matherOccupation:string;
####    matherAddress:string;
####   };
#### export type UserName = {
####    firstName:string;
####    middleName:string;
####    lastName:string;
#### };
####  export type LocalGardian ={
####    name:string;
####    occupation:string;
####    contectNO:string;
####    address:string;   
 ####   };
####  export type Student = {
####    id:string;
####    name:UserName;
####    gender:string;
####    dateOfBirth:string;
#####    email: string;
  ####  contectNo: string;
####    emargecyContectNo:string;
####    bloodGroup?:"A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
####    persentAddress:string;
 ####   permenantAddress:string;
 ####   gardians:Gardians;
####    localGardian:LocalGardian;
####    profileImg?:string;
####    isActive:'active' | 'block'; 
 ####   }
#### 30.create a schema and model.(student.model.ts) file e..>
 ####       import { Schema, model, connect } from "mongoose";
 ####   import { Gardians, LocalGardian, Student, UserName } from "./student.interface";



####   //schema create
####   const studentName = new Schema<UserName>({
####    firstName: { type: String, required: true },
####    middleName: { type: String, required: true },
####    lastName: { type: String, required: true },
####   });


 ####   const localGardianSchema = new Schema<LocalGardian>({
 ####       name: { type: String, required: true },
 ####       occupation: { type: String, required: true },
 ####       contectNO: { type: String, required: true },
####        address: { type: String, required: true },
 ####  });
####
 ####  const gardianSchema = new Schema<Gardians>({
 ####   fatherName: { type: String, required: true },
 ####   fatherContectNo: { type: String, required: true },
 ####   fatherOccupation: { type: String, required: true },
  ####  fatherAddress: { type: String, required: true },
####    matherName: { type: String, required: true },
####    matherContectNo: { type: String, required: true },
 ####   matherOccupation: { type: String, required: true },
####    matherAddress: { type: String, required: true },
 ####  });

    const studentSchema = new Schema<Student>({
     id: { type: String },
     name:studentName,
     gender: { type: String, required: true },
     dateOfBirth: { type: String, required: true },
     email: { type: String, required: true },
     contectNo: { type: String, required: true },
     emargecyContectNo: { type: String, required: true },
     bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
     persentAddress: { type: String, required: true },
     permenantAddress: { type: String, required: true },
     gardians: gardianSchema,
     localGardian:localGardianSchema,
     profileImg: { type: String },
     isActive: ["active", "block"],
    });
  //model create
   export const StudentModel = model<Student>('Student', studentSchema)
31.create a file ..(student.controler.ts)..
    import { Request, Response } from "express";
   import { StudentService } from "./student.service";

   const createStudent = async (req: Request, res: Response) => {
     try {
       const { student: studentData } = req.body;
       const result = await StudentService.createStudentInToDB(studentData);

     res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
    } catch (error) {
      console.log(error);
    }
  };

 const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrieved Successfully",
      data: result,
    });
   } catch (error) {
    console.log(error);
    }
####  };

 const getASingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.GetASingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: "A Single Student Get is Successfully",
      data: result,
      });
    } catch (error) {
    console.log(error);
    }
  };

  export const studentControllar = {
    createStudent,
    getStudents,
     getASingleStudent
  };
32.create a file...(student.route.ts)..>
    import express from "express";
  import { studentControllar } from "./student.controlar";


  const router = express.Router()


  router.post('/create-student', studentControllar.createStudent);
  router.get('/', studentControllar.getStudents)
  router.get('/:studentId', studentControllar.getASingleStudent)
  //add more

  export const StudentRouts = router;
33.create a file..(student.service.ts)..>
   import { Student } from "./student.interface";
  import { StudentModel } from "./student.model";

  const createStudentInToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

#### const getAllStudentsFromDB = async () => {
####  const result = await StudentModel.find();
#####  return result;
#### };
 #### const GetASingleStudent = async (id: string) => {
####  const result = await StudentModel.findOne({id});
####  return result;
#### };

####export const StudentService = {
####  createStudentInToDB,
####  getAllStudentsFromDB,
####  GetASingleStudent,
#### };
#### 34.tsc
#### 35.run server.....node ./dist/server.js

# Project Setup
## useing language and Tools :-
### ______TypeScript, JavaScript,,,,Mongoose, Mongodb, cors, dotenv, eslint, Prettier. 
## create a vs code file.
#### 1.npm init --y   //tarminal--(json file create)
#### 2.npm install mongoose //---Mongoose install(mongoose databse)
#### 3.npm install -D typescript //---typescript install(typescript programing language)
#### 4.npm install express //---express install(server create)
#### 5.npm i cors //---cors install(server tool)
#### 6.npm i dotenv //---dotenv install(.env file)
#### 7.npm i ts-node-dev //---ts-node-dev install(ts code run)
#### 8.tsc --init//---create a tsconfig.json
#### 9.npm i mongodb //install mongodb(mongodb install)
#### 10.setup rootDir("rootDir": "./src") and outDir("outDir": "./dist").. //tsconfig file
#### 11.folder structure..create 2 file ..src and dist
#### 12.src >[app > (config > index.ts) |
 #### {modules > student >( student.interface.ts | student.model.ts | 
 #### student.controler.ts | student.route.ts | student.service.ts) | 
 #### admin}] > server.ts and app.ts
#### 13. server.ts >..
 ####   import mongoose from "mongoose";
  #### 3   import config from "./app/config";
  ####  import app from "./app";

####  async function main() {
 ####  try {
  #####   await mongoose.connect(config.database_url as string);
   #####   app.listen(config.prot, () => {
  #####  console.log(`Example app listening on port ${config.prot}`);
  ##### });
 #####   } catch (error) {
 #####   console.log(error);
 #####   }
#####  }
 #####  main();
##### 14.app.ts > ..
 #####  import cors from "cors";
 #####  import express, { Application, Request, Response } from "express";
 #####  import { StudentRouts } from "./app/modules/student/student.route";
 #####  const app: Application = express();
#####
 ##### app.use(express.json());
##### app.use(cors());

##### //application routes
##### app.use('/api/v1/students', StudentRouts)
#####
#####
##### app.get("/",(req: Request, res: Response) => {
#####  const a = 19;
##### res.send(a);
####  });
  export default app;
#### 15.create .env file.
#### 16.create mongodb database connect and declard port..
####     (...NODE_ENV=development
####     USER_PROT=5000
####    DATABASE_URL=
####     mongodb+srv://admin-kh:45869ka35@cluster0.kqeap4x.mongodb.net/
 ####    first-project?retryWrites=true&w=majority&appName=Cluster0..)
#### 17.index.ts file .env file থেকে url গুলো নিয়ে এসে export করা > (...
 #####       import dotenv from "dotenv";
  ####  import path from "path";

 ####   dotenv.config({ path: path.join((process.cwd(), ".env")) });

 ####      export default {
####     prot: process.env.USER_PROT,
####    database_url: process.env.DATABASE_URL,
####   };
#### 18. Eslint install ..> 
#### 19.npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
#### 20.npx eslint --init //(give us qestion anser)
 #### 21.eslint.config.mjs ..file.....
   ####    import globals from "globals";
####   import pluginJs from "@eslint/js";
####  import tseslint from "typescript-eslint";

####  export default [
####    {
####      ignores: ["**/node_modules/", ".dist/"],
####         languageOptions: {
####          globals: {
####          ...globals.browser,
####         process: "readonly",
####        },
      
####      },
####      rules: {
####        "no-unused-vars": "error",
#####        "no-unused-expressions": "error",
 ####       "prefer-const": "error",
####        "no-console": "warn",
 ####       "no-undef": "error",
####       },
####      
####    },
####     pluginJs.configs.recommended,
####     ...tseslint.configs.recommended,
#### ];
#### 22.carate a file...(.gitignore)..>
####       node_modules
####          dist
####        .env
#### 23.added scripts package.json file..>
####            "scripts": {
 ####      "lint": "npx eslint src --ignore-pattern .ts",
####      "lint:fix": "npx eslint src --fix",
####      "star:prod":"node ./dist/server.js",
####      "start:dev": "ts-node-dev --respawn --transpile-only server.ts",
####      "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
 ####     "prettier:fix": "npx prettier --write src",
 ####     "test": "echo \"Error: no test specified\" && exit 1"
 ####   },
#### 24.added tsconfig.json file. একদম উপরে.>   
####  "include": ["src"], // which files to compile
####  "exclude": ["node_modules"], // which files to skip
#### 25. Prettier install....>
####   npm install --save-dev prettier
#### 26. create (prettierrc.json)..>
####     {
####    "semi": false, 
####    "singleQuote": true, 
####    "arrowParens": "avoid"
####  }
#### 27.tsc
#### 28.run project...node ./dist/server.js | scripts npm run start:dev
#### 29. create a interface ..(student.interface.ts) file..
####  import { Schema, model, connect } from 'mongoose';
####  export type Gardians = {
####    fatherName:string;
####    fatherContectNo:string;
####    fatherOccupation:string;
####    fatherAddress:string;
 ####   matherName:string;
####    matherContectNo:string;
####    matherOccupation:string;
####    matherAddress:string;
####   };
#### export type UserName = {
####    firstName:string;
####    middleName:string;
####    lastName:string;
#### };
####  export type LocalGardian ={
####    name:string;
####    occupation:string;
####    contectNO:string;
####    address:string;   
 ####   };
####  export type Student = {
####    id:string;
####    name:UserName;
####    gender:string;
####    dateOfBirth:string;
#####    email: string;
  ####  contectNo: string;
####    emargecyContectNo:string;
####    bloodGroup?:"A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
####    persentAddress:string;
 ####   permenantAddress:string;
 ####   gardians:Gardians;
####    localGardian:LocalGardian;
####    profileImg?:string;
####    isActive:'active' | 'block'; 
 ####   }
#### 30.create a schema and model.(student.model.ts) file e..>
 ####       import { Schema, model, connect } from "mongoose";
 ####   import { Gardians, LocalGardian, Student, UserName } from "./student.interface";



####   //schema create
####   const studentName = new Schema<UserName>({
####    firstName: { type: String, required: true },
####    middleName: { type: String, required: true },
####    lastName: { type: String, required: true },
####   });


 ####   const localGardianSchema = new Schema<LocalGardian>({
 ####       name: { type: String, required: true },
 ####       occupation: { type: String, required: true },
 ####       contectNO: { type: String, required: true },
####        address: { type: String, required: true },
 ####  });
####
 ####  const gardianSchema = new Schema<Gardians>({
 ####   fatherName: { type: String, required: true },
 ####   fatherContectNo: { type: String, required: true },
 ####   fatherOccupation: { type: String, required: true },
  ####  fatherAddress: { type: String, required: true },
####    matherName: { type: String, required: true },
####    matherContectNo: { type: String, required: true },
 ####   matherOccupation: { type: String, required: true },
####    matherAddress: { type: String, required: true },
 ####  });

    const studentSchema = new Schema<Student>({
     id: { type: String },
     name:studentName,
     gender: { type: String, required: true },
     dateOfBirth: { type: String, required: true },
     email: { type: String, required: true },
     contectNo: { type: String, required: true },
     emargecyContectNo: { type: String, required: true },
     bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
     persentAddress: { type: String, required: true },
     permenantAddress: { type: String, required: true },
     gardians: gardianSchema,
     localGardian:localGardianSchema,
     profileImg: { type: String },
     isActive: ["active", "block"],
    });
  //model create
   export const StudentModel = model<Student>('Student', studentSchema)
31.create a file ..(student.controler.ts)..
    import { Request, Response } from "express";
   import { StudentService } from "./student.service";

   const createStudent = async (req: Request, res: Response) => {
     try {
       const { student: studentData } = req.body;
       const result = await StudentService.createStudentInToDB(studentData);

     res.status(200).json({
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
    } catch (error) {
      console.log(error);
    }
  };

 const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrieved Successfully",
      data: result,
    });
   } catch (error) {
    console.log(error);
    }
####  };

 const getASingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.GetASingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: "A Single Student Get is Successfully",
      data: result,
      });
    } catch (error) {
    console.log(error);
    }
  };

  export const studentControllar = {
    createStudent,
    getStudents,
     getASingleStudent
  };
32.create a file...(student.route.ts)..>
    import express from "express";
  import { studentControllar } from "./student.controlar";


  const router = express.Router()


  router.post('/create-student', studentControllar.createStudent);
  router.get('/', studentControllar.getStudents)
  router.get('/:studentId', studentControllar.getASingleStudent)
  //add more

  export const StudentRouts = router;
33.create a file..(student.service.ts)..>
   import { Student } from "./student.interface";
  import { StudentModel } from "./student.model";

  const createStudentInToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

#### const getAllStudentsFromDB = async () => {
####  const result = await StudentModel.find();
#####  return result;
#### };
 #### const GetASingleStudent = async (id: string) => {
####  const result = await StudentModel.findOne({id});
####  return result;
#### };

####export const StudentService = {
####  createStudentInToDB,
####  getAllStudentsFromDB,
####  GetASingleStudent,
#### };
#### 34.tsc
#### 35.run server.....node ./dist/server.js

