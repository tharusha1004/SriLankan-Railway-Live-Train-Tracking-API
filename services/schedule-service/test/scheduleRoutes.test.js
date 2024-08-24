const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Schedule = require('../models/schedule');

chai.use(chaiHttp);
const should = chai.should();

let mongoServer;

before(async function() {
    this.timeout(10000); // Increase timeout to 10 seconds
    
    if (mongoose.connection.readyState !== 0) { // If not disconnected
        await mongoose.disconnect();
    }

    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe('Schedules', () => {
    beforeEach(async () => {
        await Schedule.deleteMany({});
    });

    describe('/GET schedules', () => {
        it('it should GET all the schedules', (done) => {
            chai.request(server)
                .get('/api/schedules')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST schedules', () => {
        it('it should POST a new schedule', (done) => {
            const schedule = {
                train_id: "1234",
                route: "Colombo to Kandy",
                time: "09:00:00"
            };
            chai.request(server)
                .post('/api/schedules')
                .send(schedule)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('train_id').eql(schedule.train_id);
                    res.body.should.have.property('route').eql(schedule.route);
                    res.body.should.have.property('time').eql(schedule.time);
                    done();
                });
        });
    });

    describe('/GET schedules/:id', () => {
        it('it should GET a schedule by the given id', (done) => {
            const schedule = new Schedule({ train_id: "1234", route: "Colombo to Kandy", time: "09:00:00" });
            schedule.save((err, schedule) => {
                chai.request(server)
                    .get('/api/schedules/' + schedule._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('train_id').eql(schedule.train_id);
                        res.body.should.have.property('route').eql(schedule.route);
                        res.body.should.have.property('time').eql(schedule.time);
                        done();
                    });
            });
        });
    });
});
