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
    public class ScheduleController : ControllerBase
    {
        private static ScheduleBusiness scheduleBusiness = new ScheduleBusiness();
        [HttpGet]
        public List<ScheduleModel> GetSchedule()
        {
            var data = scheduleBusiness.GetSchedule();
            return data;
        }
        [HttpGet("{id}")]
        public ScheduleModel GetSchedule(int id)
        {
            var data = scheduleBusiness.GetScheduleByID(id);
            return data;
        }

        [HttpPost]
        public void UpdateSchedule([FromBody] ScheduleModel value)
        {
        scheduleBusiness.UpdateSchedule(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        scheduleBusiness.DeleteSchedule(id);
        }
    }
}
