/**
 * Recieves a string of hex and converts it to a binary number.
 * @param {*} hex 
 * @returns 
 */
function convH2B(hex) {
    var binary = "";
    var x;
    var hexDigit; //to represent each digit of the hex

    hex = hex.toUpperCase();

    var conv = {
        '0': "0000",
        '1': "0001",
        '2': "0010",
        '3': "0011",
        '4': "0100",
        '5': "0101",
        '6': "0110",
        '7': "0111",
        '8': "1000",
        '9': "1001",
        'A': "1010",
        'B': "1011",
        'C': "1100",
        'D': "1101",
        'E': "1110",
        'F': "1111"
    };

    for (x = 0; x < hex.length; x++) {
        hexDigit = hex.charAt(x);
        if (conv[hexDigit] !== undefined){
            binary += conv[hexDigit];
        }
    }
    return binary;
}

/**
 * Recieves a string of binary and converts it to a decimal number.
*/
function BinToDec(binary, len){
    pt = binary.indexOf('.');

    if (pt == -1)
        pt = len;

    intDec = 0, fracDec = 0, twos = 1;

    // Convert integral part of binary to decimal
    // equivalent
    for(i = pt - 1; i >= 0; i--){
        intDec += (binary.charAt(i) - '0') * twos;
        twos *= 2;
    }

    // Convert fractional part of binary to
    // decimal equivalent
    twos = 2;
    for(i = pt + 1; i < len; i++){
        fracDec += (binary.charAt(i) - '0') / twos;
        twos *= 2.0;
    }

    // Add both integral and fractional part
    return intDec + fracDec;
}

/**
 * Converts a binary number to a decimal number.
 * @param {*} bin 
 * @returns 
 */
function Convert(bin){
    if(bin === "10000000000000000000000000000000"){
        return "-0.0";
    }
    if(bin === "00000000000000000000000000000000"){
        return "0.0";
    }
    if(bin === "11111111100000000000000000000000"){
        return "Negative Infinity";
    }
    if(bin === "01111111100000000000000000000000"){
        return "Positive Infinity";
    }
    // char[] p = new char[8];
    // char[] f = new char[152];
    var sign = false;   // false is positive true is negative
    var neg  = parseInt(bin[0],10);

    if(neg==1){
        sign = true;
    }
    var j = 0;
    p = "";
    for(i=1;i<9;i++){
        p[j] = bin[i];
        j++;
    }
    if(p === "11111111"){
        if(parseInt(bin[9],10)==1){
            return "qNaN";
        }
        else{
            return "sNaN";
        }
    }
    f = "";
    f[0] = '1';
    j=1;
    var power = parseInt(p,2) - 127;
    var pow = power+1;
    var len = 0;
    if (power <-126 && !sign )
    {
        return "denormalized";
    }
    else if(power<24&&power>-1){
        for(i=9;i<32;i++){
            if (pow==j){
                f[j] = '.';
                j++;
                i--;
            }

            else{
            f[j] = bin.charAt(i);
            j++;}
        }

        len = 25;
    } 
    else if(power <= -1){
        f[0]='.';
        len++;
        power++;
        while (power<=-1){
            f[len]='0';
            power++;
            len++;
        }
        f[len]='1';
        len++;
        for(i=9;i<32;i++){
                f[len] = bin.charAt(i);
                len++;
        }
    }
    else if (power >= 24){
        f[len]='1';
        len++;
        for(i=9;i<32;i++){
            f[len] = bin.charAt(i);
            len++;
        }
        power = power-23;
        while(power>0){
            f[len] = 0;
            power--;
            len++;
        }
        
    }
    var fractional = BinToDec(f,len);
    j=0;
    var out = "";
    if(sign){
        out = "-" + fractional;
    }
    else{
        out = fractional;
    }
    return out;
}

// change element to result id later
function copyValues() {
    var copyText = document.getElementById("resultMessage").innerHTML;

    copyText.select();
    document.execCommand("copy");
    //document.getElementById("resultMessage").innerHTML ="Copied the text: "
   // + copyText;

}

function main(){
    //1111110 exp -1
    //1111111100000000000000000000000
    //00000100000000000000000000000000
    //00000000001010000000000000000000 denormalized
    //11111111101010000000000000000000 sNaN
    //11111111111010000000000000000000 qNaN
    //10000000000000000000000000000000 -0.0
    //00000000000000000000000000000000 0.0
    //var bin = "01000001010100101000000000000000";

    /* 1 function will be for the fixed  and the othe is for the floating point */
    /* get textbox1 and textbox2 = if both have laman, we output sa errror */
    /* if textbox1 has laman = compute for hexadecimal */
    /* if textbox2 has laman = compute for binary */
    var bin = document.getElementById("textbox1").value;
    var S = convH2B(bin);
    alert(S);
}