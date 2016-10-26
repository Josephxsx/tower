package com.forestry.controller.sys;

import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SystemAccessInterceper extends HandlerInterceptorAdapter {
	private final Logger logger = Logger.getLogger(getClass());

	  @Override
	  public boolean preHandle(HttpServletRequest request,
	      HttpServletResponse response, Object handler) throws Exception {
	    String uri = request.getRequestURI();
	   /* String[] noFilters = ConfigureUtil.getStringArray("no_filter_setting");
	    boolean isFilter = true;
	    if (!ArrayUtils.isEmpty(noFilters)) {
	      for (String u : noFilters) {
	        if (uri.contains(u)) {
	          isFilter = false;
	          break;
	        }
	      }
	    }*/
	    boolean isFilter = true;
	    if (isFilter) {
	      // Session
	      Object obj = request.getSession()
	          .getAttribute("SESSION_SYS_USER");
	      if (null == obj) {
	        logger.info("登录超时！！");
	        PrintWriter writer = response.getWriter();
	        writer.print("<script>top.location='http://www.phineco.win:8088/tower/login.jsp';</script>SESSION_TIMEOUT_ERROR");
	        IOUtils.closeQuietly(writer);
	        return false;
	      } /*else {
	        request.setAttribute("LOG_ACCESS_TIME",
	            System.currentTimeMillis());
	        logger.info(obj + "访问了" + uri);
	      }*/
	    }
	    return super.preHandle(request, response, handler);
	  }

	  @Override
	  public void afterCompletion(HttpServletRequest request,
	      HttpServletResponse response, Object handler, Exception ex)
	      throws Exception {
	    // TODO Auto-generated method stub
	    super.afterCompletion(request, response, handler, ex);
	    /*(Object obj = request.getAttribute("LOG_ACCESS_TIME");
	    if (null != obj) {
	      long accessTime = (long) obj;
	      logger.info("处理请求" + request.getRequestURI() + "耗时"
	          + (System.currentTimeMillis() - accessTime) + "毫秒！");
	    }*/
	  }
}
