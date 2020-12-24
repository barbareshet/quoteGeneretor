const container = document.getElementById('quote-coantainer');
const quote = document.getElementById('quote');
const twitter = document.getElementById('twitter');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get quote from API

async function getQuote() {

    loadingQuote();
    const APIURL = 'https://api.quotable.io/random';
    try {
        const res = await fetch(APIURL);
        const data = await res.json();
        console.log(data);
        quote.innerText = data.content;
        if (data.content.length > 120) {
            quote.classList.add('long-quote');
        } else {
            quote.classList.remove('long-quote');
        }
        author.innerText = data.author;

    } catch (err) {
        console.warn('No quote', err);
        getQuote();
    }
    complete();
}
//Twitter btn funcion
function tweetQuote() {
    const quoteText = quote.innerText;
    const authorName = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorName}`;
    window.open(twitterUrl, '_blank');
}

// Show loader
function loadingQuote() {
    loader.hidden = false;
    container.hidden = true;
}

// Hide loader when complete
function complete() {
    if (!loader.hidden) {
        container.hidden = false;
        loader.hidden = true;
    }
}

// Run funciotn on page Load
getQuote();

//Even Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitter.addEventListener('click', tweetQuote);