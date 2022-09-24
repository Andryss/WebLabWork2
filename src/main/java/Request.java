public class Request {
    private final long requestTime = System.currentTimeMillis();
    private final long executionTIme;
    private final double x;
    private final double y;
    private final double r;
    private final boolean result;

    public Request(long executionTIme, double x, double y, double r, boolean result) {
        this.executionTIme = executionTIme;
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    public long getRequestTime() {
        return requestTime;
    }

    public long getExecutionTIme() {
        return executionTIme;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getResult() {
        return result;
    }
}
