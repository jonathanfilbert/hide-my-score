let isQuiz = false;
let quizUrl = "https://scele.cs.ui.ac.id/mod/quiz/";
let currentUrl = window.location.href;
let scoreXPath =
  "/html/body/div[3]/div/div/div/section/div/table/tbody/tr/td[4]";
let markPath = "/html/body/div[3]/div/div/div/section/div/table/tbody/tr/td[3]";
let scoreNumber = "";
let bodyText = document.body.textContent || document.body.innerText;
let summaryTablePath = "/html/body/div[3]/div/div/div/section/div/table";
const getElementByXPath = (path) => {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
};

// if the page contains this word (udah ada nilainya)
if (
  currentUrl.includes(quizUrl) &&
  bodyText.indexOf("Summary of your previous attempts") > -1
) {
  let nilai = getElementByXPath(scoreXPath);
  if (nilai) {
    let markScore = getElementByXPath(markPath);
    let summaryTable = getElementByXPath(summaryTablePath);
    let summaryTableOriginal = summaryTable.innerHTML;
    let markOriginal = markScore.innerHTML;
    let nilaiOriginal = nilai.innerHTML;
    let feedback = document.getElementById("feedback");
    let feedbackText = feedback.innerHTML;
    feedback.innerHTML = "???";
    markScore.innerHTML = "???";
    summaryTable.innerHTML = "???";
    let btn = document.createElement("button");
    btn.innerHTML = "Reveal Score";
    btn.id = "revealButton";
    summaryTable.replaceChild(btn, summaryTable.childNodes[0]);
    btn.addEventListener("click", function () {
      nilai.innerHTML = nilaiOriginal;
      feedback.innerHTML = feedbackText;
      markScore.innerHTML = markOriginal;
      summaryTable.innerHTML = summaryTableOriginal;
    });
  }
}
