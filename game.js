(() => {
  "use strict";

  const config = window.GAME_CONFIG;
  const grid = document.getElementById("tasks-grid");
  const template = document.getElementById("task-template");
  const countElement = document.getElementById("progress-count");
  const barElement = document.getElementById("progress-bar");
  const resetButton = document.getElementById("reset-game");
  const dialog = document.getElementById("completion-dialog");
  const closeDialogButton = document.getElementById("close-dialog");

  const normalizeCode = (value) => value.trim().toUpperCase();

  const loadProgress = () => {
    try {
      const raw = localStorage.getItem(config.storageKey);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      console.warn("Could not load progress:", error);
      return {};
    }
  };

  let progress = loadProgress();

  const saveProgress = () => {
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(progress));
    } catch (error) {
      console.warn("Could not save progress:", error);
    }
  };

  const updateProgressPanel = (showCompletion = false) => {
    const solvedCount = config.tasks.filter((task) => progress[task.id]).length;
    countElement.textContent = String(solvedCount);
    barElement.style.width = `${(solvedCount / config.tasks.length) * 100}%`;

    if (showCompletion && solvedCount === config.tasks.length && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
  };

  const setSolvedState = (card, input, button, message, task) => {
    card.classList.add("solved");
    card.querySelector(".task-card__status").textContent = "COMPLETED";
    input.value = task.code;
    input.disabled = true;
    button.disabled = true;
    button.textContent = "APPROVED";
    message.textContent = "Correct code. Task completed.";
    message.className = "code-message success";
  };

  const renderTasks = () => {
    grid.innerHTML = "";

    config.tasks.forEach((task) => {
      const node = template.content.cloneNode(true);
      const card = node.querySelector(".task-card");
      const form = node.querySelector(".code-form");
      const input = node.querySelector(".code-input");
      const button = node.querySelector(".code-button");
      const message = node.querySelector(".code-message");

      card.dataset.taskId = task.id;
      node.querySelector(".task-number").textContent = task.number;
      node.querySelector(".task-title").textContent = task.title;
      node.querySelector(".task-subtitle").textContent = task.subtitle;
      node.querySelector(".task-description").textContent = task.description;
      input.setAttribute("aria-label", `Final code for ${task.title}`);

      if (progress[task.id]) {
        setSolvedState(card, input, button, message, task);
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (progress[task.id]) return;

        const answer = normalizeCode(input.value);
        const expected = normalizeCode(task.code);

        if (!answer) {
          message.textContent = "Enter the final code first.";
          message.className = "code-message error";
          input.focus();
          return;
        }

        if (answer === expected) {
          progress[task.id] = true;
          saveProgress();
          setSolvedState(card, input, button, message, task);
          updateProgressPanel(true);
        } else {
          message.textContent = "Incorrect code. Check the task and try again.";
          message.className = "code-message error";
          form.classList.remove("shake");
          void form.offsetWidth;
          form.classList.add("shake");
          input.select();
        }
      });

      grid.appendChild(node);
    });
  };

  resetButton.addEventListener("click", () => {
    const confirmed = window.confirm("Reset all completed tasks on this device?");
    if (!confirmed) return;
    progress = {};
    saveProgress();
    renderTasks();
    updateProgressPanel(false);
  });

  closeDialogButton.addEventListener("click", () => {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  });

  renderTasks();
  updateProgressPanel(false);
})();
