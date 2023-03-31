var Translation = function() {

    function SavetoFile(line) {
        try {
            var myWriter = new FileWriter("result.txt");
            myWriter.write(line);
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

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
    
            if (conv[hexDigit] !== undefined)
                binary += conv[hexDigit];
        }
    
        return binary;
    }

    function Convert(bin){
        // var i;
        if(bin.equals("10000000000000000000000000000000"))
        {
            return "-0.0";
        }
        if(bin.equals("00000000000000000000000000000000"))
        {
            return "0.0";
        }
        if(bin.equals("11111111100000000000000000000000"))
        {
            return "Negative Infinity";
        }
        if(bin.equals("01111111100000000000000000000000"))
        {
            return "Positive Infinity";
        }
        // char[] p = new char[8];
        // char[] f = new char[152];
        var sign=false;//false is positive true is negative
        sb = new StringBuilder();
        var neg = Integer.parseInt(Character.toString(bin.charAt(0)),10);
        //Character.toString(bin.charAt(0));
        if(neg==1){
            sign = true;

        }
        var j = 0;
        for(i=1;i<9;i++)
        {

            p[j] = bin.charAt(i);
            j++;
        }
        if(new String(p).equals("11111111"))
        {

        if(Integer.parseInt(Character.toString(bin.charAt(9)),10)==1)
        {
            return "qNaN";
        }
        else
            {
                return "sNaN";
            }
        }
        f[0] = '1';
        j=1;
        var power = parseInt(new String(p),2) - 127;
        //System.out.println("Power: "+power);
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
            //System.out.println(new String(f));
            while(power>0){
                f[len] = 0;
                //System.out.println("Power:"+power+" Length:"+len);
                power--;
                len++;
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
                var bin = "01000001010100101000000000000000";
                var S = Convert(bin);
                SavetoFile(S);
                console.log(S);
                //console.log(convH2B("0FDcD000")); //Test translation
            }
        }
}