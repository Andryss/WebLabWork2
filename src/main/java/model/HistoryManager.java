package model;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;

import java.util.List;

public interface HistoryManager {
    void init(ServletContext context);
    Response addUserRequest(HttpSession user, Request request);
    List<Response> getUserHistory(HttpSession user);

    HistoryManager instance = new HistoryManagerImpl();
}
