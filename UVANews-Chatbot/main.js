import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const query = data.get('prompt');
    const response = await fetch('http://localhost:8080/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        "query": query,
      }),
    });

    try {
      const response_json = await response.json();
      const model_answer = response_json["modelAnswer"];
      const paragraphElement = document.getElementById('dynamicText');
      paragraphElement.textContent = model_answer;
      
    } catch(error) {
      alert(error);
    }
});

document.getElementById("update").addEventListener("click", async (e) => {
  e.preventDefault();

  const response = await fetch('http://localhost:8080/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  try {
    const response_json = await response.json();
    const date = response_json["mostRecentDate"];
    const paragraphElement = document.getElementById('mostRecentDate');
    paragraphElement.textContent = `Up to date as of: ${date}`;
    
  } catch(error) {
    alert(error);
  }
});
