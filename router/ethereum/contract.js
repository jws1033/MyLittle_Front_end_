const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const address = "0x96491D2d347A7c07e2C08BEd8a7AF1a4Ad8FdC2f";

const abi =[
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "querySurvey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "createAt",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "surveyNum",
						"type": "string[]"
					},
					{
						"internalType": "string[]",
						"name": "surveyResult",
						"type": "string[]"
					}
				],
				"internalType": "struct myLittleDoctor.survey[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "createAt",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "surveyNum",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "surveyResult",
				"type": "string[]"
			}
		],
		"name": "saveSurvey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, address);
module.exports = contract;
