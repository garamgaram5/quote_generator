const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;   
        loader.hidden = true;
    }
}

async function getQuotesFromAPI() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = fetch(apiUrl);
        apiQuotes = await (await response).json();
        // Pick a random quote from apiQuotes array
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // Check if Author field is blank and replace with 'Unknown'
        if (!quote.author) {
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = quote.author;
        }
        // Check Quote length to determine styling
        if (quote.text.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = quote.text;
        removeLoadingSpinner();
    } catch (error) {
        // Catch Error Here
        console.log('whoops, no quote', error);
    }
}

//  Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotesFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotesFromAPI();


  