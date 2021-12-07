import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

public class Day06 {
    public static Long growRate(Map<Integer,Long> state,int days){
        Map<Integer,Long> mapState= new HashMap<>() ;
        Map<Integer,Long> newMapState= new HashMap<>() ;
        mapState = Map.copyOf(state);
        for(int i=0;i<days;i++) {
            mapState
                    .forEach((k, v) -> {
                                Integer k1 = k == 0 ? 6 : k - 1;
                                Long v1 = k1==6 && newMapState.containsKey(k1)?newMapState.get(k1)+v:v;
                                newMapState.put(k1, v1);
                                if (k == 0) {
                                    newMapState.put(8, v);
                                }
                            }
                    );
            mapState = Map.copyOf(newMapState);
            newMapState.clear();
        }

        return mapState
                .values()
                .stream()
                .reduce(0L, Long::sum);

    }
    public static void main(String[] args) throws IOException {
        Path inputPath = Paths.get("./resources/day06.txt");
        List<String> inputData = Files.lines(inputPath).collect(Collectors.toList());
        Map<Integer,Long> mapState=
        Arrays.stream(inputData
                .get(0)
                .split(","))
                .collect(Collectors.groupingBy(Integer::parseInt,Collectors.counting()));
        System.out.println(growRate(mapState,80));
        System.out.println(growRate(mapState,256));
    }
}
