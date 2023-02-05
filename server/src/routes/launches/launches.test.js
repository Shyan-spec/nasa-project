const request = require('supertest');
const { response } = require('../../app');

const app = require('../../app');

const {mongoConnect,mongoDisconnect} = require('../../services/mongo')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    })
    
    describe('Test /GET /launches' , () => {
        test('It should respond with a 200 success'  , async () => {
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        })
});

describe('Test /POST /launches' , () => {
    const completeLaunchData = {
           mission: 'U.S Enterprise',
           rocket: 'NCC-D10',
           target: 'Kepler-18g f',
           launchDate: 'January 28, 2400'
    }

    const LaunchDataWithoutDate = {
        mission: 'U.S Enterprise',
        rocket: 'NCC-D10',
        target: 'Kepler-18g f'
       
 }
 const LaunchDataWithInvalidDate = {
    mission: 'U.S Enterprise',
    rocket: 'NCC-D10',
    target: 'Kepler-18g f',
    launchDate: 'zoot'
   
}

    test('It should respond with a 201 created'  , async () => {
       const response = await request(app)
       .post('/v1/launches')
       .send(completeLaunchData)
       .expect('Content-Type', /json/)
        .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate)

        expect(response.body).toMatchObject(LaunchDataWithoutDate)
    });

    test('It should catch missing required properties'  , async () => {

        const response = await request(app)
       .post('/v1/launches')
       .send(LaunchDataWithoutDate)
       .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        });
    

    })

    test('It should catch invalid dates'  , async () => {
        const response = await request(app)
       .post('/v1/launches')
       .send(LaunchDataWithInvalidDate)
       .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        });
    })..
}) ;

})



