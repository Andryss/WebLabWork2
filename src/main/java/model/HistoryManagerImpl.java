package model;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;

import java.util.LinkedList;
import java.util.List;
import java.util.WeakHashMap;

public class HistoryManagerImpl implements HistoryManager {
    private static final String mapName = "histories";
    private static final int maxUserLength = 10;

    private final WeakHashMap<HttpSession, LinkedList<Response>> histories = new WeakHashMap<>();

    @Override
    public void init(ServletContext context) {
        context.setAttribute(mapName, histories);
    }

    @Override
    public Response addUserRequest(HttpSession user, Request request) {
        LinkedList<Response> responses = getUserHistory0(user);
        responses.addFirst(createResponse(request));
        while (responses.size() > maxUserLength) responses.removeLast();
        return responses.getFirst();
    }

    private Response createResponse(Request request) {
        long startTime = System.currentTimeMillis();
        boolean result = AreaChecker.instance.check(request);
        long finishTime = System.currentTimeMillis();
        return new Response(finishTime - startTime, request, result);
    }

    @Override
    public List<Response> getUserHistory(HttpSession user) {
        return getUserHistory0(user);
    }

    private LinkedList<Response> getUserHistory0(HttpSession user) {
        return histories.computeIfAbsent(user, (u) -> new LinkedList<>());
    }
}
