const api_key = "2cd95af1cb33411a9ea359bb944c3ee2";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"))

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${api_key}`)
    const data = await res.json();
    console.log(data);
    bindData(data.articles)
}

function bindData(articles) {
    if (!articles || !Array.isArray(articles)) {
        console.error("Invalid articles array:", articles);
        return;
    }

    const cardsContainer = document.getElementById('card-container');
    const newstemplate = document.getElementById("template");

    if (!cardsContainer || !newstemplate) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    cardsContainer.innerHTML = ""; // Clear existing content

    articles.forEach((article) => {
        if (!article.urlToImage) return; // Skip articles without images
    
        const cardClone = newstemplate.cloneNode(true);
        cardClone.classList.remove("template");
    
        // Set the image source
        cardClone.querySelector(".card-img-top").src = article.urlToImage;
    
        // Format and set the published date
        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta", // Correct option for time zone
            dateStyle: "medium", // Format for the date
            timeStyle: "short",  // Format for the time
        });
        cardClone.querySelector(".text-muted").textContent = date;
        cardClone.querySelector(".title").textContent = article.title;
        cardClone.querySelector(".source").textContent = article.source.name
        const sourceButton = cardClone.querySelector(".source");
        sourceButton.onclick = () => {
            window.open(article.url, "_blank");
        };
        
    
        // Set the article description
        cardClone.querySelector(".card-text").textContent =
            article.description.substr(0,150) || "No description available.";
    
        // Append the cloned card to the container
        cardsContainer.appendChild(cardClone);
    });
    
}
let currSeleCls = null;
function itemClickedNav(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSeleCls?.classList.remove("active")
    currSeleCls = navItem;
    currSeleCls.classList.add("active")
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return ;
    fetchNews(query);
    currSeleCls?.classList.remove("active")

})