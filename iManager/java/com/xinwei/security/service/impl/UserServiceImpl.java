package com.xinwei.security.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xinwei.process.service.UserAndGroupService;
import com.xinwei.security.MessageCode;
import com.xinwei.security.dao.UserDao;
import com.xinwei.security.dao.UserRoleDao;
import com.xinwei.security.entity.User;
import com.xinwei.security.entity.UserRole;
import com.xinwei.security.exception.ExistedException;
import com.xinwei.security.exception.ServiceException;
import com.xinwei.security.service.UserService;
import com.xinwei.security.shiro.ShiroDbRealm;
import com.xinwei.security.shiro.ShiroDbRealm.HashPassword;
import com.xinwei.security.shiro.UserHelper;
import com.xinwei.util.page.Page;

@Service
public class UserServiceImpl  implements UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserRoleDao userRoleDao;
	
	@Autowired
	private UserAndGroupService userAndGroupServiceImpl; //activiti中的用户与组服务
	
	@Autowired(required = false)
	private ShiroDbRealm shiroRealm;
	
	
	/**
	 * 判断是否超级管理员.
	 */
	private boolean isSupervisor(Long id) {
		return null != id && id == 1;
	}
	
	
	
	public void save(User user) throws ExistedException {	
		//验证用户的登录名、姓名
		validateParameter(user);
		
		//设定安全的密码，使用passwordService提供的salt并经过1024次 sha-1 hash
		setPassword(user);
		
		userDao.save(user);
		
		//将该user对象保存到Activiti中
		userAndGroupServiceImpl.addUser(user.getId(), user.getFirstname(), 
			user.getLastname(), user.getPassword(), user.getEmail());
		
		//保存用户角色关系
		saveRole(user);
		
		shiroRealm.clearCachedAuthorizationInfo(user.getUsername());
	}



	private void setPassword(User user) {
		if (StringUtils.isNotBlank(user.getPassword()) && shiroRealm != null) {
			HashPassword hashPassword = shiroRealm.encrypt(user.getPassword());
			user.setSalt(hashPassword.salt);
			user.setPassword(hashPassword.password);
		}
	}
	//保存用户角色关系同时同步到Activiti用户组中
	private void saveRole(User user) {
		for (Long roleId : user.getRoleIds()) {
			UserRole userRole = new UserRole(user.getId(),roleId);
			userRoleDao.save(userRole);
			
			//将用户放入角色对应的组里
			userAndGroupServiceImpl.addMembership(user.getId().toString(), roleId.toString());;
		}
	}

	private void validateParameter(User user) {
		if (userDao.findByUsername(user) != null) {
			throw new ExistedException(MessageCode.USER_LOGINNAME_EXISTS);
		}
		if(StringUtils.isEmpty(user.getFirstname()) ){
			throw new ServiceException(MessageCode.USER_FIRSTNAME_LASTNAME_NOT_NULL);
		}
	}
	
	/**
	 * 重置密码
	 */
	public void resetPassword(User user){
		setPassword(user);
		userDao.update(user);
		
		shiroRealm.clearCachedAuthorizationInfo(user.getUsername());
	}
	
	//修改密码
	public void updatePassword(String oldPassword,String newPassword){
		
		Boolean accordancePassword = shiroRealm.accordancePassword(oldPassword);
		if(!accordancePassword){
			throw new ServiceException(MessageCode.LOGIN_ORIGINAL_PASSWORD_ERROR);
		}
		User user = UserHelper.getUser();
		user.setPassword(newPassword);
		resetPassword(user);
		
	}
	
	/**
	 * 修改用户的基本信息
	 * @param user
	 */
	public void updateSelf(User user){
		//验证用户id是否为空
		if(null == user.getId() || 0 == user.getId()){
			throw new ServiceException(MessageCode.USER_ID_NULL); 
		}
		//验证用户的登录名、姓名
		validateParameter(user);
		userDao.update(user);
		//同步activiti中的用户信息
		userAndGroupServiceImpl.addUser(user.getId(), user.getFirstname(), 
				user.getLastname(), user.getPassword(), user.getEmail());
		
		shiroRealm.clearCachedAuthorizationInfo(user.getUsername());
	}
	
	public void update(User user) {
		//if (isSupervisor(user.getId())) {
		//	logger.warn("操作员{},尝试修改超级管理员用户", SecurityUtils.getSubject().getPrincipal());
		//	throw new ServiceException("不能修改超级管理员用户");
		//}
		//设定安全的密码，使用passwordService提供的salt并经过1024次 sha-1 hash
		
		//验证用户id是否为空
		if(null == user.getId() || 0 == user.getId()){
			throw new ServiceException(MessageCode.USER_ID_NULL); 
		}
		if (isSupervisor(user.getId())) {
			logger.warn("操作员{},尝试修改超级管理员用户", SecurityUtils.getSubject().getPrincipal());
			throw new ServiceException(MessageCode.USER_CAN_NOT_UPDATE_ADMIN);
		}
		
		
		//验证用户的登录名、姓名
		validateParameter(user);
		
		/*if (StringUtils.isNotBlank(user.getPlainPassword()) && shiroRealm != null) {
			HashPassword hashPassword = shiroRealm.encrypt(user.getPlainPassword());
			user.setSalt(hashPassword.salt);
			user.setPassword(hashPassword.password);
		}*/
		
		userDao.update(user);
		//同步activiti中的用户信息
		userAndGroupServiceImpl.addUser(user.getId(), user.getFirstname(), 
				user.getLastname(), user.getPassword(), user.getEmail());
		//删除用户角色关系
		userRoleDao.deleteByUserId(user.getId());
		//删除activiti中用户组关系
		userAndGroupServiceImpl.deleteMembershipByUId(user.getId().toString());
		//保存用户角色关系
		saveRole(user);
		
		shiroRealm.clearCachedAuthorizationInfo(user.getUsername());
	}

	public void delete(Long id) throws ServiceException {
		if (isSupervisor(id)) {
			logger.warn("操作员{}，尝试删除超级管理员用户", SecurityUtils.getSubject()
					.getPrincipal() + "。");
			throw new ServiceException(MessageCode.USER_CAN_NOT_DELETE_ADMIN);
		}
		User user = userDao.get(id);
		userRoleDao.deleteByUserId(id);
		//删除activiti中用户组关系
		userAndGroupServiceImpl.deleteMembershipByUId(id.toString());
		userDao.delete(id);
		//删除Activiti中的用户
		userAndGroupServiceImpl.deleteUser(id.toString());
		
		shiroRealm.clearCachedAuthorizationInfo(user.getUsername());
	}

	@Override
	public User get(Long id) {
		return userDao.get(id);
	}


	@Override
	public Page<User> findByPage(Map<String,Object> map) {
		Page<User> page = new Page<User>(userDao.findByPageCount(map ));
		map.put("startRow", page.getStartRow());
		map.put("pageSize", page.getPageSize());
		page.setList(userDao.findByPage(map));
		return page;
	}
	
	public User get(String username) {
		User user = new User();
		user.setUsername(username);
		return userDao.findByUsername(user);
	}

	@Override
	public void moveDepartment(List<Long> userIds, Long department_id) {
		if(null == userIds || 0 == userIds.size() ){
			throw new ServiceException(MessageCode.USER_ID_NULL);
		}
		if(null == department_id || 0 == department_id){
			throw new ServiceException(MessageCode.DEPARTMENT_ID_NULL);
		}
		userDao.moveDepartment(userIds, department_id);
	}

	@Override
	public String getCompanyNameByUserId(Long uesrId) {
		return userDao.getCompanyNameByUserId(uesrId);
	}

}
