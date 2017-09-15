package com.xinwei.security.controller;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import tk.mybatis.mapper.util.StringUtil;

import com.xinwei.process.constant.ApprovedConstants;
import com.xinwei.process.controller.BaseController;
import com.xinwei.process.entity.Company;
import com.xinwei.process.service.CompanyService;
import com.xinwei.security.entity.Role;
import com.xinwei.security.entity.User;
import com.xinwei.security.entity.UserRole;
import com.xinwei.security.service.RoleService;
import com.xinwei.security.service.UserRoleService;
import com.xinwei.security.service.UserService;
import com.xinwei.security.vo.ResultVO;
import com.xinwei.util.page.Page;

@Controller
@RequestMapping("/management/user")
public class UserControllerNew extends BaseController{

	@Autowired
	private UserService userService;
	
	@Autowired
	UserRoleService userRoleService;
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private CompanyService companyServiceImpl;
	
	@Value("${roleId_projectManager}")
	private Long roleId_projectManager;//项目经理角色Id
	
	@Value("${roleId_guest}")
	private Long roleId_guest;//游客角色ID
	
	@ModelAttribute("preloadUser")
	public User getOne(@RequestParam(value = "id", required = false) Long id) {
		if (id != null) {
			User user = userService.get(id);
			return user;
		}
		return null;
	}
	
	
	/**
	 * 查询用户列表
	 * @param keywords
	 * @return
	 */
	@RequestMapping(value="/list", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String list(String username,Long roleId,Long department_id) {
		
		Map<String, Object> queryMap = new HashMap<String, Object>();
		queryMap.put("username", username);
		queryMap.put("roleId", roleId);
		queryMap.put("department_id", department_id);
		Page<User> page = userService.findByPage(queryMap);
		//设置用户角色
		List<User> users = page.getList();
		for (User user : users) {
			List<Role> roles = userRoleService.findRolesByUserId(user.getId());
			user.setRoles(roles);
		}
		
		ResultVO<User> resultVO = new ResultVO<User>();
		resultVO.setPage(page);
		resultVO.setLists(page.getList());
		//resultVO.setKeywords(keywords);
		
		return resultVO.toString();
	}
	
	
	
	/**
	 * 分页查询角色下的用户列表
	 * @param keywords
	 * @return
	 */
	@RequestMapping(value="/getRoleUsers/list", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String getRoleUsers(Long role_id,Long containRoleId) {
		
		Map<String, Object> queryMap = new HashMap<String, Object>();
		queryMap.put("role_id", role_id);
		queryMap.put("containRoleId", containRoleId);
		Page<User> page = userRoleService.findUsersByRoleId(queryMap);
		List<User> userList = page.getList();
		//设置用户角色
		for (User user : userList) {
			List<Role> roles = userRoleService.findRolesByUserId(user.getId());
			user.setRoles(roles);
			//获取单位名称
			String companyName = userService.getCompanyNameByUserId(user.getId());
			user.setCompany_name(companyName);
		}
		ResultVO<User> resultVO = new ResultVO<User>();
		resultVO.setPage(page); 
		resultVO.setLists(userList);
		//resultVO.setKeywords(keywords);
		
		return resultVO.toString();
	}
	
	/**
	 * 查询某个角色下的所有用户列表
	 * @param keywords
	 * @return
	 */
	@RequestMapping(value="/getRoleAllUsers", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String getRoleAllUsers(Long role_id) {
		
		ResultVO<User> resultVO = new ResultVO<User>();
		List<User> userList = userRoleService.findAllUsersByRoleId(role_id);
		//设置用户角色
		for (User user : userList) {
			List<Role> roles = userRoleService.findRolesByUserId(user.getId());
			user.setRoles(roles);
		}
		resultVO.setOthers("userList", userList);
		return resultVO.toString();
	}
	
	/**
	 * 某一角色下根据用户名或单位名称模糊、分页获取用户列表
	 * @param 
	 * @return
	 */
	@RequestMapping(value="/getByRoleIdAndNameOrCompanyName", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String getByRoleIdAndNameOrCompanyName(Long role_id,String keyWords) {
		
		ResultVO<User> resultVO = new ResultVO<User>();
		Map<String, Object> queryMap = new HashMap<String, Object>();
		String queryWords = null;
		if(StringUtils.isNotBlank(keyWords)){
			queryWords = "%"+keyWords+"%";
		}
		queryMap.put("role_id", role_id);
		queryMap.put("firstname", queryWords);
		queryMap.put("company_name", queryWords);
		Page<User> page = userRoleService.findUsersByRoleIdAndNameOrCompanyName(queryMap);
		//设置用户角色
		List<User> users = page.getList();
		for (User user : users) {
			List<Role> roles = userRoleService.findRolesByUserId(user.getId());
			user.setRoles(roles);
		}
		resultVO.setPage(page); 
		resultVO.setLists(users);
		return resultVO.toString();
	}
	
	/**
	 * 创建用户
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/create", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String create(User user,@RequestParam(value = "roleId[]", required = false)List<Long> roleId) {	
		user.setRoleIds(roleId);
		user.setCreateTime(new Date());
		userService.save(user);
		
		System.out.println(user);
		return new ResultVO<>().toString();
	}
	
	/**
	 * 用户注册
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/register", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String register(User user) {	
		List<Long> roleId = new ArrayList<Long>();
		//初始为游客角色
		roleId.add(roleId_guest);
		user.setRoleIds(roleId);
		user.setCreateTime(new Date());
		//设置用户状态为待审批状态
		user.setApprovalStatus(0);
		userService.save(user);
		
		System.out.println(user);
		return new ResultVO<>().toString();
	}
	
	/**
	 * 获取待审核的用户列表
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getRigisterUser/list", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String getRigisterUserList(String username,Long roleId) {	
		Map<String, Object> queryMap = new HashMap<String, Object>();
		queryMap.put("username", username);
		queryMap.put("roleId", roleId);
		queryMap.put("approvalStatus", ApprovedConstants.CODE_NOT_APPROVED);
		Page<User> page = userService.findByPage(queryMap);
		//设置用户角色
		List<User> users = page.getList();
		for (User user : users) {
			List<Role> roles = userRoleService.findRolesByUserId(user.getId());
			user.setRoles(roles);
		}
		
		ResultVO<User> resultVO = new ResultVO<User>();
		resultVO.setPage(page);
		resultVO.setLists(page.getList());
		return resultVO.toString();
	}
	
	/**
	 * 获取待审核的用户信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getRigisterUserInfo", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String getRigisterUserInfo(Long userId) {	
		ResultVO<Object> result = new ResultVO<>();
		//获取用户对象
	    User user = userService.get(userId);
	    Company company = null;
		if(null != user){
			//获取角色信息
			List<Role> roles = userRoleService.findRolesByUserId(user.getId());
			user.setRoles(roles);
			//根据单位名称获取单位信息
			company = companyServiceImpl.selectCompaniesByName(user.getCompany_name());
			if(null != company){
				result.setOthers("company", company);
			}
			result.setOthers("user", user);
		}else{
			//给客户端响应
			result.setResult(ResultVO.FAILURE);
		}
		return result.toString();
	}
	
	/**
	 * 管理员审核新注册用户
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/approval", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String approval(Long userId,Long companyId,String approvalResult) {	
		ResultVO<Object> result = new ResultVO<>();
		//获取当前管理员信息，设置审批人
		User currentUser = this.getCurrentUser();
		if(null != currentUser && null != userId && StringUtil.isNotEmpty(approvalResult)){
			//获取用户对象
		    User user = userService.get(userId);
		    //获取单位信息
		    Company company = companyServiceImpl.selectByPrimaryKey(companyId);
		    if(null !=user){
		    	//根据审批结果进行处理
		    	if(ApprovedConstants.ApproveResult.Agree.equals(approvalResult)){
		    		
		    		//如果审核通过，修改用户审核状态为审核通过状态
		    		user.setApprovalStatus(ApprovedConstants.ApproveResult.CODE_Agree);
		    		//修改用户角色为项目经理角色
		    		List<Long> roleIds = new ArrayList<Long>();
		    		roleIds.add(roleId_projectManager);
		    		user.setRoleIds(roleIds);
		    		//更新用户对象
		    		userService.update(user);
		    		
		    		if(null != company && ApprovedConstants.CODE_NOT_APPROVED.toString().equals(company.getCurrentStatus().trim())){
		    			//设置审批人信息
		    			company.setApprovePerson(currentUser.getId().toString());
		    			company.setApproveTime(new Date());
		    			//修改单位审核状态为审核通过
		    			company.setCurrentStatus(ApprovedConstants.ApproveResult.CODE_Agree.toString());
		    			companyServiceImpl.update(company);
		    		}
		    	}else{//审核不通过，
		    		//修改用户审核状态为审核不通过
		    		user.setApprovalStatus(ApprovedConstants.ApproveResult.CODE_Reject);
		    		//更新用户对象
		    		userService.update(user);
		    		if(null != company){
		    			//删除审核不通过的单位信息
		    			companyServiceImpl.delete(companyId);
		    		}
		    	}
		    	result.setResult(ResultVO.SUCCESS);
		    }else{
		    	//给客户端响应
				result.setResult(ResultVO.FAILURE);
		    }
		}else{
			//给客户端响应
			result.setResult(ResultVO.FAILURE);
		}
		return result.toString();
	}
	
	/**
	 * 获取单个用户信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/getUser", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String getUser(Long id) {
		User user = userService.get(id);
		//设置用户角色
		List<Role> roles = userRoleService.findRolesByUserId(id);
		user.setRoles(roles);
		ResultVO<User> result = new ResultVO<>();
		result.setEntity(user);
		return result.toString();
	}
	
	
	/**
	 * 修改用户（管理员修改用户信息）
	 * @param user
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	@RequestMapping(value="/update", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String update(
			@ModelAttribute("preloadUser")User user,
			@RequestParam(value = "roleId[]", required = false)List<Long> roleId) 
	{
		user.setRoleIds(roleId);
		userService.update(user);
		return new ResultVO<>().toString();
	}
	
	
	
	/**
	 * 修改用户（用户修改自身信息）
	 * @param user
	 * @return
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 */
	@RequestMapping(value="/updateSelf", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String updateSelf(@ModelAttribute("preloadUser")User user) throws IllegalAccessException, InvocationTargetException {
		userService.updateSelf(user);
		return new ResultVO<>().toString();
	}
	
	
	
	
	
	/**
	 * 删除用户
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/delete", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String delete(Long id) {
		userService.delete(id);
		return new ResultVO<>().toString();
	}
	

	
	/**
	 * 重置密码
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/resetPassword", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String reset(@ModelAttribute("preloadUser")User user) {
		userService.resetPassword(user);
		return new ResultVO<>().toString();
	}
	
	
	/**
	 * 修改密码
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/updatePassword", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String updatePassword(String oldPassword,String newPassword) {
		userService.updatePassword(oldPassword,newPassword);
		return new ResultVO<>().toString();
	}
	
	
	
	
	/**
	 * 禁用用户、启用用户
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/updateDisabled", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String updateDisabled(Long id) {
		User user = userService.get(id);
		user.setIsDisabled(user.getIsDisabled() == 0 ? 1 : 0);
		userService.updateSelf(user);
		return new ResultVO<>().toString();
	}
	
	
	
	
	
	/**
	 * 获取用户的角色
	 * @param id	用户id
	 * @return
	 */
	@RequestMapping(value="/edit/getRoles", method={RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody String getRoles(Long id) {
		List<Role> hasRoles = userRoleService.findRolesByUserId(id);
		ResultVO<Object> result = new  ResultVO<>();
		result.setOthers("hasRoles", hasRoles);
		return result.toString();
	}
	
	/**
	 * 获取所有的角色
	 * @return
	 */
	@RequestMapping(value="/edit/getAllRoles", method={RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody String getAllRoles() {
		List<Role> allRoles = roleService.findAll();
		ResultVO<Object> result = new  ResultVO<>();
		result.setOthers("allRoles", allRoles);
		return result.toString();
	}
	
	
	
	/**
	 * 保存分配角色 
	 * @param user  
	 * @return
	 */
	@RequestMapping(value="/create/userRole", method={RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody String assignRole(User user,Long[] roleIds) {
		//将前台中的userRole对象中的userId赋值
		List<UserRole> userRoles = new ArrayList<UserRole>();
		
		if(null != roleIds && 0 != roleIds.length)
		{
			UserRole userRole;
			for (Long roleId : roleIds) {
				if(roleId==null) continue;   //当前台传值roleIds=的情况，可以避免继续执行
				userRole = new UserRole();
				userRole.setUser_id(user.getId());
				userRole.setRole_id(roleId);
				userRoles.add(userRole);
			}
		}
		
		userRoleService.updateUserRole(userRoles, user.getId());
		
		return new ResultVO<>().toString();
	}
	
	
	
	/*
	@RequiresPermissions("User:edit")
	@RequestMapping(value="/lookup2delete/userRole/{userId}", method={RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String listUserRole(Map<String, Object> map, @PathVariable Long userId) {
		List<UserRole> userRoles = userRoleService.find(userId);
		map.put("userRoles", userRoles);
		
		ResultVO<UserRole> result = new  ResultVO<UserRole>();
		result.setOthers("userRoles", userRoles);
		//result.setForwardUrl(LOOK_USER_ROLE);
		return result.toString();
	}*/
	
}
