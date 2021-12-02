import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public class Day02_1 {
    public static void main(String[] args) throws IOException {
        Path inputPath = Paths.get("./resources/day02.txt");
        List<String> inputData = Files.lines(inputPath).collect(Collectors.toList());

        int[] result=inputData.stream().map(line-> {
            String[] val=line.split(" ");
            return switch (val[0]) {
                case "forward" -> new int[]{Integer.parseInt(val[1]), 0};
                case "down" -> new int[]{0, Integer.parseInt(val[1])};
                default -> new int[]{0, Integer.parseInt(val[1]) * -1};
            };

        }).reduce(new int[]{0,0},(val,el)->new int[]{val[0]+el[0],val[1]+el[1]});
        System.out.println(result[0]*result[1]);

        result=inputData.stream().map(line-> {
            String[] val=line.split(" ");
            return switch (val[0]) {
                case "forward" -> new int[]{Integer.parseInt(val[1]),0, 0};
                case "down" -> new int[]{0,0, Integer.parseInt(val[1])};
                default -> new int[]{0,0, Integer.parseInt(val[1]) * -1};
            };

        }).reduce(new int[]{0,0,0},(val,el)->
        new int[]{val[0] + el[0], el[0] == 0 ? val[1] : val[1] + (el[0] * val[2]), val[2] + el[2]}
        );
        System.out.println(result[0]*result[1]);
    }
}
