// function to fetch entertainment news
function fetchEntertainmentNews() {
    let xhr = new XMLHttpRequest();
    // let api = 'dbd9bad94b33424782ac9e7e017b4fa6';
    let api = 'f6277503b399424fb61de192041d58e7';
    xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${api}`, true);

    xhr.onload = function() {
        let postNews = document.querySelector('.accordion');
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);

            let articles = Object.entries(obj.articles);
            console.log(articles);
            let news = "";

            for (idx in articles) {

                let img = articles[idx][1].urlToImage;
                let title = articles[idx][1].title;
                let content = articles[idx][1].content;
                let url = articles[idx][1].url;
                if (content === null) {
                    continue;
                }
                news += `<div class="card">
            <div class="card-header head" id="heading${idx}">
                <h5 class="mb-0 head-2">
                    <button class="btn btn-link collapsed title" type="button" data-toggle="collapse" data-target="#collapse${idx}" aria-expanded="true" aria-controls="collapse${idx}">
                ${title}<span class="notify animation"><- Click here</span>;
              </button>
                </h5>
            </div>

            <div id="collapse${idx}" class="collapse " aria-labelledby="heading${idx}" data-parent="#accordionExample">
                <div class="card-body">
                    <div class="news">
                        <img class="newsImage" src="${img}" alt="Loading">
                        <section class="newsContent">${content}
                        <br>
                        <a class="readMore" href="${url}" >Read More</a></section>
                        
                    </div>
                </div>
            </div>
        </div>`
            }
            postNews.innerHTML = news;
        } else {

            postNews.innerHTML = '<h1 id="error">&#9888  Error Loading this Page</h1>';
            postNews.style.display = 'flex';
            postNews.style.justifyContent = 'center';
            let error = document.getElementById('error');
            error.style.color = 'red';
        }
    }
    xhr.send()
}
fetchEntertainmentNews();

//function to show date and time
function showDate() {
    const date = new Date().toString().slice(0, 25);
    console.log(date);
    let container = document.getElementById('date');
    container.innerHTML = `<span>${date}</span>`;
}
showDate();