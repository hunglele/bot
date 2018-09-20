import "babel-polyfill";
import chai from "chai";
import chaiHTTP from "chai-http";
import app, {
    runServer
} from "../src/app";

chai.use(chaiHTTP);
const requester = chai.request(app);
const expect = chai.expect;
before(function (done) {
    runServer(3000, done);
});
export {
    requester,
    expect
};