public class prac {
    public static void main(String[] args) {
        int sumOdd = 0;
        int sumEven = 0;
        for (int i = 0; i <= 30; i++) {
            int value = i;
            if (i % 2 == 0) {
               sumEven += value;
            } else {
                sumOdd += value;
            }
            System.out.println("odd: "+ sumOdd);
            System.out.println("even: "+ sumEven);
        }
    }
}
