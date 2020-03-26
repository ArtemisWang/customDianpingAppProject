
function myAdd(num){
    let sum=0
    return add(num)
    function add(num) {
        if(num==null){
            return sum
        }
        sum+=num
        return add
    }
}


console.log(myAdd(1) (2) (3) (4)());
console.log(myAdd(1));