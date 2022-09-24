import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Double.parseDouble(req.getParameter("x"));
            Double.parseDouble(req.getParameter("y"));
            Double.parseDouble(req.getParameter("r"));
            getServletContext().getRequestDispatcher("/area_check").forward(req, resp);
        } catch (NullPointerException | NumberFormatException e) {
            getServletContext().getRequestDispatcher("/form").forward(req, resp);
        }
    }
}
