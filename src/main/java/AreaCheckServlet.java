import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.HistoryManager;
import model.Request;
import model.Response;

import java.io.IOException;

public class AreaCheckServlet extends HttpServlet {

    private static final String responseAttrName = "res";

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
        Response response = HistoryManager.instance.addUserRequest(req.getSession(), new Request(x, y, r));
        req.setAttribute(responseAttrName, response);
        getServletContext().getRequestDispatcher("/area_check.jsp").forward(req, resp);
    }
}
