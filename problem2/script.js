// Global variables
let selectedInputToken = null;
let selectedOutputToken = null;
let isSelectingInput = true;
const tokens = tokensList;

// Elements
const modal = document.getElementById('token-modal');
const tokenList = document.getElementById('token-list');
const inputAmount = document.querySelector('#input-amount');
const outputAmount = document.querySelector('#output-amount');
const inputToken = document.getElementById('input-token');
const outputToken = document.getElementById('output-token');
const submitButton = document.getElementById('submit-button');
const swapDirection = document.getElementById('swap-direction');
const form = document.querySelector('.swap-form');

// Initialize
function init() {
  setupEventListeners();
  renderTokenList();
}

// Event Listeners
function setupEventListeners() {
  inputToken.addEventListener('click', () => openTokenModal(true));
  outputToken.addEventListener('click', () => openTokenModal(false));

  document.querySelector('.close-modal').addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  inputAmount.addEventListener('input', handleInputChange);
  outputAmount.addEventListener('input', handleOutputChange);
  swapDirection.addEventListener('click', swapTokens);

  // Search functionality
  document.querySelector('.token-search').addEventListener('input', (e) => {
    const filteredTokens = filterTokens(e.target.value);
    renderFilteredTokens(filteredTokens);
  });

  form.addEventListener('submit', handleSwap);
}

// Token Modal functions
function openTokenModal(isInput) {
  isSelectingInput = isInput;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function renderTokenList() {
  renderFilteredTokens(tokens);
}

function renderFilteredTokens(tokenList) {
  const html = tokenList.map(token => `
    <div class="token-item" onclick="selectToken('${token.symbol}')">
      <img src="${token.image}" alt="${token.symbol}">
      <div>
        <div class="token-symbol">${token.symbol}</div>
        <div class="token-name">${token.name}</div>
      </div>
      <div class="token-price">$${token.price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      })}</div>
    </div>
  `).join('');
  
  document.getElementById('token-list').innerHTML = html;
}

function filterTokens(searchText) {
  const searchLower = searchText.toLowerCase();
  return tokens.filter(token => 
    token.symbol.toLowerCase().includes(searchLower) || 
    token.name.toLowerCase().includes(searchLower)
  );
}

// Token selection and swap functions
function selectToken(symbol) {
  const token = tokens.find(t => t.symbol === symbol);
  if (!token) return;

  if (isSelectingInput) {
    if (token === selectedOutputToken) {
      showAlert('Cannot swap same tokens');
      return;
    }
    selectedInputToken = token;
    document.getElementById('input-token-img').src = token.image;
    document.getElementById('input-token-symbol').textContent = token.symbol;
  } else {
    if (token === selectedInputToken) {
      showAlert('Cannot swap same tokens');
      return;
    }
    selectedOutputToken = token;
    document.getElementById('output-token-img').src = token.image;
    document.getElementById('output-token-symbol').textContent = token.symbol;
  }

  updateExchangeRate();
  closeModal();
}

function swapTokens() {
  const tempToken = selectedInputToken;
  selectedInputToken = selectedOutputToken;
  selectedOutputToken = tempToken;

  if (selectedInputToken) {
    document.getElementById('input-token-img').src = selectedInputToken.image;
    document.getElementById('input-token-symbol').textContent = selectedInputToken.symbol;
  }
  if (selectedOutputToken) {
    document.getElementById('output-token-img').src = selectedOutputToken.image;
    document.getElementById('output-token-symbol').textContent = selectedOutputToken.symbol;
  }

  const tempAmount = inputAmount.value;
  inputAmount.value = outputAmount.value;
  outputAmount.value = tempAmount;

  updateExchangeRate();
}

// Amount handling
function handleInputChange(e) {
  if (!selectedInputToken || !selectedOutputToken) return;
  const input = parseFloat(e.target.value.replace(',', '.'));
  outputAmount.value = calculateExchangeAmount(input);
}

function handleOutputChange(e) {
  if (!selectedInputToken || !selectedOutputToken) return;
  const output = parseFloat(e.target.value.replace(',', '.'));
  inputAmount.value = calculateExchangeAmount(output, true);
}

// Exchange rate calculations
function calculateExchangeAmount(amount, isReverse = false) {
  if (isNaN(amount)) return '';
  const rate = getExchangeRate();
  const result = isReverse ? amount / rate : amount * rate;
  return result.toFixed(8);
}

function getExchangeRate() {
  if (!selectedInputToken || !selectedOutputToken) return 1;
  return selectedOutputToken.price / selectedInputToken.price;
}

function updateExchangeRate() {
  if (!selectedInputToken || !selectedOutputToken) return;
  
  const rate = getExchangeRate();
  document.getElementById('exchange-rate').innerHTML = `
    1 ${selectedInputToken.symbol} = ${rate.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })} ${selectedOutputToken.symbol}
    <div class="usd-rate">
      ≈ $${selectedInputToken.price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </div>
  `;
}

// Custom alert function
function showAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const messageEl = document.getElementById('alert-message');
    messageEl.textContent = message;
    alertBox.style.display = 'flex';
}

function closeAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}

window.alert = showAlert;

// Handle swap function
function handleSwap(event) {
    event.preventDefault();

    if (!selectedInputToken || !selectedOutputToken) {
        showAlert('Please choose token');
        return;
    }

    if (selectedInputToken === selectedOutputToken) {
        showAlert('Cannot swap same tokens');
        return;
    }

    if (!inputAmount.value || !outputAmount.value) {
        showAlert('Please enter the token quantity');
        return;
    }

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Handling ...';

        setTimeout(() => {
            showAlert('Successful transaction!');
            submitButton.disabled = false;
            submitButton.textContent = 'Swap';
            inputAmount.value = '';
            outputAmount.value = '';
            selectedInputToken = null;
            selectedOutputToken = null;
            const inputTokenBtn = document.querySelector('.input-select button');
            const outputTokenBtn = document.querySelector('.output-select button');
            if (inputTokenBtn) inputTokenBtn.textContent = 'Select token';
            if (outputTokenBtn) outputTokenBtn.textContent = 'Select token';
        }, 2000);
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAlert();
        }
    });
});

init();
