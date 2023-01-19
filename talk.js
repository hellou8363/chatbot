const inMsg = document.getElementById("inMsg");
const outMsg = document.getElementById("outMsg");
const bgImg = document.getElementById("botImg");
const chatData = [
  // 단일 메시지
  {
    question: "안녕",
    answer: "안녕하세요오옹~",
    bgImg: "default",
  },
  {
    question: "이름",
    answer: "라봉이에요오옹~",
    bgImg: "default",
  },
  {
    question: "미안",
    answer: "괜차나요옹~",
    bgImg: "default",
  },
  {
    question: "고마워",
    answer: "고마움의 표현은 입금으로 ♥_♥",
    bgImg: "twinkle",
  },
  {
    question: "숨바꼭질",
    answer: "좋아요-!!",
    bgImg: "twinkle",
  },
  // 단일 메시지 + 이중 이미지
  {
    question: "바보",
    answer: "나 안해.. 삐짐..",
    bgImg: "iwont",
  },
  {
    question: "숨어",
    answer: "나 찾아봐라~♬",
    bgImg: ["find1", "find2", "find3"],
  },
  {
    question: "찾았다",
    answer: "에잉.. 들켜버렸네..",
    bgImg: "iwont",
  },
];

document.getElementById("outMsg").innerText =
  "통통 튀는 매력의 라봉이와 대화 해봐요-!!";

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.id == "send") {
    check();
  }
  if (target.id == "help") {
    let pop = document.getElementById("pop");
    if (pop.style.display == "none") {
      pop.style.display = "inline";
    } else {
      pop.style.display = "none";
    }
  }
});

let input;
let lightOn = true;

const check = () => {
  let isfind = false;
  input = inMsg.value;
  inMsg.value = "";
  // 단일 메시지 처리
  for (let i = 0; i < chatData.length; i++) {
    // 단일 메시지 + 이중 이미지 처리
    if (input.includes(chatData[i].question)) {
      if (chatData[i].question == "바보" || chatData[i].question == "찾았다") {
        outMsg.innerText = chatData[i].answer;
        doubleImg(chatData[i].bgImg);
        isfind = true;
        return;
      }
      if (chatData[i].question == "숨어") {
        outMsg.innerText = chatData[i].answer;
        bgImg.style.background =
          "url(./img/" + chatData[i].bgImg[random() - 1] + ".png) no-repeat";
        bgImg.style.backgroundSize = "contain";
        isfind = true;
        return;
      } else {
        outMsg.innerText = chatData[i].answer;
        bgImg.style.background =
          "url(./img/" + chatData[i].bgImg == undefined
            ? "default"
            : chatData[i].bgImg + ".png) no-repeat";
        bgImg.style.backgroundSize = "contain";
        isfind = true;
      }
    }
  }
  // 랜덤 메시지 + 붙여/띄어쓰기 입력 처리
  if (input.includes("불") && input.includes("꺼")) {
    if (!lightOn) {
      outMsg.innerText = "이미 불이 꺼져 있는데요?";
      what();
      isfind = true;
    } else {
      switch (random()) {
        case 1:
          outMsg.innerText = "네? 뭐라고 하셨어요?";
          what();
          isfind = true;
          break;
        case 2:
          outMsg.innerText = "??????????";
          what();
          isfind = true;
          break;
        case 3:
          outMsg.innerText = "넵!!";
          lightOn = false;
          bgImg.style.background = "url(./img/default.png) no-repeat";
          bgImg.style.backgroundSize = "contain";
          document.body.style.background = "black";
          inMsg.style.color = "white";
          isfind = true;
          break;
      }
    }
  }
  // 이중 이미지 처리 1000ms
  if (input.includes("불") && input.includes("켜")) {
    if (lightOn) {
      outMsg.innerText = "이미 불이 켜져 있는데요?";
      what();
      isfind = true;
    } else {
      lightOn = true;
      outMsg.innerText = "불 켜져랏~ 얍-!!";
      bgImg.style.background = "url(./img/lightOn.png) no-repeat";
      bgImg.style.backgroundSize = "contain";
      setTimeout(() => {
        document.body.style.background = "white";
        bgImg.style.background = "url(./img/lightOnDone.png) no-repeat";
        bgImg.style.backgroundSize = "contain";
        inMsg.style.color = "black";
      }, 1000);
      isfind = true;
    }
  }
  if (!isfind) {
    return learn();
  }
};

let question = "";
let answer = "";
let learnStep = 0;

const learn = () => {
  if (learnStep == 0) {
    question = input;
    outMsg.innerText = "라봉이가 모르는 말이에요..";
    write();
    setTimeout(() => {
      outMsg.innerText =
        "어떻게 대답해야 하는지 알려줄래요?\n'응' or '아니'로 대답해주세요";
    }, 1500);
    learnStep = 1;
  }
  if (learnStep == 1) {
    if (input == "응") {
      outMsg.innerText = "좋아요!! 뭐라고 대답 할까요?";
      learnStep = 2;
      return;
    }
    if (input == "아니") {
      outMsg.innerText = "ㅠㅠ.. 다음엔 꼭 알려주세요!!";
      learnStep = 0;
    }
  }
  if (learnStep == 2) {
    answer = input;
    chatData.push({ question: `${question}`, answer: `${answer}` });
    outMsg.innerText = "다음에 또 물어보면 꼭 그렇게 대답할께요!!";
    learnStep = 0;
  }
};

const random = () => {
  return Math.floor(Math.random() * 3) + 1;
};

const what = () => {
  bgImg.style.background = "url(./img/what.png) no-repeat";
  bgImg.style.backgroundSize = "contain";
};

// 이중 이미지 처리 400ms
const doubleImg = (imgName) => {
  bgImg.style.background = "url(./img/" + imgName + ".png) no-repeat";
  bgImg.style.backgroundSize = "contain";
  setTimeout(() => {
    bgImg.style.background = "url(./img/" + imgName + "Done.png) no-repeat";
    bgImg.style.backgroundSize = "contain";
  }, 400);
};

// CDN
let active = false;
const app = document.getElementById("app");
const typewriter = new Typewriter(app, {
  loop: false,
});

const write = () => {
  if (!active) {
    active = true;
    if (!lightOn) {
      document.getElementById("app").style.color = "white";
    } else {
      document.getElementById("app").style.color = "black";
    }
    app.style.display = "block";
    typewriter
      .typeString("라봉이가 알아듣지 못하는 것 같다.")
      .pauseFor(1000)
      .deleteAll()
      .typeString("하단의 ? 버튼을 눌러서 키워드를 확인 해보자")
      .pauseFor(5500)
      .deleteAll()
      .start();
    setTimeout(() => {
      app.style.display = "none";
    }, 15000);
    setTimeout(() => {
      active = false;
    }, 17000);
  }
};
