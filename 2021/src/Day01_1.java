import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public class Day01_1 {
    public static int calcIncrement(List<Integer> input, int windowSize){
        int inc=0;
        int next=windowSize;
        int totalLines =input.size();
        for (int line: input){
            if(next<totalLines && line<input.get(next)){
                inc++;
            }
            next++;
        }
        return inc;
    }
    public static void main(String[] args) throws IOException {
        Path inputPath = Paths.get("./resources/day01.txt");
        List<Integer> inputData = Files.lines(inputPath).map(Integer::parseInt).collect(Collectors.toList());

        System.out.println(calcIncrement(inputData,1));
        System.out.println(calcIncrement(inputData,3));

    }

}
