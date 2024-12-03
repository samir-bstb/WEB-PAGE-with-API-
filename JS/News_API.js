let newsletter = document.getElementById('New');

function api() {
    axios({
        method: 'GET',
        url: `https://gnews.io/api/v4/top-headlines?category=general&apikey=2e37b37f8f8fcedbac924b7fa8a9a995`
    }).then(res => {
        let news = res.data.articles;
        console.log(news);
        news.map((element) => {
            let div = document.createElement('div');
            div.style.textAlign = 'center'; // Centra el contenido del div
            div.innerHTML = `
            <br>
            <img style="max-width: 500px; display: block; margin: 0 auto;" src=${element.image} />
            <br>
            <h1 style="font-family: 'Arial', sans-serif;">${element.title}</h1>
            <h3 style="font-family: 'Arial', sans-serif;">${element.description}</h3>`;
            newsletter.appendChild(div);
        });
    });
}

api();