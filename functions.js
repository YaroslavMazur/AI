export function normVector(vector){
    return vector.map((num) => num / Math.max(...vector));
}

export function getAvgVector(x1,x2){
    
    return x1.map((obj, index)=> (obj + x2[index])/2); 
}

export function getDistance(x1, x2){

    let distance = 0;

    for(let i = 0; i < x1.length;i++){
        distance += Math.abs(x1[i] - Math.pow(x2[i], 2));  
    }

    return distance;
}