class Calculator {
	constructor(prevOp,curOp){
		this.prevOp=prevOp
		this.curOp=curOp
		this.clear()
	}



	addNumber(number){
		number==='.' && this.currOperand.includes('.') ?  null 
		:this.currOperand= this.currOperand.toString() + number.toString()
		
	}
	choooseOperation(operation){
		if (this.currOperand==='') return 
		if (this.prevOperand !==''){
			this.compute()
		}
		

		this.operation = operation
		this.prevOperand=this.currOperand
		this.currOperand=''

	}
	compute(){
		let result 
		const prev=parseFloat(this.prevOperand) 
		const cur =parseFloat(this.currOperand)
		
		if (isNaN(prev) || isNaN(cur)) return null
		switch (this.operation){
			case '+':
				 result = prev + cur
				break
			case '-':
				result= prev - cur
				break
			case '÷':
				result= prev / cur
				break
			case '*':
				result= prev * cur
				break
			default : 
				result= 'nothiing'				

		}
		
		
		this.currOperand=result
		this.operation=undefined
		this.prevOperand=''



	}
	getDisplayFormat(number) {
		let stringNumber = number.toString()
		let intergerDigits = parseFloat(stringNumber.split('.')[0])
		let decimalDigits = stringNumber.split('.')[1]
		let integerDisplay 
		if (isNaN(intergerDigits)) {
			integerDisplay=''
		}else {
			integerDisplay=intergerDigits.toLocaleString('en')
		}
		if (decimalDigits != null){
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
		// let floatNumber = parseFloat(number)
		// if (isNaN(floatNumber)) return null
		// return floatNumber.toLocaleString('en')	
	}

	updateDisplay(){
		this.curOp.textContent= this.getDisplayFormat(this.currOperand)
		if (this.operation){
			this.prevOp.textContent= ` ${ this.getDisplayFormat(this.prevOperand)} ${this.operation}`
		} else {
			this.prevOp.textContent = ''
		}

		

	}

	delete(){
		this.currOperand= this.currOperand.toString().slice(0,-1)
	}
	clear(){
		this.currOperand =''
		this.prevOperand = ''
		this.operation = undefined

	}		
}  

const number= document.querySelectorAll(".number")
const  operand = document.querySelectorAll(".operand")
const equal = document.querySelector(".Eq")
const prevOp= document.querySelector(".PO")
const curOp = document.querySelector(".CO")
const del = document.querySelector(".del")
const allClear = document.querySelector(".all-clear")

const calculator= new Calculator(prevOp,curOp)
number.forEach(button=>{
	button.addEventListener("click",function(event){
		calculator.addNumber(button.textContent)
		
		calculator.updateDisplay()
	})
})


allClear.addEventListener("click",function(){
	calculator.clear()
	calculator.updateDisplay()
})


operand.forEach(btn=>{
	btn.addEventListener("click",function(){
		
		calculator.choooseOperation(this.textContent)
		calculator.updateDisplay()
	})
})

equal.addEventListener("click",function(){
	calculator.compute()
	calculator.updateDisplay()
})

del.addEventListener("click",function(){
	calculator.delete()
	calculator.updateDisplay()
})



