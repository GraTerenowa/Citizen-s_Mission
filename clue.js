(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const taskId = params.get("task");
  const clue = window.CLUE_CONFIG && window.CLUE_CONFIG[taskId];
  const number = document.getElementById("clue-number");
  const title = document.getElementById("clue-title");
  const text = document.getElementById("clue-text");

  if (!clue) {
    number.textContent = "INVALID FILE";
    title.textContent = "ACCESS ERROR";
    text.textContent = "This QR code does not contain a valid task identifier. Return to the game and scan the code again.";
    text.classList.add("clue-error");
    document.title = "Access Error // Nowa Huta";
    return;
  }

  number.textContent = `TASK ${clue.number} // EXTRA CLUE`;
  title.textContent = clue.title;
  text.textContent = clue.text;
  document.title = `${clue.title} // Additional Information`;
})();
