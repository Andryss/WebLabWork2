import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        PrintWriter out = resp.getWriter();
        out.println("<html><body>");
        out.println("<label>X: " + req.getParameter("xValue") + "</label>");
        out.println("<label>Y: " + req.getParameter("yValue") + "</label>");
        out.println("<label>R: " + req.getParameter("rValue") + "</label>");
        out.println("</body></html>");
    }
}
