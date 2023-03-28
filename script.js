// Подключаемся к контракту
const contractAddress = "0x4D5c96d308D535f62d03d70c6C93c13876177E90"; //Замените вашим контрактом

// Указываем ABI (Application Binary Interface) контракта
const abi = 
[
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isWinner",
				"type": "bool"
			}
		],
		"name": "GamePlayed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_option",
				"type": "uint16"
			}
		],
		"name": "play",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
]
;

// Подключаемся к web3 провайдеру (метамаск)
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

//Запрашиваем аккаунты пользователя и подключаемся к первому аккаунту
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    //Создаем объект контракта
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);
  });
});

async function play(option) {
    const result = await contract.play(option);
    console.log(result); 
	if(result) win();
	else lose();
  }








let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

function convertToWord(letter){
    if(letter === 'r') return 'Rock';
    if(letter === 'p') return 'Paper';
    return 'Scissors';
}

function win() {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `You win!`;
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `You lost...`;
}

function game(userChoice){
    switch(userChoice){
        case 'p': play(0); break;
        case 'r': play(1); break;
        case 's': play(2);      
    }
}

function main(){

    rock_div.addEventListener('click', function(){
        game('r');
    })

    paper_div.addEventListener('click', function(){
        game('p');
    })

    scissors_div.addEventListener('click', function(){
        game('s');
    })
    
}

main();