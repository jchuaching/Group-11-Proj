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

    // If no decimal point is found, then
    if (pt == -1){
        pt = len;
    }

    intDec = 0, fracDec = 0, twos = 1;

    // Convert integral part of binary to decimal
    // equivalent
    for(i = pt - 1; i >= 0; i--){
        intDec += parseInt(binary[i], 2) * twos;
        
        twos *= 2;
    }

    // Convert fractional part of binary to
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
 * Converts a binary number to a decimal number.
 * @param {*} bin 
 * @returns 
 */
function Convert(bin){
    // Special cases
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

    // Check if negative
    var isNegative = false;   // false is positive true is negative
    var neg  = parseInt(bin[0],2);
    if(neg==1){
        isNegative = true;
    }

    // Check if NaN
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

    // Extract exponent (undoing)
    f = "";
    f[0] = '1';
    j=1;
    var power = parseInt(p,2) - 127; // e* = e-127
    var pow = power + 1; // 
    var len = 0;

    // Check if denormalized
    if (power <-126 && !isNegative )
    {
        return "denormalized";
    }
    
    // Postive exponent and 0
    else if(power < 24 && power > -1){
        for(i = 9; i < 32; i++){
            if (pow == j){
                f[j] = '.';
                j++;
                i--;
            }
            else{
            f[j] = bin[i];
            j++;}
        }

        len = 25;
    } 

    // Negative exponent
    else if(power <= -1){
        f[0] = '.';
        len++;
        power++;
        while (power <= -1){
            f[len] = '0';
            power++;
            len++;
        }
        f[len]='1';
        len++;
        for(i=9; i<32; i++){
                f[len] = bin[i];
                len++;
        }
    }
    
    else if (power >= 24){
        f[len]='1';
        len++;
        for(i=9; i<32; i++){
            f[len] = bin[i];
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

function copyValues() {
    var copyText = document.getElementById("number");
    copyText.select();
    document.execCommand("copy");
    document.getElementById("number")
        .innerHTML ="Copied the text: "
        + copyText.value;
    alert("Copied the text: " + copyText.value);
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

    var bin = document.getElementById("number").value;
    var S = Convert(bin);
    // var S = BinToDec(bin, bin.length);
    // var S = convH2B(bin);
    alert(S);
}