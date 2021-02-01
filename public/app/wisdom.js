const getWisdom = (lang) => {
    const res = await (await fetch(`api/getWisdom?lang=${lang || "en"}`)).json();
    const wisdomPlaceholder = document.getElementById("wisdom");
    wisdomPlaceholder.innerText = res.wisdom;
}