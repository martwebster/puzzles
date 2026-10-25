export const getCharacterLengths = (data: string[]): number[] =>{
    return data.map(it => it.length);
}

export const getDecodedLengths = (data: string[]): number[] =>{
    return data.map(it => decode(it).length);
}

export const getTotal = (data: string[]): number =>{
    return getCharacterLengths(data).sum() - getDecodedLengths(data).sum()
}

export const decode = (data: string): string =>{
    const toDecode = data.substring(1).substringBeforeLast("\"")!
    let pos = 0;
    let result = "";
    while (pos < toDecode.length) {
        if (toDecode[pos] == "\\" && toDecode[pos+1] == "x"){
            result = result + "_"
            pos = pos + 4
        } else if (toDecode[pos] == "\\"){
            result = result + toDecode[pos+1];
            pos = pos + 2
        }
        else{
            result = result + toDecode[pos];
            pos += 1;
        }
    }
    return result;
}

// part 2
export const encode = (toEncode: string): string=> {
    let pos = 0;
    let result = "\"";
    while (pos < toEncode.length) {
        if (toEncode[pos] == '\\'){
            result = result + '\\\\'
        } else if (toEncode[pos] == '"'){
            result = result + '\\"'
        }
        else{
            result = result + toEncode[pos];
        }
        pos += 1;
    }
    return result + "\""
}

export const getEncodedLengths = (data: string[]): number[] =>{
    return data.map(it => encode(it).length);
}

export const getEncodingTotal = (data: string[]): number =>{
    return getEncodedLengths(data).sum() - getCharacterLengths(data).sum()
}