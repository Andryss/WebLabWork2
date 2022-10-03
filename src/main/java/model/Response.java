package model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;

public class Response {
    private final long responseTime = System.currentTimeMillis();
    private final long executionTime;
    private final double x;
    private final double y;
    private final double r;
    private final boolean result;

    private static final DateFormat formatter = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss Z", Locale.ENGLISH);

    public Response(long executionTIme, Request request, boolean result) {
        this.executionTime = executionTIme;
        this.x = request.getX();
        this.y = request.getY();
        this.r = request.getR();
        this.result = result;
    }

    public long getResponseTime() {
        return responseTime;
    }

    public String getResponseTimeString() {
        return formatter.format(responseTime);
    }

    public long getExecutionTime() {
        return executionTime;
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

    public String getResultString() {
        return result ? "In the area" : "Not in the area";
    }
}
