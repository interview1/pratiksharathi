using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class EmployeeResponse
    {
        public List<Employee> emp { get; set; }
        public int totalCount { get; set; }
    }
}