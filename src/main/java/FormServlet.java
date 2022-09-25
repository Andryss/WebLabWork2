import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import model.HistoryManager;

import java.io.IOException;

public class FormServlet extends HttpServlet {

    private static final String historyAttrName = "history";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        if (session.getAttribute(historyAttrName) == null) {
            session.setAttribute(historyAttrName, HistoryManager.instance.getUserHistory(session));
        }
        getServletContext().getRequestDispatcher("/form.jsp").forward(req, resp);
    }
}
