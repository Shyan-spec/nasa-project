const API_URL = 'http://localhost:8000/v1'

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
 const response = await fetch(`${API_URL}/planets`);
 return response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  console.log(fetchedLaunches)
    return await fetchedLaunches.sort((a,b)=> {
    return console.log(a.flightNumber - b.flightNumber);
  });
}

  


async function httpSubmitLaunch(launch) {

 try{
   return await fetch(`${API_URL}/launches`,
    {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch),

    }).then( console.log(launch ));
  }catch(err) {
    return {
      ok:false,
    }
  }
  
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try{
  return await fetch(`${API_URL}/launches/${id}`, {
    method: "DELETE",
  })
}catch(error) {
 console.log(error);
 return {
   ok:false,
 };
}

}


export{
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};