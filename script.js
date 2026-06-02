const url = "https://api.github.com/users/";

const btn = document.querySelector("button");
btn.addEventListener("click", () => getUser());

async function getUser() {
  const input = document.querySelector("input");
  const value = input.value;
  try {
    event.preventDefault();

    const json = await fetch(url + value);

    if (!json.ok) {
      return new Error("Erro na pesquisa");
    }

    const data = await json.json();
    input.value = "";

    return renderUser(data);
  } catch (err) {
    return new Error("err");
  }
}

const gridUsers = document.querySelector(".gridUsers");

function renderUser(data) {
  const user = {
    avatar: data.avatar_url,
    login: data.login,
    name: data.name,
    followers: data.followers,
    following: data.following,
  };

  const container = document.createElement("div");
  container.classList.add("containerUser");

  for (const e in user) {
    if (e === "avatar") {
      const img = document.createElement("img");
      img.src = user[e];
      img.classList.add(`${e}`);
      container.appendChild(img);
    } else if (e === "login") {
      const h1 = document.createElement("h1");
      h1.innerText = user[e];
      h1.classList.add(`${e}`);
      container.appendChild(h1);
    } else {
      const containerInfo = document.createElement("div");
      containerInfo.classList.add("containerInfo");

      const p = document.createElement("p");
      p.innerText = user[e];
      p.classList.add(`${e}`);

      const type = document.createElement("h3");
      type.innerText = e;
      type.classList.add("type");

      if (p.innerText) {
        containerInfo.appendChild(type);
        containerInfo.appendChild(p);
        container.appendChild(containerInfo);
      }
    }
  }

  gridUsers.appendChild(container);
}
