function searchDisplay() {
    let searchNews = document.getElementById('searchNews');
    searchNews.style.display = "none";
}
searchDisplay();
const Rooturl = '@Url.Action("~/")'
// Slide the SLIDESHOW in every 5sec 
var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) { slideIndex = 1 }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 5000);
}


// function to get current date and time
function showDate() {
    const date = new Date().toString().slice(0, 25);
    let container = document.getElementById('date');
    container.innerHTML = `<span>${date}</span>`;
}
showDate();




const titleArr = [];
const contentArr = [];
const urlArr = [];

// API KEY
// let api = 'dbd9bad94b33424782ac9e7e017b4fa6';
let api = 'f6277503b399424fb61de192041d58e7';


// function to fetch headlines
function fetchTopNews() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', Rooturl+`http://newsapi.org/v2/top-headlines?country=in&apiKey=${api}`, true);
    xhr.onload = function() {
        let putNews = document.querySelector('.livenews');
        if (this.status == 200) {
            let obj = JSON.parse(this.responseText);
            // console.log(obj);
            let flag = 0
            let breaking = document.getElementById("breakingNews");
            let explore = document.getElementById('exploreBreaking');

            // console.log(putNews);
            let articles = Object.entries(obj.articles);
            // console.log(obj);
            let news = "";
            breaking.innerHTML = articles[0][1].title;
            explore.setAttribute('href', articles[0][1].url);

            news += `
                <img class="newsImage" src="${articles[1][1].urlToImage}" alt="Loading">
                <div class="news">
                <h3 class="newsHeading">${articles[1][1].title}</h3>
                <section class="newsContent">${articles[1][1].content}
               </section>
                <a class="readMore" href="${articles[1][1].url}" target="_blank">Read More</a>
                </div>`


            putNews.innerHTML = news;

            let container = document.querySelector('.container');
            let moreNews = "";
            for (article in articles) {

                let img = articles[article][1].urlToImage;
                let title = articles[article][1].title;
                let content = articles[article][1].content;
                let url = articles[article][1].url;
                if (title === null || img === null) {
                    continue;
                }
                titleArr.push(title);
                contentArr.push(content)
                urlArr.push(url);
                if (article == 0 || article == 1) {
                    continue;
                }


                moreNews += ` <div class="moreNews">
                            <img class="newsImage"src="${img}" alt="Loading">
                            <section class='newsSection'>${title}</section>
                            <a class="readMore" href="${url}">Read More</a>
                        </div>`
            }
            container.innerHTML = moreNews;

        } else {
            let head = document.getElementById('live');
            head.innerHTML = '<div class="blank"></div>';
            putNews.innerHTML = "<h2 class='error'>&#9888 Error Loading This Page</h2>";
            console.log("error");
        }
    }
    xhr.send();
}
fetchTopNews();



// function to fetch entertainment news
function fetchEntertainmentNews() {
    let xhrEntertainment = new XMLHttpRequest();
    xhrEntertainment.open('GET',  Rooturl+`http://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${api}`, true);
    xhrEntertainment.onload = function() {
        let putNews = document.querySelector('.entertainNews');
        if (this.status == 200) {
            let obj = JSON.parse(this.responseText);
            // console.log(obj);
            let articles = Object.entries(obj.articles);
            let news = "";
            news += `
                    <img class="newsImage" src="${articles[0][1].urlToImage}" alt="Loading">
                    <div class="news">
                    <h3 class="newsHeading">${articles[0][1].title}</h3>
                    <section class="newsContent">${articles[0][1].content}
                </section>
                    <a class="readMore" href="${articles[0][1].url}" target="_blank">Read More</a>
                    </div>`


            putNews.innerHTML = news;
            for (article in articles) {

                let img = articles[article][1].urlToImage;
                let title = articles[article][1].title;
                let content = articles[article][1].content;
                let url = articles[article][1].url;
                if (title === null || content === null || url === null || img === null) {
                    continue;
                }
                titleArr.push(title);
                contentArr.push(content)
                urlArr.push(url);
            }
        } else {
            let category = document.getElementById('cat1');
            category.innerHTML = '<div class="blank"></div>';
            putNews.innerHTML = "<h2 class='error'>&#9888 Error Loading This Page</h2>";
        }
    }
    xhrEntertainment.send();
}
fetchEntertainmentNews();


// function to fetch business news
function fetchBusinessNews() {
    let xhrBusiness = new XMLHttpRequest();
    xhrBusiness.open('GET', `http://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${api}`, true);
    xhrBusiness.onload = function() {
        let putNews = document.querySelector('.businessNews');
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            let articles = Object.entries(obj.articles);
            let news = "";
            news += `
                    <img class="newsImage" src="${articles[1][1].urlToImage}" alt="Loading">
                    <div class="news">
                    <h3 class="newsHeading">${articles[1][1].title}</h3>
                    <section class="newsContent">${articles[1][1].content}
                   </section>
                    <a class="readMore" href="${articles[1][1].url}" target="_blank">Read More</a>
                    </div>`


            putNews.innerHTML = news;
            for (article in articles) {

                let img = articles[article][1].urlToImage;
                let title = articles[article][1].title;
                let content = articles[article][1].content;
                let url = articles[article][1].url;
                titleArr.push(title);
                contentArr.push(content)
                urlArr.push(url);
            }
        } else {
            let category = document.getElementById('cat2');
            category.innerHTML = '<div class="blank"></div>';
            putNews.innerHTML = "<h2 class='error'>&#9888 Error Loading This Page</h2>";
        }
    }
    xhrBusiness.send();
}
fetchBusinessNews();



// function to search news by name
function newsSearch() {
    let searchBtn = document.getElementById('searchBtn')
    searchBtn.addEventListener('click', search);
}
newsSearch();

function search() {
    let searchNews = document.getElementById('searchNews');
    let newsSearch = document.getElementById('newsSearch');
    let content = document.getElementById('search');
    if (content.value === "") {
        newsSearch.innerText = "NO Results Found";
        newsSearch.style.color = "black";
        searchNews.style.display = "block";
        return;
    }
    let news = "";
    for (let i = 0; i < titleArr.length; i += 1) {
        let upper = titleArr[i];
        let lower = titleArr[i].toLowerCase();
        if (contentArr[i] === null || titleArr[i] === null || urlArr[i] === null) {
            continue;
        }
        if (upper.includes(content.value) || lower.includes(content.value)) {
            news += `<div class="news-search">
                <h4><a class="urlLink" href="${urlArr[i]}">${titleArr[i]}</a></h4>
                <div>${contentArr[i]}</div>
            </div>`
        }
    }
    if (news === "") {
        newsSearch.innerText = "NO Results Found";
        newsSearch.style.color = "black";
    } else {
        newsSearch.innerHTML = news;
    }
    searchNews.style.display = "block";
}


// function to close the search news by name 
function closeSearch() {
    let cancel = document.querySelector('.cancel');
    cancel.addEventListener('click', close);
}
closeSearch();

function close() {
    let searchNews = document.getElementById('searchNews');
    searchNews.style.display = "none";
}

// function to fetch sports news
function fetchSportsNews() {
    let sports = new XMLHttpRequest();
    // let api = 'dbd9bad94b33424782ac9e7e017b4fa6';
    sports.open('GET', `http://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${api}`, true);
    sports.onload = function() {
        if (this.status == 200) {
            let obj = JSON.parse(this.responseText);

            let sportsKhabar = Object.entries(obj.articles);
            for (khabar in sportsKhabar) {
                let title = sportsKhabar[khabar][1].title;
                let content = sportsKhabar[khabar][1].content;
                let url = sportsKhabar[khabar][1].url;
                if (content == null || content.includes('<table>')) {
                    continue;
                }
                titleArr.push(title);
                contentArr.push(content);
                urlArr.push(url);


            }
        }
    }
    sports.send();
}
fetchSportsNews();
