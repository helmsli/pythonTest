package com.xinwei.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.StringUtils;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.xinwei.security.MessageCode;
import com.xinwei.security.entity.Function;
import com.xinwei.security.entity.Menu;
import com.xinwei.security.service.FunctionService;
import com.xinwei.security.service.MenuService;
import com.xinwei.security.vo.ResultVO;
import com.xinwei.util.ResponseOutJsonUtil;

public class PermissionControllerFilter extends AuthorizationFilter {

	@Autowired
	private MenuService menuService;

	@Autowired
	private FunctionService functionService;

	private final Logger logger = LoggerFactory.getLogger(PermissionControllerFilter.class.getName());

	
	
	
	/**
	 * 永远返回false，只是返回 无权限信息给前台。
	 */
	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws IOException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;  
        HttpServletResponse httpResponse = (HttpServletResponse) response;  
  
        Subject subject = getSubject(request, response);  
  
        if (subject.getPrincipal() == null) {  
        	String lastAccessUrl = "";
        	if(org.apache.commons.lang3.StringUtils.isEmpty(httpRequest.getQueryString()))
        		lastAccessUrl =  httpRequest.getRequestURL().toString()  ;
        	else
        		lastAccessUrl =  httpRequest.getRequestURL().toString() + "?" + httpRequest.getQueryString();
        	
    		 
    		if(lastAccessUrl.indexOf("html")!=-1 && lastAccessUrl.indexOf("/views/error.html")==-1)
    			httpRequest.getSession().setAttribute("url", lastAccessUrl);
    		
    		
    		
            if (isAjax(httpRequest)) {  
            	ResponseOutJsonUtil.out(httpResponse,new ResultVO(MessageCode.SESSION_TIMEOUT).toString() );
            	
            } else {  
                saveRequestAndRedirectToLogin(request, response);  
            }  
        } else {  
            if (isAjax(httpRequest)) {  
            	ResponseOutJsonUtil.out(httpResponse,new ResultVO(MessageCode.NO_PERMISSION).toString() );
            } else {  
                String unauthorizedUrl = getUnauthorizedUrl();  
                if (StringUtils.hasText(unauthorizedUrl)) {  
                    WebUtils.issueRedirect(request, response, unauthorizedUrl);  
                } else {  
                    WebUtils.toHttp(response).sendError(HttpServletResponse.SC_UNAUTHORIZED);  
                }  
            }  
        }  
        return false;  
	}
	
	

	/**
	 * 只是做了是否有权限的判断，返回是否拥有权限信息 是在 onAccessDenied()方法中调用的。
	 */
	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue)
			throws Exception {
		Subject subject = getSubject(request, response);
		//为了满足ajax请求，返回超时的状态码。
		//不得不将user的过滤器排在后面。
		//此处的代码只是充当了user过滤器的作用
		if(subject.getPrincipal() == null)
			return false;
		
		// 根据数据库menu、function表 获取映射关系（ action -> 权限关键字 ）
		Map<String, String> actionPermissions = new HashMap<>();
		List<Menu> menus = menuService.findAll();
		List<Function> functions = functionService.findAll();
		for (Menu menu : menus)
			actionPermissions.put(menu.getAction(), menu.getSn());
		for (Function function : functions)
			actionPermissions.put(function.getAction(), function.getSn());

		// 获取当前action的权限关键字
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		String action = httpServletRequest.getServletPath();
		String currentURL = httpServletRequest.getServletPath();
		String permission = actionPermissions.get(currentURL);

		// 数据库中未配置，则不需要权限验证
		if (org.apache.commons.lang3.StringUtils.isEmpty(permission)) 
			return true;
		else {
			boolean permitted = subject.isPermitted(permission);
			return permitted ? true : false;
		}
	}
	
	
	
	/**
	 * 是否是Ajax请求
	 * @param request
	 * @return
	 */
	public static boolean isAjax(ServletRequest request){
		return "XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request).getHeader("X-Requested-With"));
	}
	
	

}
