console.log ('loading script file?');

async function loadOptions() {

  const response = await fetch("data/data/.json");

  if (!response.ok) {
    throw new Error("Could not load local JSON");
  }

  const data = await response.json();

  console.log(data);

}

loadOptions();