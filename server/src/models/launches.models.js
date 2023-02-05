const launchesDB = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFUALT_FLIGHT_NUMBER = 100;

const launch = {

    flightNumber:100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-186 f',
    customer:['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

//launches.set(launch.flightNumber, launch);
saveLaunch(launch)
//launches.get(100)

async function existsLaunchesWithId(launchId) {
    return await launchesDB.findOne({
        flightNumber: launchId
    })
}

async function getLatestFlightNumber() {
    const latestLaunch =  await launchesDB
    .findOne()
    .sort('-flightNumber');


    if(!latestLaunch) {
        return DEFUALT_FLIGHT_NUMBER;
    }

    return  latestLaunch.flightNumber;
}

async function getAllLaunches() {
    
    return await launchesDB.find({}, { '_id':0, '__v': 0})
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!(planets)){
         throw new Error('No matching planet was found')
     }

    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch,{
        success:true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    })
    await saveLaunch(newLaunch)
}

async function abortLaunchById(launchId) {

    const aborted = await launchesDB.updateOne({
        flightNumber: launchId,
    }, {
        upcoming:false,
        success: false,
    });
    return aborted.modifiedCount === 1;
}

module.exports = {
    existsLaunchesWithId,
    getAllLaunches,
    abortLaunchById,
    scheduleNewLaunch

}