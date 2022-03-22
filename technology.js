//function to show date and time
function showDate() {
    const date = new Date().toString().slice(0, 25);
    let container = document.getElementById('date');
    container.innerHTML = `<span>${date}</span>`;
}
showDate();

//function to fetch tech news
function fetchAPI() {
    let xhr = new XMLHttpRequest();
    // let api = 'dbd9bad94b33424782ac9e7e017b4fa6'
    let api = 'f6277503b399424fb61de192041d58e7'
    xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${api}`, true);
    xhr.onload = function() {
        let container = document.querySelector('.container');
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            let articles = Object.entries(obj.articles);
            console.log(articles);
            let news = "";
            for (idx in articles) {
                let img = articles[idx][1].urlToImage;
                let content = articles[idx][1].content;
                let url = articles[idx][1].url;
                if (content === null) {
                    continue;
                }
                news += ` <div class="newsContainer">
                             <img class="newsImg" src="${img}" alt="Loading">
                            <div class="content">
                                <section class="description">${content}</section>
                                <a href="${url}" class="url">Read More</a>
                            </div>
                        </div>`
            }
            container.innerHTML = news;
        } else {
            container.innerHTML = '<h1 id="error">&#9888  Error Loading this Page</h1>';
            let error = document.getElementById('error');
            error.style.color = 'red';
        }
    }
    xhr.send();
}

fetchAPI();