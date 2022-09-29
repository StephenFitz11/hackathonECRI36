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
  fetch(endpointValuePROD)
    .then((response) => {
      const responseEntry = document.querySelector('.responseEntry');
      if (response.status === 200) responseEntry.style.color = 'green';
      else responseEntry.style.color = 'red';
      responseEntry.innerText = `${response.status}`;

      const headersEntry = document.querySelector('.headersEntry');

      const headers = [...response.headers];
      let headerString = '';
      headers.forEach((e) => {
        headerString += `${e}\n`;
      });

      headersEntry.innerText = headerString;

      return response.json();
    })
    .then((data) => {
      const card = document.querySelector('.responsePane');
      card.style.visibility = 'visible';
      const cardText = document.querySelector('.card-text');
      console.log('DATA', data);

      // createPTags(data, showKeysDiv);
      var endTime = performance.now();

      const timeEntry = document.querySelector('.timeEntry');

      timeEntry.innerText = `${parseFloat(String(endTime - startTime)).toFixed(
        2
      )}ms`;

      const objEntry = document.querySelector('.jsonText');
      console.log(objEntry);
      objEntry.innerText = JSON.stringify(data, undefined, 4);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('SOMETHING');
  document.querySelector('#methodSelect').addEventListener('input', (e) => {
    const methodValue = document.querySelector('#methodSelect').value;

    // var text = methodValue.options[methodValue.selectedIndex].text;
    console.log(methodValue);
    e.preventDefault();
    const postOptions = document.querySelector('.post-options');
    if (methodValue === 'POST') {
      postOptions.style.display = 'inline';
    } else {
      postOptions.style.display = 'none';
    }
  });
  document.getElementById('submitButton').addEventListener('click', getData);
  document.getElementById('submitButton').addEventListener('click', () => {
    console.log('CLICKED');
  });
});
