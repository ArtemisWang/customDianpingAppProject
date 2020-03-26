
function add(num) {
    let sum=0
	return function(num){
    	sum+=num
    }
}

console.log(add(1) (2) (3) (4)());