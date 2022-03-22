//function to fetch sports news
function fetchSportsNews() {
    let sports = new XMLHttpRequest();
    // let api = 'dbd9bad94b33424782ac9e7e017b4fa6';
    let api = 'f6277503b399424fb61de192041d58e7';
    sports.open('GET', `http://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${api}`, true);
    sports.onload = function() {
        let sportsNews = document.querySelector('.sports');
        if (this.status == 200) {
            let obj = JSON.parse(this.responseText);

            let sportsKhabar = Object.entries(obj.articles);
            let news = "";
            for (khabar in sportsKhabar) {


                console.log(sportsKhabar[khabar])
                let img = sportsKhabar[khabar][1].urlToImage;
                let title = sportsKhabar[khabar][1].title;
                let content = sportsKhabar[khabar][1].content;
                let url = sportsKhabar[khabar][1].url;
                if (content == null || content.includes('<table>')) {
                    continue;
                }


                news += `<div class="sportsNews">
            <img class="sportsImg" src="${img}" alt="Loading">
            <div class="news">
                <h4 class="sportsHead">${title}</h4>
                <section class="sportsSection">${content}</section>
                <a href="${url}" class="sportsMore">Explore</a>
            </div>
            
        </div>`
            }
            sportsNews.innerHTML = news;

        } else {

            sportsNews.innerHTML = '<h1 id="error">&#9888  Error Loading this Page</h1>';
            sportsNews.style.display = "flex";
            sportsNews.style.alignItems = "center";
            let error = document.getElementById('error');
            error.style.color = 'red';
        }
    }
    sports.send();
}
fetchSportsNews();


//function to show date and time
function showDate() {
    const date = new Date().toString().slice(0, 25);
    console.log(date);
    let container = document.getElementById('date');
    container.innerHTML = `<span>${date}</span>`;
}
showDate();