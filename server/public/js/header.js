const header = document.querySelector(".header");

const nav = `
    <nav>
        <ul>
            <li>
                <a href="index.html">Accueil</a>
            </li>
            <li>
                <a href="articles.html">Articles</a>
            </li>
            <li>
                <a href="advice.html">Conseils</a>
            </li>
            <li>
                <a href="contact.html">Contact</a>
            </li>
            <li>
                <a href="account.html">Mon compte</a>
            </li>
            <li>
                <a href="admin.html">Administration</a>
            </li>
        </ul>
    </nav>
`

header.innerHTML = nav;