import dotenv from 'dotenv'

import {
    runServer
} from "./src/app";

dotenv.config()

runServer(process.env.PORT || 3000);