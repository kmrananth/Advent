import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Day07 {
    public static int getMinFuel(List<Integer> state, boolean singleStep) {
        return IntStream
                .range(0, 500)
                .map(line -> state
                        .stream()
                        .mapToInt(el ->
                                singleStep ? Math.abs(el - line)
                                        : IntStream
                                        .range(1, Math.abs(el - line) + 1)
                                        .sum())
                        .sum())
                .min().orElse(0);
    }

    public static void main(String[] args) throws IOException {
        Path inputPath = Paths.get("./resources/day07.txt");
        List<String> inputData = Files.lines(inputPath).collect(Collectors.toList());
        List<Integer> initialState =
                Arrays.stream(inputData
                                .get(0)
                                .split(","))
                        .map(Integer::parseInt)
                        .collect(Collectors.toList());
        System.out.println(getMinFuel(initialState, true));
        System.out.println(getMinFuel(initialState, false));
    }
}