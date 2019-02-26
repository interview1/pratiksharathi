using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WebApplication3.DataAccessLayer;
using WebApplication3.Models;




namespace WebApplication3.Controllers
{
   
    public class EmployeeController : ApiController
    {
        [Route("api/Employee")]
        [HttpGet]
        public IEnumerable<EmployeeResponse> EmployeeGrid(string sortName, string sortDirection, int pageNo, int pageSize)
        {
            DataTable dt = new DataTable();
            EmployeeData data = new EmployeeData();
            List<EmployeeResponse> empResList = new List<EmployeeResponse>();
            EmployeeResponse emprespone = new EmployeeResponse();
            
            dt = data.EmployeeInfo(sortName, sortDirection);
            List<Employee> empList = new List<Employee>();
            int startingIndex = (pageNo) * pageSize;
            int endIndex = dt.Rows.Count > (startingIndex + pageSize) ? (startingIndex + pageSize) : (dt.Rows.Count);
            for (int i = startingIndex; i < endIndex; i++)
            {
                Employee emp = new Employee();
                emp.employeeId = Convert.ToInt32(dt.Rows[i]["employeeId"]);
                emp.employeeName = dt.Rows[i]["employeeName"].ToString();
                emp.designation = dt.Rows[i]["designation"].ToString();
                empList.Add(emp);

            }

            emprespone.emp = empList;
            emprespone.totalCount = dt.Rows.Count;
            empResList.Add(emprespone);
            return empResList;
        }
        [Route("api/EmployeeSave")]
        [HttpGet]
        public int SaveEmployee(string employeeName, string designation, int id, int flag)
        {
            int empId = 0;
            EmployeeData data = new EmployeeData();
            empId = data.Save(employeeName, designation, id, flag);
            return empId;
        }
        [Route("api/EmployeeDelete")]
        [HttpGet]
        public bool DeleteArticle(int id)
        {
            bool result = false;
            //Create the SQL Query for deleting an article
            EmployeeData data = new EmployeeData();
            result = data.Delete(id);


            return result;
        }
    }
}
