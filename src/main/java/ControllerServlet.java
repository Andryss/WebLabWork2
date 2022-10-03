import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.HistoryManager;

import java.io.IOException;
import java.util.Objects;

public class ControllerServlet extends HttpServlet {

    private static final String easterEggParamName = "Big striped fly";

    @Override
    public void init() {
        HistoryManager.instance.init(getServletContext());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String xParam = req.getParameter("x"),
                yParam = req.getParameter("y"),
                rParam = req.getParameter("r");
        if (Objects.equals(xParam, yParam) && Objects.equals(yParam, rParam) && Objects.equals(rParam, easterEggParamName)) {
            getServletContext().getRequestDispatcher("/easter_egg").forward(req, resp);
            return;
        }
        try {
            Double.parseDouble(xParam);
            Double.parseDouble(yParam);
            Double.parseDouble(rParam);
            getServletContext().getRequestDispatcher("/area_check").forward(req, resp);
        } catch (NullPointerException | NumberFormatException e) {
            getServletContext().getRequestDispatcher("/form").forward(req, resp);
        }
    }
}

/*
ssh -L 8080:localhost:33880 s335155@helios.se.ifmo.ru -p 2222
 */
