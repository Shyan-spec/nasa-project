const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    launchDate: new Date('December 27, 2030'),
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    target: 'Kepler-442 b',
    customer:['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);
launches.get(100)

function existsLaunchesWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    getAllLaunches()
    console.log(launches + "this")
    latestFlightNumber += 1; 
    launches.set(latestFlightNumber,
         Object.assign(launch, {
             success: true,
             upcoming: true,
             customers: [ 'Zero To Mastery', 'NASA'],
            flightNumber:latestFlightNumber,
    }))
}

function abortLaunchById(launchId) {
   const aborted = launches.get(launchId);
   aborted.upcoming = false;
   aborted.success = false;
   return aborted;
}

module.exports = {
    existsLaunchesWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById

}