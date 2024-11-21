$(document).ready(function () {
  const words = [
    { word: "Always", translation: "завжди" },
    { word: "Sometimes", translation: "іноді" },
    { word: "Never", translation: "ніколи" },
    { word: "Often", translation: "часто" },
    { word: "Rarely", translation: "рідко" },
    { word: "Usually", translation: "зазвичай" },
    { word: "Quickly", translation: "швидко" },
    { word: "Slowly", translation: "повільно" },
    { word: "Happy", translation: "щасливий" },
    { word: "Sad", translation: "сумний" },
  ];

  let shuffledWords = [];
  let currentIndex = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startGame() {
    shuffledWords = shuffleArray([...words]);
    currentIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    $("#correct").text("");
    $("#incorrect").text("");
    $("#result-modal").hide();
    showWord();
  }

  function showWord() {
    const currentWord = shuffledWords[currentIndex];
    $("#word").text(currentWord.word);
    $("#translation").val("");
    $("#step").text(currentIndex + 1);
  }

  function checkAnswer(event) {
    if (event.key === "Enter") {
      const input = $("#translation").val().trim().toLowerCase();
      const correct = shuffledWords[currentIndex].translation.toLowerCase();
      if (input === correct) {
        correctAnswers++;
        $("#correct").append("✔ ");
      } else {
        incorrectAnswers++;
        $("#incorrect").append("✘ ");
      }
      currentIndex++;
      if (currentIndex < shuffledWords.length) {
        showWord();
      } else {
        showResult();
      }
    }
  }

  function showResult() {
    const total = shuffledWords.length;
    const score = (correctAnswers / total) * 100;
    $("#result").text(`Ваш рівень знань: ${score.toFixed(2)}%`);
    $("#result-modal").fadeIn();
  }

  $("#restart").click(startGame);

  $(document).on("keydown", checkAnswer);

  startGame();
});