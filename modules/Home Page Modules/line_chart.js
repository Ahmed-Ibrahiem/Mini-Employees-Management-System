import { getData } from "../Utilies.js";

Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

const ctx = document.getElementById("line_chart").getContext("2d");
const chart_type_choise = document.getElementById("chart_type_choise");
const chart_type_options = document.querySelectorAll(
  ".line_chart_type .options span",
);
let line_chart = null;

// gradients
const gradientDesigner = ctx.createLinearGradient(0, 0, 0, 400);
gradientDesigner.addColorStop(0, "rgba(75,85,99,0.05)");
gradientDesigner.addColorStop(1, "rgba(75,85,99,0)");
const gradientDeveloper = ctx.createLinearGradient(0, 0, 0, 400);
gradientDeveloper.addColorStop(0, "rgba(34,197,94,0.05)");
gradientDeveloper.addColorStop(1, "rgba(34,197,94,0)");

const handle_chart_type_words = (word) => {
  let remove_space = word.split(" ").join("");
  let make_camel_case = `${remove_space[0].toLocaleLowerCase()}${remove_space.slice(1)}`;
  return make_camel_case;
};

const handle_line_chart = async (chart_type) => {
  const all_data = await getData("team_leader_performance_data.json");

  const chart_type_word = all_data[`${handle_chart_type_words(chart_type)}`];

  if (line_chart) {
    line_chart.data.labels = chart_type_word.labels;
    line_chart.data.datasets[0].data = chart_type_word.designerTeam;
    line_chart.data.datasets[1].data = chart_type_word.developerTeam;
    line_chart.update();
    return;
  }

  line_chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chart_type_word.labels,
      datasets: [
        {
          label: "Designer Team",
          data: chart_type_word.designerTeam,
          borderColor: "#6f6f6f",
          backgroundColor: gradientDeveloper,
          fill: true,
          tension: 0.3,
          pointRadius: 2,
          borderWidth: 2,
        },
        {
          label: "Developer Team",
          data: chart_type_word.developerTeam,
          borderColor: "#22c55e",
          backgroundColor: gradientDesigner,
          fill: true,
          tension: 0.3,
          pointRadius: 2,
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        title: {
          display: false,
          text: "Team Performance",
          align: "start",
          color: "#1e293b",
          font: { size: 16, weight: "bold" },
        },
      },
      scales: {
        x: {
          grid: {
            display: true,
            color: "rgba(224, 224, 224, 0.5)",
            borderDash: [4, 4],
          },
          ticks: { color: "#64748b" },
        },
        y: {
          grid: { display: false },
          ticks: { color: "#64748b" },
        },
      },
    },
  });

  // Legend Control Buttons
  document.querySelectorAll(".legend-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const meta = line_chart.getDatasetMeta(index);

      meta.hidden = !meta.hidden;
      btn.classList.toggle("active");
      line_chart.update();
    });
  });
};

handle_line_chart(chart_type_choise.textContent);

chart_type_options.forEach((option) =>
  option.addEventListener("click", async () =>
    handle_line_chart(option.textContent),
  ),
);
