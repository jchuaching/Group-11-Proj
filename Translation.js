/**
 * IEEE-754 Binary-32 floating point translator (including all special cases)
 *  Input: 8-digit hex input or 32-bit binary input (provide a separator for various sections of the input)
 *  Output: 
 *      (1) Decimal (provide an option for the user to choose between fixed or floating point) 
 *      (2) with an option to paste the result in notepad
 */
function main(){
    //1111110 exp -1
    //1111111100000000000000000000000
    //00000100000000000000000000000000
    //00000000001010000000000000000000 denormalized
    //11111111101010000000000000000000 sNaN
    //11111111111010000000000000000000 qNaN
    //10000000000000000000000000000000 -0.0
    //00000000000000000000000000000000 0.0
    //var binary = "01000001010100101000000000000000";

    /* 1 function will be for the fixed  and the othe is for the floating point */
    /* get textbox1 and textbox2 = if both have laman, we output sa errror */
    /* if textbox1 has laman = compute for hexadecimal */
    /* if textbox2 has laman = compute for binary */

    var hex = document.getElementById("textbox1").value.trim();
    var binary = document.getElementById("textbox2").value.trim();

    if(hex.length != 0  && binary.length != 0)
        document.getElementById("resultMessage").innerHTML = "Only one input can be computed.";
    else if(hex.length == 0  && binary.length == 0)
        document.getElementById("resultMessage").innerHTML = "Nothing to compute";
    else if (hex.length != 0){  // Translator hex
        // if special case don't do anything
        var S = HexToBinary(hex);
        S = Translator(S);
        alert("S before: " + S);
        S = fixed(S);
        document.getElementById("resultMessage").innerHTML = S;

    }
    else{  // Translator binary
        var S = Translator(binary);
        document.getElementById("resultMessage").innerHTML = S;
    }

}

/**
 * Translates a binary number to a decimal number.
 * @param {*} binary
 * @returns
 */
function Translator(binary){
    // Special cases
    if(binary === "10000000000000000000000000000000"){
        return "-0.0";
    }
    if(binary === "00000000000000000000000000000000"){
        return "0.0";
    }
    if(binary === "11111111100000000000000000000000"){
        return "Negative Infinity";
    }
    if(binary === "01111111100000000000000000000000"){
        return "Positive Infinity";
    }

    // Check if negative
    var isNegative = false;   // false is positive true is negative
    var neg  = parseInt(binary[0],2);
    if(neg==1){
        isNegative = true;
    }

    // Check if NaN
    var j = 0;
    var p = "";
    for(i=1;i<9;i++){
        p += binary[i];
        j++;
    }
    if(p === "11111111"){
        if(parseInt(binary[9],10)==1){
            return "qNaN";
        }
        else{
            return "sNaN";
        }
    }

    // Extract exponent (undoing)
    f = "";
    f[0] = '1';
    j=1;
    var power = parseInt(p,2) - 127; // e* = e-127
    var pow = power + 1;
    var len = 0;

    // Check if denormalized
    if (power <-126 && !isNegative )
    {
        return "denormalized";
    }

    // If Postive exponent and 0
    else if(power < 24 && power > -1){
        for(i = 9; i < 32; i++){
            if (pow == j){
                f += '.';
                j++;
                i--;
            }
            else{
                f += binary[i];
                j++;}
        }

        len = 25;
    }

    // IF Negative exponent
    else if(power <= -1){
        f += '.';
        len++;
        power++;
        while (power <= -1){
            f += '0';
            power++;
            len++;
        }
        f[len]='1';
        len++;
        for(i=9; i<32; i++){
            f += binary[i];
            len++;
        }
    }
    else if (power >= 24){
        f +='1';
        len++;
        for(i=9; i<32; i++){
            f += binary[i];
            len++;
        }
        power = power-23;
        while(power>0){
            f += 0;
            power--;
            len++;
        }

    }
    var fractional = BinaryToDec(f,f.length);
    j = 0;

    // Add negative sign if needed
    var out = "";
    if(isNegative){
        out = "-" + fractional;
    }
    else{
        out = fractional;
    }
    return out;
}

/**
 * Recieves a string of binary and Translates it to a decimal number.
 */
function BinaryToDec(binary, len){
    pt = binary.indexOf('.');

    // If no decimal point is found, then
    if (pt == -1){
        pt = len;
    }

    intDec = 0, fracDec = 0, twos = 1;

    // Translator integral part of binary to decimal
    // equivalent
    for(i = pt - 1; i >= 0; i--){
        intDec += parseInt(binary[i], 2) * twos;

        twos *= 2;
    }

    // Translator fractional part of binary to
    // decimal equivalent
    twos = 2;
    for(i = pt + 1; i < len; i++){
        fracDec += (binary[i] - '0') / twos;
        twos *= 2.0;
    }

    // Add both integral and fractional part
    return intDec + fracDec;
}

/**
 * Recieves a string of hex and Translates it to a binary number.
 * @param {*} hex
 * @returns
 */
function HexToBinary(hex) {
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

function fixed(s){
    // IF PURO 0 YUNG START NEED ERROR CHECKING


    // -234.455
    // parseInt : data, radix (base 10)
    var tempHex = s;
    var stopVar = 0;
    var tempLength = tempHex.length;
    var negIndex = tempHex.indexOf('-');
    var ptIndex = tempHex.indexOf('.');
    var negFlag = false;

    // check if negative = if negative have a flag
    // length of hex - index of "." = 7 - 3 - 1 = 3
    // copy the the string starting from 0 to 3  (234)
    // copy the latter half of the string (455)
    // parse int (455)
    // copy the first number
    // copy the middle numbers
    // e = 3 - 1 = 2
    // if negative ("-" + firstnumber + "." + middlenumbers + latterhalfofthestring + "E" + e )
    // if positive (firstnumber + "." + middlenumbers + latterhalfofthestring + "E" + e )

    if (negIndex != -1)
    {
        // if negative
        negFlag = true;
        tempHex = tempHex.substr(1, tempLength); // 234.455
        tempLength = tempHex.length; // 7
        ptIndex = tempHex.indexOf('.'); // 3
    }

    //var cut = tempLength - ptIndex;
    var firstString = tempHex.substr(0, ptIndex); // 234
    var secondString = tempHex.substr(ptIndex+1, tempLength); // 455
    var firstNum = firstString.substr(0, 1); // 2
    var middleNum = firstString.substr(1, ptIndex-1); // 34
    var exponent = ptIndex - 1;

    if(negFlag){
        return "-" + firstNum + "." + middleNum + secondString + "E" + exponent;
    }
    else{
        return firstNum + "." + middleNum + secondString + "E" + exponent;
    }

    //alert("tempHex is: " + tempHex);
    //alert("length is: " + tempHex.length);

}

// change element to result id later
function copyValues() {
    const copyText = document.getElementById("resultMessage");
    const range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}
