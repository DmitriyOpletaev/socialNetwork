export function updateObjectInArray(items:any, itemId:any,
                                    objPropName:any, newObjProps:any){
    return items.map((u:any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })

}

//???????????????
export const deepCopyFunction = (inObject:any) => {
    let outObject, value, key

    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
        value = inObject[key]
        debugger
        // Recursively (deep) copy for nested objects, including arrays
        // @ts-ignore
        outObject[key] = deepCopyFunction(value)
    }

    return outObject
}