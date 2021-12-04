import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

class CellPos {
    int row;
    int col;
    int value;
    boolean status;

    public CellPos(int row, int col, int value) {
        this.row = row;
        this.col = col;
        this.value = value;
    }

    public int getRow() {
        return row;
    }

    public int getCol() {
        return col;
    }

    public int getValue() {
        return value;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String toString() {
        return String.format("%d-%d-%d:%b", row, col, value, status);
    }
}

public class Day04 {
    public static int unMarkedSum(Collection<CellPos> cellPosList) {
        return cellPosList
                .stream()
                .filter(cell -> !cell.getStatus())
                .mapToInt(CellPos::getValue)
                .sum();
    }

    public static long currentMarkedCount(Collection<CellPos> cellPostList, Integer position, String type) {
        Function<Integer, Predicate<CellPos>> pred =
                type.equals("row")
                        ? pos -> cell -> cell.getRow() == pos
                        : pos -> cell -> cell.getCol() == pos;
        return cellPostList
                .stream()
                .filter(pred.apply(position))
                .filter(CellPos::getStatus)
                .count();
    }

    public static void main(String[] args) throws IOException {
        Path inputPath = Paths.get("./resources/day04.txt");
        List<String> inputData = Files.lines(inputPath).collect(Collectors.toList());
        int boardSize = 5;
        List<Integer> bingoInput =
                Arrays.stream(inputData.get(0).split(","))
                        .map(Integer::parseInt)
                        .collect(Collectors.toList());
        List<String> boardInput =
                inputData
                        .stream()
                        .filter(line -> !line.contains(","))
                        .collect(Collectors.toList());
        ArrayList<Map<Integer, CellPos>> boards = new ArrayList<>();
        int row = 0;
        int col = 0;
        Map<Integer, CellPos> board = new HashMap<>();
        for (String boardValue : boardInput) {
            if (boardValue.isBlank()) {
                row = 0;
                col = 0;
                if (board.isEmpty()) continue;
                boards.add(Map.copyOf(board));
                board.clear();
                continue;
            }
            for (String val : boardValue.split(" ")) {
                if (val.trim().isBlank())
                    continue;
                board.put(Integer.parseInt(val), new CellPos(row, col, Integer.parseInt(val)));
                col++;
            }
            col = 0;
            row++;
        }
        boards.add(board);

        boolean bingoFlag = false;
        for (int bingo : bingoInput) {
            if (bingoFlag) break;
            for (Map<Integer, CellPos> currBoard : boards) {
                if (!currBoard.containsKey(bingo))
                    continue;
                CellPos currCell = currBoard.get(bingo);
                currCell.setStatus(true);
                Collection<CellPos> boardVal = currBoard.values();
                long rowCount = currentMarkedCount(boardVal, currCell.getRow(), "row");
                long colCount = currentMarkedCount(boardVal, currCell.getCol(), "column");
                if (rowCount == boardSize || colCount == boardSize) {
                    bingoFlag = true;
                    int unFlagged = unMarkedSum(boardVal);
                    System.out.printf("%d * %d = %d%n", bingo, unFlagged, bingo * unFlagged);
                    break;
                }
            }
        }

        bingoFlag = false;
        ArrayList<Map<Integer, CellPos>> removeBoards = new ArrayList<>();
        for (int bingo : bingoInput) {
            if (bingoFlag) break;
            boards.removeAll(removeBoards);
            removeBoards.clear();
            for (Map<Integer, CellPos> currBoard : boards) {
                if (!currBoard.containsKey(bingo))
                    continue;
                CellPos currCell = currBoard.get(bingo);
                currCell.setStatus(true);
                Collection<CellPos> boardVal = currBoard.values();
                long rowCount = currentMarkedCount(boardVal, currCell.getRow(), "row");
                long colCount = currentMarkedCount(boardVal, currCell.getCol(), "column");
                if (rowCount == boardSize || colCount == boardSize) {
                    if (boards.stream().filter(brd -> !removeBoards.contains(brd)).count() > 1) {
                        removeBoards.add(currBoard);
                    } else {
                        bingoFlag = true;
                        int unFlagged = unMarkedSum(boardVal);
                        System.out.printf("%d * %d = %d%n", bingo, unFlagged, bingo * unFlagged);
                        break;
                    }
                }

            }
        }
    }
}
