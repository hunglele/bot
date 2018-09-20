import dotenv from 'dotenv'

import {
    runServer
} from "./server/server";

dotenv.config()

runServer(process.env.PORT || 3000);