// 深拷贝
export function deepCopy(object) {
    let target = Array.isArray(object) ? [] : {};
    if (object && typeof object === 'object') {
        for (let key in object) {
            // @ts-ignore
            if (Object.hasOwn(object, key)) {
                // @ts-ignore
                if (object[key] && typeof object[key] === 'object') {
                    // @ts-ignore
                    target[key] = deepCopy(object[key]);
                }
                else {
                    // @ts-ignore
                    target[key] = object[key];
                }
            }
        }
    }
    return target;
}
