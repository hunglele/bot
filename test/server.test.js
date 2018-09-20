import {
    expect,
    requester
} from "./setup";

describe('Test server', () => {
    it('Test server work', done => {
        requester.get("/ping").end((err, res) => {
            if (err) throw err;
            expect(res).to.have.status(200);
            done();
        });
    });
});