using AVSProject.DataService;
using AVSProject.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace AVSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static UserBusiness userBusiness = new UserBusiness();
        [HttpGet]
        //[Route("GetUser")]
        public List<UserModel> GetUser()
        {
            var data = userBusiness.GetUser();
            return data;
        }
        [HttpGet("{id}")]
        public UserModel GetUser(int id)
        {
            var data = userBusiness.GetUserByID(id);
            return data; 
        }

        [HttpPost]
        public void Post([FromBody] UserModel value)
        {
            userBusiness.UpdateUser(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            userBusiness.DeleteUser(id);
        }
    }
}
