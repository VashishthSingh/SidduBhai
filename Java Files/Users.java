package com.ngcusdirlogin;

public class Users {
	private String username;
	private String password;
	private String userRole;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Users(String username, String password, String userRole) {
		super();
		this.username = username;
		this.password = password;
		this.userRole = userRole;
	}
	@Override
	public String toString() {
		return "Users [username=" + username + ", password=" + password + ", userRole=" + userRole + "]";
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	
}
