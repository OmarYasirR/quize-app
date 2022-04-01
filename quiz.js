let sideBar = document.querySelector(".side-bar");
let sideBarCont = document.querySelector(".side-bar-cont");
let handler = document.querySelector(".handler");
let overLeay = document.querySelector(".over-leay");
let inp = document.querySelector(".over-leay input");
let startBtn = document.querySelector(".over-leay button");
let correctAnswer = document.querySelector(".correct-answer");
let minunte = document.querySelector(".minutes");
let second = document.querySelector(".seconds");
let incorctCount = document.querySelector(".incrAnsCount");
let playerName = document.querySelector(".player span");
let no = document.querySelector(".no");
let ques = document.querySelector(".question");
let answers = document.querySelector(".answers");
let click = document.querySelector(".click");
let success = document.querySelector(".success");
let wrong = document.querySelector(".Wrong");
let qustions = []
const getData = async () => {
    const response = await fetch("./quiz.json")
    const data = await response.json()
		// qustions = data
		// console.log(data)
		return data
}
getData()
  .then(data => qustions = data)
	.then(() => {
		let answersArr = [...answers.children];
		let minutes;
		let seconds;
		let timing = true;
		let player;
		let detlsArr = [];
		let incrctNum = 0;
		let crctNum = 0;
		let queslenght = qustions.length;
		let currentIndex = 0;
		let currQustion = qustions[currentIndex];
		let selactedAns = "";
		let crctIndex = "";
		let classIncrtHandler = "";
		let clearCount;
		
		if (window.localStorage.getItem("details")) {
				detlsArr = JSON.parse(window.localStorage.getItem("details"));
		}
		
		incorctCount.innerHTML = incrctNum;
		no.innerHTML = currentIndex + 1;
		ques.innerHTML = currQustion.question;
		let shflIndexs = [];
		
		startBtn.onclick = function () {
				if (inp.value) {
						player = inp.value;
				} else {
						player = "Unknown";
				}
				playerName.innerHTML = player;
				overLeay.style.display = "none";
				countdawon(300);
		};
		
		// ---Side bar---
		document.querySelector(".side-bar .i").onclick = function () {
				sideBar.classList.remove("translate");
		};
		
		handler.onclick = function () {
				sideBar.classList.toggle("translate");
		};
		
		// Add player info to detlsArr
		function addDtlsArr() {
				let crntDtls = {
						id: Date(),
						plyrName: player,
						time: `${minutes} : ${seconds}`,
						correctAnswer: crctNum,
						incorrectAnswers: incrctNum,
				};
				detlsArr.push(crntDtls);
		}
		// function to add array to local storge
		function addDtlsToSrge(detls) {
				window.localStorage.setItem("details", JSON.stringify(detls));
		}
		//function to get player details from local storge and append them to DOM
		function addDtlsToSideBar() {
				if (window.localStorage.getItem("details")) {
						sideBarCont.innerHTML = "";
						let newdetlsArr = JSON.parse(window.localStorage.getItem("details"));
						newdetlsArr.forEach((item, i) => {
								//create delete span
								let deltSpan = document.createElement("span");
								deltSpan.className = "delet";
								deltSpan.appendChild(document.createTextNode("delete"));
								//create img tag with src
								let img = document.createElement("img");
								img.setAttribute("src", "images/skells.jpg");
								//create player name div
								let playerName = document.createElement("div");
								playerName.className = "name";
								playerName.appendChild(document.createTextNode("player: "));
								let playerNameSpn = document.createElement("span");
								playerNameSpn.appendChild(document.createTextNode(item.plyrName));
								playerName.appendChild(playerNameSpn);
		
								//create time div
								let time = document.createElement("div");
								time.appendChild(document.createTextNode("time: "));
								let timeSpn = document.createElement("span");
								timeSpn.appendChild(document.createTextNode(item.time));
								time.appendChild(timeSpn);
		
								//create correct answer div
								let correctAnswer = document.createElement("div");
								correctAnswer.appendChild(
										document.createTextNode("correct answers: ")
								);
								let correctSpn = document.createElement("span");
								correctSpn.appendChild(document.createTextNode(item.correctAnswer));
								correctAnswer.appendChild(correctSpn);
		
								//create incorrect answer div
								let incorrctAns = document.createElement("div");
								incorrctAns.appendChild(
										document.createTextNode("incorrect answers: ")
								);
								let incorrectSpn = document.createElement("span");
								incorrectSpn.appendChild(
										document.createTextNode(item.incorrectAnswers)
								);
								incorrctAns.appendChild(incorrectSpn);
		
								//create box number
		
								let num = document.createElement("span");
								num.className = "num";
								num.appendChild(document.createTextNode(i + 1));
								//create details div and append player details in it
								let detls = document.createElement("div");
								detls.className = "detls";
								detls.setAttribute("data-set", item.id);
								detls.appendChild(deltSpan);
								detls.appendChild(img);
								detls.appendChild(playerName);
								detls.appendChild(time);
								detls.appendChild(correctAnswer);
								detls.appendChild(incorrctAns);
								detls.appendChild(num);
		
								//append details to side bar
								sideBarCont.appendChild(detls);
						});
				}
		}
		addDtlsToSideBar();
		
		// Delete Item form Side Bar
		function dele(id) {
				let delArr = JSON.parse(window.localStorage.getItem("details"));
				delArr = delArr.filter((item) => {
						return item.id != id;
				});
				addDtlsToSrge(delArr);
				sideBarCont.innerHTML = "";
				addDtlsToSideBar();
		}
		sideBarCont.addEventListener("click", (e) => {
				if (e.target.classList.contains("delet")) {
						dele(e.target.parentElement.getAttribute("data-set"));
				}
		});
		//_______________________
		
		//Function to showing Popup For User Depending on His Answers
		function crntplyer() {
				let playerDetls = document.createElement("div");
				playerDetls.className = "player-detls";
		
				let h3 = document.createElement("h3");
				h3.appendChild(
						document.createTextNode(
								timing && incrctNum < 9 ? "you win" : "you lose"
						)
				);
				playerDetls.appendChild(h3);
		
				let rate = document.createElement("span");
				rate.appendChild(
						document.createTextNode(
								timing && incrctNum < 3
										? "congratuletions"
										: timing && incrctNum < 5
										? "exland"
										: timing && incrctNum < 8
										? "good"
										: !timing
										? "time is over"
										: incrctNum < 10
										? "too math worng answers"
										: ""
						)
				);
		
				let info = document.createElement("div");
				info.className = "info";
		
				//create img tag with src
				let img = document.createElement("img");
				img.setAttribute("src", "images/skells.jpg");
				//create player name div
				let playerName = document.createElement("div");
				playerName.appendChild(document.createTextNode("player: "));
				let playerNameSpn = document.createElement("span");
				playerNameSpn.appendChild(document.createTextNode(player));
				playerName.appendChild(playerNameSpn);
		
				//create time div
				let time = document.createElement("div");
				time.appendChild(document.createTextNode("time: "));
				let timeSpn = document.createElement("span");
				timeSpn.appendChild(document.createTextNode(`${minutes} : ${seconds}`));
				time.appendChild(timeSpn);
		
				//create correct answer div
				let correctAnswer = document.createElement("div");
				correctAnswer.appendChild(document.createTextNode("correct answers: "));
				let correctSpn = document.createElement("span");
				correctSpn.appendChild(document.createTextNode(crctNum));
				correctAnswer.appendChild(correctSpn);
		
				//create incorrect answer div
				let incorrctAns = document.createElement("div");
				incorrctAns.appendChild(document.createTextNode("incorrect answers: "));
				let incorrectSpn = document.createElement("span");
				incorrectSpn.appendChild(document.createTextNode(incrctNum));
				incorrctAns.appendChild(incorrectSpn);
		
				//create details div and append player details in it
				let detls = document.createElement("div");
				detls.className = "detls";
				detls.appendChild(img);
				detls.appendChild(playerName);
				detls.appendChild(time);
				detls.appendChild(correctAnswer);
				detls.appendChild(incorrctAns);
				info.appendChild(detls);
		
				let btn = document.createElement("button");
				btn.appendChild(document.createTextNode("play again"));
				btn.className = "btn";
				playerDetls.appendChild(h3);
				playerDetls.appendChild(rate);
				playerDetls.appendChild(info);
				playerDetls.appendChild(btn);
				playerDetls.style.backgroundColor =
						timing && incrctNum < 3
								? "gold"
								: timing && incrctNum < 5
								? "chartreuse"
								: timing && incrctNum < 8
								? "darkturquoise"
								: !timing || incrctNum < 10
								? "brown"
								: "";
				document.querySelector(".app-container").appendChild(playerDetls);
				Sounds()
		}
		
		document.addEventListener("click", (e) => {
				e.target.className === "btn" ? location.reload() : false;
		});
		
		//Sounds Effects
		function Sounds() {
				timing && incrctNum < 9 ? document.querySelector(".tada").play() : document.querySelector(".gm-over").play()
		
		}
		
		//__________________________
		
		function countdawon(duration) {
				clearCount = setInterval(() => {
						minutes = Math.floor(duration / 60);
						seconds = Math.floor(duration % 60);
						minutes = minutes < 10 ? `0${minutes}` : minutes;
						seconds = seconds < 10 ? `0${seconds}` : seconds;
						if (--duration < 0) {
								clearInterval(clearCount);
								sideBarCont.innerHTML = "";
								timing = false;
								crntplyer();
								answers.classList.add("diseable");
								addDtlsArr();
								addDtlsToSrge(detlsArr);
								addDtlsToSideBar();
						}
						minunte.innerHTML = minutes;
						second.innerHTML = seconds;
						if (minutes < 1 && seconds < 1) {
						}
				}, 1000);
		}
		//--------Questions And Answers--------
		
		//Generate shuffling indexs
		function shuffling() {
				shflIndexs = [];
				let uniqInx = new Set();
				while (uniqInx.size < answersArr.length) {
						uniqInx.add(Math.floor(Math.random() * answersArr.length));
				}
				uniqInx.forEach((el) => shflIndexs.push(el));
		}
		
		answersInit();
		
		//Get data answers from array And shuffling them
		function answersInit() {
				shuffling();
				let allAnswers = qustions[currentIndex].incorrect_answers;
				allAnswers.push(qustions[currentIndex].correct_answer);
				let shuffleAns = [];
				for (let i = 0; i < allAnswers.length; i++) {
						shuffleAns.push(allAnswers[shflIndexs[i]]);
				}
				answersArr.forEach((ans, i) => {
						ans.innerHTML = shuffleAns[i];
				});
		}
		
		//Navigate through questions
		function navigating() {
				if (incrctNum == 9) {
						crntplyer();
						clearInterval(clearCount);
						answers.classList.add("diseable");
						addDtlsArr();
						addDtlsToSrge(detlsArr);
						addDtlsToSideBar();
				}
				if (currentIndex < queslenght - 1 && timing && incrctNum < 9) {
						currentIndex++;
						no.innerHTML = currentIndex + 1;
						currQustion = qustions[currentIndex];
						ques.innerHTML = currQustion.question;
						answersInit();
						selactedAns.classList.remove("incorrect");
						selactedAns.classList.remove("selacted");
						selactedAns.classList.remove("correct");
						clearInterval(classIncrtHandler);
						answersArr[crctIndex].classList.remove("correct");
						answersArr.forEach((ans, i) => {
								if (ans.innerHTML == qustions[currentIndex].correct_answer) {
										crctIndex = i;
								}
						});
				}
		}
		
		function submiting() {
				selactedAns.classList.remove("selacted");
				if (currentIndex < queslenght - 1) {
						answers.classList.remove("diseable");
				} else {
						setTimeout(() => {
								crntplyer();
								addDtlsArr();
								addDtlsToSrge(detlsArr);
								addDtlsToSideBar();
						}, 3000);
				}
		
				if (selactedAns.innerHTML == qustions[currentIndex].correct_answer) {
						selactedAns.setAttribute("class", "correct");
						crctNum++;
						correctAnswer.innerHTML = crctNum;
						success.play();
				} else {
						wrong.play();
						incrctNum++;
						incorctCount.innerHTML = incrctNum;
						answersArr[crctIndex].setAttribute("class", "correct");
						classIncrtHandler = setInterval(() => {
								selactedAns.setAttribute("class", "incorrect");
								setTimeout(() => {
										selactedAns.classList.remove("incorrect");
								}, 300);
						}, 700);
				}
		}
		
		answersArr.forEach((ans, i) => {
				if (currentIndex !== queslenght - 1) {
						if (ans.innerHTML == qustions[currentIndex].correct_answer) {
								crctIndex = i;
						}
						ans.addEventListener("click", function () {
								answers.classList.add("diseable");
								ans.setAttribute("class", "selacted");
								selactedAns = ans;
								setTimeout(() => {
										submiting();
								}, 1000);
								setTimeout(() => {
										navigating();
								}, 4500);
								click.play();
						});
				} else {
						answers.classList.add("diseable");
				}
		});
		
	})
	.catch(err => console.error("error"))
