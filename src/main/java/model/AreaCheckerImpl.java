package model;

public class AreaCheckerImpl implements AreaChecker {
    @Override
    public boolean check(Request request) {
        double x = request.getX(),
                y = request.getY(),
                r = request.getR();
        return (x <= 0 && y >= 0 && (Math.sqrt(x * x + y * y) <= r / 2)) ||
                (x >= 0 && y >= 0 && x <= r / 2 && y <= r) ||
                (x >= 0 && y <= 0 && y >= 2 * x - r);
    }
}
