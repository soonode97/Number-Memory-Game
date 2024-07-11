let create_count = 1;
let number;
let record_list = [];
let result;
let score;
let timer;

function startGame() {
  $("#thisNumber").empty();
  $('#result_box').empty();

  number = Math.floor(Math.random() * 9000) + 1000; // 1000~9999 숫자 랜덤 생성
  $("#start_btn").attr("disabled", true);
  $("#check_btn").attr("disabled", true);
  $("#input_box").value = 0;
  $("#input_box").attr("disabled", true);

  let temp_html = ``;
  temp_html = `<p id="mynumber">${number}</p>`;
  $("#thisNumber").append(temp_html);

  setTimeout(hideNumber, 3000); // 3초 후 숫자 숨기기
}

function startCountdown(seconds) {
  let remaining = seconds;
  $('#timer').append(`<p>남은 시간: ${remaining}초</p>`);
  timer = setInterval(() => {
    $('#timer').empty();
    remaining--;
    $('#timer').append(`<p>남은 시간: ${remaining}초</p>`);;
    score = parseInt(remaining)*10;
    if (remaining == 0) {
      clearInterval(timer);
      $('#timer').empty();
      checkAnswer(false); // 시간이 다 되면 오답 처리
    }
  }, 1000);
}

function hideNumber() {
  $("#thisNumber").empty();
  $("#input_box").attr("disabled", false);
  $("#check_btn").attr("disabled", false);

  startCountdown(5);
}

// 
function submitAnswer() {
  clearInterval(timer);
  let userAnswer = $("#input_box").val();
  const isCorrect = userAnswer == number;
  checkAnswer(isCorrect);
}

function checkAnswer(isCorrect) {
  let temp_html = ``;
  if (isCorrect == true) {
    result = "정답";
    temp_html = `<p id="myresult">정답입니다!</p>`;
  } else {
    score=0;
    result = "오답";
    temp_html = `<p id="myresult">오답입니다! 정답은 ${number} 입니다!</p>`;
  }
  $("#result_box").append(temp_html);
  pushRecord();
  create_count++;
  $('#timer').empty();
  $("#start_btn").attr("disabled", false);
}

function pushRecord() {
  const doc = {
    '회차': create_count,
    "생성된 숫자": number,
    '결과': result,
    '점수': score,
  };
  record_list.push(doc);

  temp_html = `
            <tr>
                <th scope="row">${create_count}</th>
                <td>${number}</td>
                <td>${result}</td>
                <td>${score}</td>
            </tr>
        `;

  $("#gameRecords").append(temp_html);
}

// function activate_create_btn() {
//   pushRecord();
//   $("#create_btn").attr("disabled", false);
// }

// function checkNumber() {
//   $("#box_result").empty();
//   let inputNumber = $("#inputNumber").val();
  
// }
