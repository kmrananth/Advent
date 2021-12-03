import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Day03 {
    public static String getMaxRecurring (List<String> input, int pos, int half){
        if (input.stream().filter(line->line.split("")[pos].equals("1")).count() >= half)
            return "1";
        else
            return "0";
    }
    public static int getLifeSupportRating (List<String> input,String type){
        List<String> inputValues = input;
        int totalBits = inputValues.get(0).length();
        for (int i=0;i<totalBits;i++){
            int inputSize = inputValues.size();
            int inputHalf = Math.round((float)inputSize/2)+inputSize%2;
            final int posVal=i;
            if (inputSize==1)
                break;
            String maxBit = getMaxRecurring(inputValues,i,inputHalf);
            String currentBit = type.equals("O2")?maxBit:maxBit.equals("1")?"0":"1";
            inputValues = inputValues.stream().filter(line->line.split("")[posVal].equals(currentBit)).collect(Collectors.toList());
        }
        return Integer.parseInt(inputValues.get(0),2);
    }
    public static void main(String[] args) throws IOException {
        Path inputPath = Paths.get("./resources/day03.txt");
        List<String> inputData = Files.lines(inputPath).collect(Collectors.toList());

        int totalLines = inputData.size();
        int halfLineCount = totalLines/2;
        int totalBits = inputData.get(0).length();

        int gamma =Integer.parseInt(IntStream.range(0,totalBits).mapToObj(pos->getMaxRecurring(inputData,pos,halfLineCount)).collect(Collectors.joining("")),2);
        int epsilon =Integer.parseInt(IntStream.range(0,totalBits).mapToObj(pos-> getMaxRecurring(inputData, pos, halfLineCount).equals("0") ?"1":"0").collect(Collectors.joining("")),2);

        System.out.println(gamma*epsilon);

        int o2Rate = getLifeSupportRating(inputData,"O2");
        int co2Rate = getLifeSupportRating(inputData,"CO2");
        System.out.println(o2Rate*co2Rate);
    }
}
