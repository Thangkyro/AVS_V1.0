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
    public class StaffController : ControllerBase
    {
        private static StaffBusiness staffBusiness = new StaffBusiness();
        [HttpGet]
        public List<StaffModel> GetStaff()
        {
            var data = staffBusiness.GetStaff();
            return data;
        }
        [HttpGet("{id}")]
        public StaffModel GetStaff(int id)
        {
            var data = staffBusiness.GetStaffByID(id);
            return data;
        }

        [HttpPost]
        public void UpdateStaff([FromBody] StaffModel value)
        {
            staffBusiness.UpdateStaff(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            staffBusiness.DeleteStaff(id);
        }
    }
}
