import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

class Points {
    static Pattern pattern = Pattern.compile("(\\d+),(\\d+) -> (\\d+),(\\d+)");
    static Matcher match;
    int x1;
    int y1;
    int x2;
    int y2;

    public Points(String data) {
        match = pattern.matcher(data);
        match.find();
        x1 = Integer.parseInt(match.group(1));
        y1 = Integer.parseInt(match.group(2));
        x2 = Integer.parseInt(match.group(3));
        y2 = Integer.parseInt(match.group(4));
    }

    public boolean straight() {
        return x1 == x2 || y1 == y2;
    }

    public Stream<String> getLineValues() {
        String constValue = x1 == x2 ? "x" : y1 == y2 ? "y" : "d";
        int varValue1 = constValue.equals("x") ? Math.min(y1, y2) : Math.min(x1, x2);
        int varValue2 = (constValue.equals("x") ? Math.max(y1, y2) : Math.max(x1, x2)) + 1;
        int yValue = x1 < x2 ? y1 : y2;
        int factor = x1 < x2 ? (y1 < y2 ? 1 : -1) : (y1 < y2 ? -1 : 1);
        return IntStream
                .range(varValue1, varValue2)
                .mapToObj(el -> String.format("%d-%d", constValue.equals("x") ? x1 : el, constValue.equals("x") ? el : constValue.equals("y") ? y1 : Math.abs(yValue + ((el - varValue1) * factor))))
                .collect(Collectors.toList()).stream();
    }

    public String toString() {
        return String.format("(%d,%d) (%d,%d)", x1, y1, x2, y2);
    }
}

public class Day05 {
    public static void main(String[] args) throws IOException {
        Path inputPath = Paths.get("./resources/day05.txt");
        List<String> inputData = Files.lines(inputPath).collect(Collectors.toList());
        List<Points> pointsData =
                inputData
                        .stream()
                        .map(Points::new)
                        .collect(Collectors.toList());


        System.out.println(
                pointsData
                        .stream()
                        .filter(Points::straight)
                        .flatMap(Points::getLineValues)
                        .collect(Collectors.groupingBy(String::valueOf))
                        .values()
                        .stream()
                        .filter(line -> line.size() > 1)
                        .count()
        );
        System.out.println(
                pointsData
                        .stream()
                        .flatMap(Points::getLineValues)
                        .collect(Collectors.groupingBy(String::valueOf))
                        .values()
                        .stream()
                        .filter(line -> line.size() > 1)
                        .count()
        );
    }
}
