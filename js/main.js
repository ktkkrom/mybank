let numToHistoryDiv = number => {
  let historyDiv = document.getElementById('history');

  let li = document.createElement('li');
  li.style.display = 'inline-block';
  li.style.padding = '2px';
  li.innerText = number;
  historyDiv.appendChild(li)
}

document.getElementById('findNum').onclick = () => {
  let number = document.getElementById('number').value;
  document.getElementById('content').innerHTML = '';
  document.getElementById('number').value = ''
  numToHistory(number);
  numToHistoryDiv(number);
  if (number == parseInt(number)) {
    axios.get(`http://numbersapi.com/${number}`)
      .then(response => {
        response.data
        let contentDiv = document.getElementById('content');
        let p = document.createElement('p');
        contentDiv.appendChild(p);
        p.innerText = response.data;
        p.id = 'content-p'
      })
  } else {
    return alert('invalid number')
  }
}

let numToHistory = number => {
  let numHistory = JSON.parse(localStorage.getItem('history'));

  if (numHistory) {
    numHistory.push(number);
    localStorage.setItem('history', JSON.stringify(numHistory))
  } else {
    localStorage.setItem('history', JSON.stringify([number, ]))
  }
}

let historyList = JSON.parse(localStorage.getItem('history'));
if (historyList) {
  historyList.map(el => numToHistoryDiv(el))
}


let deleteAll = document.getElementById('clearHistory').onclick = () => {
  document.getElementById('history').innerHTML = '';
  localStorage.removeItem('history')
}

let currencyOutput = (response) => {
  let resultsDiv = document.getElementById('results');

  let currencyLi = new ContentCreator(
    response.data.rates.SEK,
    response.data.rates.GBP,
    response.data.rates.BGN,
    response.data.rates.ZAR
  );
  let resultUl = currencyLi.createFinalUl();
  resultsDiv.replaceChild(resultUl, document.getElementById('firstUl'));
}
document.getElementById('findCurrency').onclick = () => {
  if (option1.selected === true) {
    axios.get(`https://api.exchangeratesapi.io/latest?base=EUR`)
      .then(response => {
        currencyOutput(response)
      })
  } else if (option2.selected === true) {
    axios.get(`https://api.exchangeratesapi.io/latest?base=CAD`)
      .then(response => {
        currencyOutput(response)
      })
  } else if (option3.selected === true) {
    axios.get(`https://api.exchangeratesapi.io/latest?base=CZK`)
      .then(response => {
        currencyOutput(response)
      })
  } else if (option4.selected === true) {
    axios.get(`https://api.exchangeratesapi.io/latest?base=THB`)
      .then(response => {
        currencyOutput(response)
      })
  }
}

class ContentCreator {
  constructor(sek, gbp, bgn, zar) {
    this.sek = sek;
    this.gbp = gbp;
    this.bgn = bgn;
    this.zar = zar;
  }
  createFinalUl() {
    let resultUl = document.createElement('ul');
    resultUl.id = 'firstUl';
    resultUl.appendChild(this.createCurrency());

    return resultUl;
  }
  createCurrency() {
    let p = document.createElement('p')
    let span1 = document.createElement('li');
    span1.innerText = `sek = ${this.sek}`;

    let span2 = document.createElement('li');
    span2.innerText = `gbp = ${this.gbp}`;

    let span3 = document.createElement('li');
    span3.innerText = `bgn = ${this.bgn}`;

    let span4 = document.createElement('li');
    span4.innerText = `zar = ${this.zar}`;
    p.appendChild(span1)
    p.appendChild(span2)
    p.appendChild(span3)
    p.appendChild(span4)
    return p
  }

}

// Calculator
let input = document.getElementById('screen');

function addToScreen(num) {
  input.value += num;
  if (num === 'c') {
    input.value = ''
  }
}

function result() {
  num = input.value
  console.log(num)
  num = eval(num);

  input.value = num;

}
