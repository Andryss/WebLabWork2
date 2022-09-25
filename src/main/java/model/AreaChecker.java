package model;

public interface AreaChecker {
    boolean check(Request request);

    AreaChecker instance = new AreaCheckerImpl();
}
