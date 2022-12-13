export type Package = (number|Package)[]
/*
   * If both values are integers,
   * If the left integer is lower than the right integer, the inputs are in the right order.
   * If the left integer is higher than the right integer, the inputs are not in the right order.
   * Otherwise, the inputs are the same integer; continue checking the next part of the input.
*
   * If both values are lists,
   * compare each value at a time
   * If the left list runs out of items first, the inputs are in the right order
   *  If the right list runs out of items first, the inputs are not in the right order
   * If the lists are the same length and no comparison makes a decision about the order
*
   * If exactly one value is an integer
   * convert the integer to a list which contains that integer as its only value
   * then retry the comparison
*/
export function correctOrder(left: Package, right: Package): boolean|undefined {
    let index = 0;
    while(index < left.length && index < right.length){
        if(!Array.isArray(left[index]) && !Array.isArray(right[index])){
            if(left[index] < right[index]) return true;
            if(left[index] > right[index]) return false;
        } else {
            const subResult = correctOrder(
                // @ts-ignore
                Array.isArray(left[index]) ? left[index] : [left[index]],
                Array.isArray(right[index]) ? right[index] : [right[index]],
            )
            if(typeof subResult === 'boolean') {
                return subResult;
            }
        }
        index++;
    }
    return left.length < right.length ? true : left.length > right.length ? false : undefined
}