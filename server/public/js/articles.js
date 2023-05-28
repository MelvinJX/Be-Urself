fetch(`http://localhost:4020/all`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
        let result = "";
        data.forEach((item) => {
            result += `
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <img src="${item.image}">
                <button onclick="myFunction()">Bouton</button>
            `
            console.log("dednnlk")
        })
        document.querySelector(".allArticles").innerHTML = result;
    })

function myFunction(){
    console.log("NONONOONONO")
}