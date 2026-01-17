const team_leader_options = document.querySelector(
  "#team_leader .options .options_container"
);
const team_leader_field = document.getElementById("team_leader_field");

const fetch_team_leader = async () => {
  const req = await fetch("team_leaders.json");
  const res = req.json();
  return res;
};

fetch_team_leader().then((data) => {
  render_team_leader_options(data);
});

const render_team_leader_options = (array = []) => {
  team_leader_options.innerHTML = ``;
  array.forEach((leader) => {
    const span = document.createElement("span");
    span.dataset.id = leader.id;
    span.textContent = `${leader.first_name} ${leader.last_name.slice(0, 1)}.`;
    team_leader_options.appendChild(span);
  });
  team_leader_field.textContent = team_leader_options.children[0].textContent;
  team_leader_field.dataset.id = team_leader_options.children[0].dataset.id;
};

team_leader_options.addEventListener("click", (e) => {
  if (e.target.tagName == "SPAN") {
    team_leader_field.textContent = e.target.textContent;
    team_leader_field.dataset.id = e.target.dataset.id;
  }
});




