import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;

public class AreaCheckServlet extends HttpServlet {

    private static final int historySize = 10;

    @Override
    public void init() throws ServletException {
        ServletContext context = getServletContext();
        if (context.getAttribute("history") == null) {
            context.setAttribute("history", new HashMap<HttpSession, Request[]>());
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        double x, y, r;
        try {
            x = Double.parseDouble(req.getParameter("x"));
            y = Double.parseDouble(req.getParameter("y"));
            r = Double.parseDouble(req.getParameter("r"));
        } catch (NullPointerException | NumberFormatException e) {
            getServletContext().getRequestDispatcher("/").forward(req, resp);
            return; // This return is useless. Just to know, that x, y, r are initialized
        }
        // If x, y, r are present, and they are instances of double
        ServletContext context = getServletContext();
        HashMap<HttpSession, Request[]> histories;
        try {
            //noinspection unchecked
            histories = (HashMap<HttpSession, Request[]>) context.getAttribute("history");
        } catch (ClassCastException e) {
            histories = new HashMap<>();
            context.setAttribute("history", histories);
        }
        // If we got histories
        Request[] requests = histories.computeIfAbsent(req.getSession(), session -> new Request[historySize]);
        // If we got current history
        for (int i = requests.length - 1; i > 0; i--) {
            requests[i] = requests[i - 1];
        }
        requests[0] = createRequest(x, y, r);
        createResponsePage(req, resp, requests);
    }

    private Request createRequest(double x, double y, double r) {
        long startTime = System.currentTimeMillis();
        boolean result = AreaChecker.instance.check(x, y, r);
        long finishTime = System.currentTimeMillis();
        return new Request(finishTime - startTime, x, y, r, result);
    }

    private void createResponsePage(HttpServletRequest req, HttpServletResponse resp, Request[] requests) throws IOException {
        PrintWriter out = resp.getWriter();
        DateFormat formatter = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss Z");
        out.println("<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>Area Check</title>\n" +
                "    <link rel=\"stylesheet\" type=\"text/css\" href=\"area_check.css\">\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"outer\">\n" +
                "        <p>\n" +
                "            Results\n" +
                "        </p>\n" +
                "        <table id=\"historyTable\">\n" +
                "            <thead>\n" +
                "            <tr>\n" +
                "                <td class=\"number-col\">#</td>\n" +
                "                <td class=\"time-col\">Time</td>\n" +
                "                <td class=\"exec-time-col\">Execution time</td>\n" +
                "                <td class=\"x-col\">X</td>\n" +
                "                <td class=\"y-col\">Y</td>\n" +
                "                <td class=\"r-col\">R</td>\n" +
                "                <td class=\"result-col\">Result</td>\n" +
                "            </tr>\n" +
                "            </thead>\n" +
                "            <tbody id=\"historyTableContent\">");
        for (int i = 0; i < requests.length; i++) {
            Request request = requests[i];
            if (request != null) {
                out.println("\n" +
                        "            <tr>\n" +
                        "                <td>" + (i + 1) + "</td>\n" +
                        "                <td>" + formatter.format(request.getRequestTime()) + "</td>\n" +
                        "                <td>" + request.getExecutionTIme() + " ms" + "</td>\n" +
                        "                <td>" + request.getX() + "</td>\n" +
                        "                <td>" + request.getY() + "</td>\n" +
                        "                <td>" + request.getR() + "</td>\n" +
                        "                <td>" + (request.getResult() ? "In the area" : "Not in the area") + "</td>\n" +
                        "            </tr>");
            }
        }
        out.println("\n" +
                "            </tbody>\n" +
                "        </table>\n" +
                "    </div>\n" +
                "    <div class=\"outer\">\n" +
                "        <label>Want to test your luck again? Click </label><a href=\"/\">here</a>\n" +
                "    </div>\n" +
                "    <img id=\"cookieImage\" src=\"cookie.png" + "\" alt=\"cute cookie\">\n" +
                "    <script src=\"area_check.js\"></script>\n" +
                "</body>\n" +
                "</html>");
    }
}
