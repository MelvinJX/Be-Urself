let data = {};

function setBackData(dataApi){
    data = dataApi;
}

fetch(`http://localhost:4020/create-article`)
    .then(response => response.json())
    .then(dataApi => {
            // setBackData(dataApi) 
            console.log(dataApi)
        }   
    )

const createArticle = document.querySelector("#create-article");

createArticle.addEventListener("click", () => {
    const title = document.querySelector("#article-title").innerHTML = "Nouveau titre";
    const content = document.querySelector("#article-description").innerHTML = "Description détaillé de l'article";
    console.log(createArticle);
})