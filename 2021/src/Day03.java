import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Day03 {
    public static String getMaxRecurring(List<String> input, int pos, String type) {
        int inputSize = input.size();
        int halfSize = (int) Math.ceil((float) inputSize / 2);
        String value =
                input
                        .stream()
                        .filter(line -> line.split("")[pos].equals("1"))
                        .count() >= halfSize ? "1" : "0";
        return type.equals("actual") ? value : value.equals("1") ? "0" : "1";
    }

    public static int powerRating(List<String> input, String type) {
        int totalBits = input.get(0).length();

        String rate =
                IntStream
                        .range(0, totalBits)
                        .mapToObj(pos -> getMaxRecurring(input, pos, type))
                        .collect(Collectors.joining(""));
        return Integer.parseInt(rate, 2);
    }

    public static int getLifeSupportRating(List<String> input, String type) {
        List<String> inputValues = input;
        int totalBits = inputValues.get(0).length();
        for (int i = 0; i < totalBits; i++) {
            final int posVal = i;
            if (inputValues.size() == 1)
                break;
            String currentBit = getMaxRecurring(inputValues, i, type);
            inputValues =
                    inputValues
                            .stream()
                            .filter(line -> line.split("")[posVal].equals(currentBit))
                            .collect(Collectors.toList());
        }
        return Integer.parseInt(inputValues.get(0), 2);
    }

    public static void main(String[] args) throws IOException {
        Path inputPath = Paths.get("./resources/day03.txt");
        List<String> inputData = Files.lines(inputPath).collect(Collectors.toList());

        int gamma = powerRating(inputData, "actual");
        int epsilon = powerRating(inputData, "reverse");
        System.out.println(gamma * epsilon);

        int o2Rate = getLifeSupportRating(inputData, "actual");
        int co2Rate = getLifeSupportRating(inputData, "reverse");
        System.out.println(o2Rate * co2Rate);
    }
}
