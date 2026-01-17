const ctx = document.getElementById("doughnut_chart");

const doughnut_chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [
      "Software engineer",
      "UI/UX Designer",
      "Data Analyst",
      "Mobile Development",
      "Project Manager",
    ],
    datasets: [
      {
        data: [50, 28, 25, 10, 7],
        backgroundColor: [
          "#059669",
          "#34d399",
          "#6ee7b7",
          "#a7f3d0",
          "#d1fae5",
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%", // سمك الدونت
    plugins: {
      legend: {
        display: false, // نلغي الافتراضي
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    },
  },
});

document
  .querySelectorAll(".custom_doughnut_legend .doughnut_legend")
  .forEach((btn) => {
    const index = +btn.dataset.index;

    btn.querySelector(".dot").style.background =
      doughnut_chart.data.datasets[0].backgroundColor[index];

    btn.addEventListener("click", () => {
      doughnut_chart.toggleDataVisibility(index);
      btn.classList.toggle("active");
      doughnut_chart.update();
    });
  });
