const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// 안내 글 뜨게만들기
console.log('컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!')

// 랜덤 숫자 만들기
let random = new Array(3);
for (i = 0; i < random.length; i++) {
    let num = Math.floor(Math.random() * 10); // 난수생성
    random[i] = num;
    for (j = 0; j < i; j++) {
        if (random[j] === random[i]) {
            i--;
        }
    }
} // 난수의 일부 숫자가 같으면 다른 난수 생성
console.log(random); // 난수 값 확인


// 입력받기
let time = 0;

rl.on('line', (data) => {
    let input = [];
    input.push(data.split('').map(Number)); // 문자열을 숫자열로 변환
    //console.log (input); // **배열 하나 어떻게 벗기지?** .join('') // [...] -> 함수안에서만

    time += 1;
    console.log(`${time}번째 시도 :`, data);

    // 자리마다 볼, 스트라이크 판단하는 부분 구현하기
    let ball = 0;
    let strike = 0;

    for (i = 0; i < random.length; i++) {
        for (j = 0; j < random.length; j++) {
            if (input[0][i] === random[j] && i === j) {
                strike += 1;
            } else if (input[0][i] === random[j] && i !== j) {
                ball += 1;
            }
        }
    }
    
    // 판단 표현하기
    if (ball === 0 && strike !== 0) {
        console.log(`${strike}S`);
    } else if (strike === 0 && ball !== 0 ) {
        console.log(`${ball}B`);
    } else {
        console.log(`${ball}B${strike}S`); 
    }

    // 맞출때까지 게임 돌아가고, 맞추면 정지
    if (strike === 3) { 
        rl.close();
    }
})


// 게임 종료
rl.on('close', () => {
    console.log(`${time}번만에 맞히셨습니다.`);
    console.log('게임을 종료합니다.');
})
