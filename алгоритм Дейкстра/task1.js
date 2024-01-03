let fs = require('fs');
let priority = new Object();
let mem = new Array();
let stack = new Array();
let deik = new Array();
let last;
inText = fs.readFileSync('input.txt');
inText = inText.toString();
mem = inText.split('');
priority["+"] = 0;
priority["-"] = 0;
priority["*"] = 1;
priority["/"] = 1;
priority["^"] = 2;
for(let i = 0; i < mem.length; i++){
	if(mem[i] == "("){
		stack.push("(");
		continue;
	}
	if(mem[i] == ")"){
		if(stack.length == 0){
		console.log("Неправильная запись");
			return;
		}
		while(last != "("){
			last = stack.pop();
			if (last == "("){
				break;
			}
			deik.push(last);
			if(last != "(" && stack.length == 0){
				console.log("Неправильная запись");
				return;
			}
		}
		last = undefined;
		continue;
	}
	if(/^\d$/.test(mem[i])){
		deik.push(mem[i]);
		continue;
	}
	if(stack.length != 0 && priority[mem[i]] <= priority[stack[stack.length - 1]]){
		while(stack.length != 0 && priority[stack[stack.length - 1]] >= priority[mem[i]]){
			last = stack.pop();
			deik.push(last);
		}
		stack.push(mem[i]);
		continue;
	}
	if(stack.length == 0 || (priority[mem[i]] > priority[stack[stack.length - 1]]) || stack[stack.length - 1] == "("){
		stack.push(mem[i]);
	}
}
while(stack.length != 0){
	deik.push(stack.pop());
}
console.log("Польская запись:" + deik.join(''));
for(let i = 0; i < deik.length; i++){
	if(/^\d$/.test(deik[i])){
		stack.push(parseInt(deik[i]));
		
	}
	if(deik[i] == "+"){
		stack[stack.length - 2] = stack[stack.length - 1] + stack[stack.length - 2];
		stack.splice(stack.length - 1, 1);
	}
	if(deik[i] == "-"){
		stack[stack.length - 2] = stack[stack.length - 2] - stack[stack.length - 1];
		stack.splice(stack.length - 1, 1);
	}
	if(deik[i] == "/"){
		stack[stack.length - 2] = stack[stack.length - 2] / stack[stack.length - 1];
		stack.splice(stack.length - 1, 1);
	}
	if(deik[i] == "*"){
		stack[stack.length - 2] = stack[stack.length - 2] * stack[stack.length - 1];
		stack.splice(stack.length - 1, 1);
	}
	if(deik[i] == "^"){
		stack[stack.length - 2] = stack[stack.length - 2] ** stack[stack.length - 1];
		stack.splice(stack.length - 1, 1);
	}
}
console.log(stack[0]);
let ev = mem.join('');
console.log("Проверка методом eval():" + eval(ev));