import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join((process.cwd(), '.env'))});

export default{
    prot: process.env.USER_PROT,
    database_url: process.env.DATABASE_URL
};

