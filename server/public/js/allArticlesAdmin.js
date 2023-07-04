fetch(`http://localhost:4020/article/all`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
        let result = ""
        data.forEach((item) => {
            result += `
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <img src="${item.image}">
                <button onclick="maFonction('${item._id}')">Supprimer l'article</button>
                <p>${item._id}</p>
            `
        })
        document.querySelector(".allArticles").innerHTML = result;
    })

function maFonction(id){
    fetch(`http://localhost:4020/article/delete/${id}`, {method: "DELETE"})
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

function leTest(id){
    console.log(id)
}