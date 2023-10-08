const navbarHTML = `
    <div class="navbar">
        <a href="/">
            <img src="https://raw.githubusercontent.com/hmes98318/Music-Disc/main/public/imgs/logo/logo2.svg" alt="Logo"
                width="75" height="75">
        </a>
        <a class="dashboard-button" href="/dashboard">Dashboard</a>
    </div>
`;

const navbarCSS = `
    /*----- Navbar -----*/

    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        height: 10vh;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #5b6eae;
        padding: 0px 15px;
        z-index: 1000;
    }

    .navbar a {
        color: white;
        text-decoration: none;
    }

    .navbar img {
        /* 懸停時放大 logo 速度 */
        transition: transform 0.6s ease;
        margin-top: 5px;
        margin-bottom: -5px;
    }

    .navbar img:hover {
        /* 懸停時放大 logo */
        transform: scale(1.1);
    }

    .dashboard-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #5b6eae;
        color: white;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-right: 25px;
    }

    .dashboard-button:hover {
        /* 懸停時背景顏色 */
        background-color: #475b99;
    }

    /*----- END Navbar -----*/
`;


document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.createElement("div");
    navbarContainer.innerHTML = navbarHTML;
    document.body.insertBefore(navbarContainer, document.body.firstChild);

    const style = document.createElement("style");
    style.textContent = navbarCSS;
    document.head.appendChild(style);
});
