public interface AreaChecker {
    boolean check(double x, double y, double r);
    AreaChecker instance = new AreaCheckerImpl();
}
