using AVSProject.Business;
using AVSProject.DataService;
using AVSProject.Interface;
using AVSProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AVSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private static ClassBusiness ClassBusiness = new ClassBusiness();
        [HttpGet]
        public List<ClassModel> GetClass()
        {
            var data = ClassBusiness.GetClass();
            return data;
        }
        [HttpGet("{id}")]
        public ClassModel GetClass(int id)
        {
            var data = ClassBusiness.GetClassByID(id);
            return data;
        }

        [HttpPost]
        public void UpdateClass([FromBody] ClassModel value)
        {
            ClassBusiness.UpdateClass(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            ClassBusiness.DeleteClass(id);
        }
    }
}
