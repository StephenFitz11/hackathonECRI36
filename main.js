const createCardElement = () => {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const cardHeader = document.createElement('h5');
  cardHeader.setAttribute('class', 'card-header');
  cardHeader.innerText = 'Response';
  card.appendChild(cardHeader);

  const cardBody = document.createElement('div');
  cardBody.setAttribute('class', 'card-body');
  card.appendChild(cardBody);

  const cardContent = document.createElement('p');
  cardContent.setAttribute('class', 'card-text');
  cardContent.innerHTML = 'This';
  cardBody.appendChild(cardContent);

  return card;
};

const createTable = (div) => {
  const table = document.createElement('table');
  table.setAttribute('class', 'table');

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  const responseCode = document.createElement('thead');
  const thHeaders = document.createElement('thead');
  const parentKeys = document.createElement('thead');
  const objects = document.createElement('thead');

  const tbody = document.createElement('tbody');
};

const createPTags = (obj, html) => {
  const keys = Object.keys(obj);

  keys.forEach((keyName) => {
    let keyType = '';
    let keyCount = 0;
    if (Array.isArray(keyName)) {
      keyType === 'Array';
      keyCount = obj[keyName].length;
    } else keyType = typeof obj[keyName];

    if (keyType === 'object') keyCount = Object.keys(obj[keyName]).length;

    const pTag = document.createElement('p');
    pTag.style.margin = '0px';
    pTag.style.padding = '0px';
    pTag.innerText = `Key Name: ${keyName} 
    Data Type: ${keyType}
    Entries: ${keyCount}`;

    html.appendChild(pTag);
    html.appendChild(document.createElement('p'));
  });
};

// MAKE IT BE ABLE TO DO POST
const getData = (e) => {
  e.preventDefault();
  const TESTINGENDPOINT = 'https://api.imgflip.com/get_memes';
  const endpointValuePROD = document.getElementById('endpoint').value;
  const methodValue = document.getElementById('methodSelect').value;
  let responseObj = {};
  var startTime = performance.now();
  fetch(TESTINGENDPOINT)
    .then((response) => {
      const cardHeader = document.querySelector('.responseCodeNumber');
      if (response.status === 200) cardHeader.style.color = 'green';
      else cardHeader.style.color = 'red';
      cardHeader.innerText = `${response.status}`;
      console.log('RESPONSE', response);

      return response.json();
    })
    .then((data) => {
      const card = document.querySelector('.card');
      card.style.visibility = 'visible';
      const cardText = document.querySelector('.card-text');
      console.log('DATA', data);
      const showKeysDiv = document.querySelector('.showKeysDiv');
      createPTags(data, showKeysDiv);
      var endTime = performance.now();
      console.log(`${endTime - startTime}`);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('SOMETHING');
  document.getElementById('submitButton').addEventListener('click', getData);
  document.querySelector('.showKeysBtn').addEventListener('click', () => {
    const currentStyle =
      document.querySelector('.showKeysDiv').style.visibility;
    if (currentStyle === 'hidden')
      document.querySelector('.showKeysDiv').style.visibility = 'visible';
    else document.querySelector('.showKeysDiv').style.visibility = 'hidden';
  });
});
