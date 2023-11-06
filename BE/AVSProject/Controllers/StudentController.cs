using AVSProject.Business;
using AVSProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AVSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private static StudentBusiness studentBusiness = new StudentBusiness();
        // GET: StudentController
        [HttpGet]
        public List<StudentModel> GetStudent()
        {
            var data = studentBusiness.GetStudent();
            return data;
        }
        [HttpGet("{id}")]
        public StudentModel GetStudent(int id)
        {
            var data = studentBusiness.GetStudentByID(id);
            return data;
        }

        [HttpPost]
        public void UpdateStudent([FromBody] StudentModel value)
        {
            studentBusiness.UpdateStudent(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            studentBusiness.DeleteStudent(id);
        }
    }
}
