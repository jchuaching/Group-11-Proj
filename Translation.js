/**
 * IEEE-754 Binary-32 floating point translator (including all special cases)
 *  Input: 8-digit hex input or 32-bit binary input (provide a separator for various sections of the input)
 *  Output: 
 *      (1) Decimal (provide an option for the user to choose between fixed or floating point) 
 *      (2) with an option to paste the result in notepad
 */

function HexToBinary(hex) {
    var binary = "";
    var x;
    var hexDigit;               //to represent each digit of the hex

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
        if (conv[hexDigit] !== undefined) {
            binary += conv[hexDigit];
        }
    }
    return binary;
}

function BinaryToFloat(bin) {
    if(bin === "10000000000000000000000000000000"){
        return "Special Case -0.0";
    }
    if(bin === "00000000000000000000000000000000"){
        return "Special Case 0.0";
    }
    if(bin === "11111111100000000000000000000000"){
        return "Special Case Negative Infinity";
    }
    if(bin === "01111111100000000000000000000000"){
        return "Special Case Positive Infinity";
    }

    
    var sign;                       // Extract sign bit
    if (bin.charAt(0) == '1')       //check the sign of the first bit
        sign = -1;                  //sign is negative
    else
        sign = 1;                   //means sign is positive

    
    var exponentBits = bin.substr(1, 8);    // get exponent bits and calculate actual exponent
    if (exponentBits == "11111111") {       //special cases
        if (parseInt(bin[9], 10) == 1)
            return "Special Case qNaN";
        else
            return "Special Case sNaN";
    }

    if(exponentBits == "00000000") {
        var mantissaBits = bin.substr(9);

        if(mantissaBits.includes("1")) {      //mantissaBits != "00000000000000000000000"
            return "Special Case Denormalized";
        }

    }

    var exponent = parseInt(exponentBits, 2) - 127;
    var mantissaBits = bin.substr(9);       // Extract mantissa bits and add implicit leading bit
    console.log("Number of mantissa bits " + mantissaBits);
    var mantissa = 1;                       //refers to 1 before decimal point

    //loops through mantissa and if it is 1 gets 2 ^ -1 * i of that and adds it to var mantissa
    for (var i = 1; i <= mantissaBits.length; i++) {
        if (mantissaBits.charAt(i-1) === '1') {
            mantissa += Math.pow(2, -1 * i);        //i + 1 is necessary because first bit starts at 0
        }
    }

    // Calculate floating-point value
    var value = sign * mantissa * Math.pow(2, exponent);
    return value;
}


function copyValues() {
        const copyText = document.getElementById("resultMessage");
        const range = document.createRange();
        range.selectNode(copyText);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
}

function FloatingToFixed(s){
    var negative = false;
    var exponent = 0;

    if (s < 0) {
        negative = true;
        s = s * -1;
    }

    if (s > 0 && s < 1){
        while (s < 1) {
            exponent--;
            s = s * 10;
        }
    }
    else {
        while (s > 10) { 
            exponent++;
            s = s / 10;
        }
    }    

    s = s + "";
    if(!s.includes("."))
        s = s + ".0";

    exponent = exponent + "";
    if (negative) {
        return "-" + s + "E" + exponent;
    }
    else {
        return s + "E" + exponent;
    }
}

function fixedmain(){

    var hex = document.getElementById("textbox1").value.trim();
    var bin = document.getElementById("textbox2").value.trim();

    if(hex.length != 0  && bin.length != 0)
        document.getElementById("resultMessage").innerHTML = "Only one input field should be filled.";
    
    else if(hex.length == 0  && bin.length == 0)
        document.getElementById("resultMessage").innerHTML = "Input field empty.";
    
    else if (hex.length != 0) {             // convert hexadecimal
        if(hex.length == 8) {
            var S = HexToBinary(hex);
            S = BinaryToFloat(S);
            
            if (typeof (S) == 'number') {   // if not special case, convert to fixed
                S = FloatingToFixed(S);
            }
            document.getElementById("resultMessage").innerHTML = S;
        }
        else {
            document.getElementById("resultMessage").innerHTML = "8-Digit Hex Input only.";
        }
    }

    else {                                  // convert binary
        if(bin.length == 32) {
            var S = BinaryToFloat(bin);

            if (typeof (S) == 'number') {   // if not special case, convert to fixed
                S = FloatingToFixed(S);
            }
            document.getElementById("resultMessage").innerHTML = S;
        }
        else {
            document.getElementById("resultMessage").innerHTML = "32-Bit Binary Input only.";
        }
    }
}

function floatingpointmain(){

    var hex = document.getElementById("textbox1").value.trim();
    var bin = document.getElementById("textbox2").value.trim();

    if(hex.length != 0  && bin.length != 0)
        document.getElementById("resultMessage").innerHTML = "Only one input field should be filled.";
    
    else if(hex.length == 0  && bin.length == 0)
        document.getElementById("resultMessage").innerHTML = "Input field empty.";
    
    else if (hex.length != 0) {                  // convert hex
        if(hex.length == 8) {
            var S = HexToBinary(hex);
            S = BinaryToFloat(S);

            if (typeof (S) == 'number') {
                S = S + "";
                if(!S.includes("."))
                    S = S + ".0";
            }
            document.getElementById("resultMessage").innerHTML = S;
        }
        else {
            document.getElementById("resultMessage").innerHTML = "8-Digit Hex Input only.";
        }
    }
    else {                                      // convert binary
        if(bin.length==32) {
            var S = BinaryToFloat(bin);

            if (typeof (S) == 'number') {
                S = S + "";
                if(!S.includes("."))
                    S = S + ".0";
            }
            document.getElementById("resultMessage").innerHTML = S;
        }
        else {
            document.getElementById("resultMessage").innerHTML = "32-Bit Binary Input only.";
        }
    }
}
