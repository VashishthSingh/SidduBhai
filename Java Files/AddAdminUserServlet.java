package com.ngcusdirlogin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AddAdminUserServlet")
public class AddAdminUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public AddAdminUserServlet() {super();}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String userName=request.getParameter("userName");
		String password=request.getParameter("passWord");
		String adminOrUserName=request.getParameter("adminOrUserName");
		System.out.println(userName+" "+password);
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
        Mydb db = new Mydb();
        Connection con = db.getCon();
        try {
        	PreparedStatement ps=con.prepareStatement("select * from credential where username=?");  
            ps.setString(1,userName);
            //ps.setString(2,password);
        	ResultSet rs = ps.executeQuery();
            if(rs.next()==true) {
            	if(adminOrUserName.equals("Admin"))
            		out.println("Admin With This Username Already Exist Change UN");
            	else
            		out.println("User With This Username Already Exist Change UN");
            	ps.close();
            	rs.close();
            }
            else {
            	ps.close();
            	rs.close();
            	PreparedStatement ps1=con.prepareStatement("insert into credential values(?,?,?)");  
                ps1.setString(1,userName);
                ps1.setString(2,password);
                
                if(adminOrUserName.equals("Admin")) {
                	ps1.setString(3,"yes");
            		out.println("Admin Added Successfully");
                }
            	else {
            		ps1.setString(3,"no");
            		out.println("User Added Successfully");
            	}
            	ps1.executeUpdate();
            	ps1.close();
            	
            }
            con.close();
         }catch (Exception ex) {
             System.out.println(ex);
         }
	}

}
