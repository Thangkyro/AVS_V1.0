using AVSProject.Business;
using AVSProject.DataService;
using AVSProject.Interface;
using AVSProject.Models;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Asn1.Pkcs;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace AVSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static UserBusiness userBusiness = new UserBusiness();
        private readonly IEMailService _mail;

        public UserController(IEMailService mail)
        {
            _mail = mail;
        }
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
        public void UpdateUser([FromBody] UserModel value)
        {
            userBusiness.UpdateUser(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            userBusiness.DeleteUser(id);
        }

        [HttpPost("UpdateNewPassword")]
        public IActionResult UpdateNewPassword(string token, string newpass)
        {
            var check = userBusiness.UpdateNewPassword(token, newpass);
            if (check)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> SendMailAsync(MailData mailData)
        {
            bool result = await _mail.SendAsync(mailData, new CancellationToken());
            if (!result)
            {
                return new BadRequestResult();
            }
            return new OkResult();
        }

        [HttpGet("ExportFile")]
        public ActionResult ExportExcel()
        {
            var listUser = GetListUser();
            using(XLWorkbook wb = new XLWorkbook())
            {
                wb.AddWorksheet(listUser, "User List");
                using(MemoryStream ms = new MemoryStream())
                {
                    wb.SaveAs(ms);
                    return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Test.xlsx");
                }
            }
        }
        [NonAction]
        private DataTable GetListUser()
        {
            DataTable result = new DataTable();
            result.TableName = "Users";
            result.Columns.Add("Name", typeof(string));
            result.Columns.Add("Email", typeof(string));
            var listData = GetUser();
            if (listData.Count() > 0)
            {
                listData.ForEach(item =>
                {
                    result.Rows.Add(item.UserName, item.Email);
                });
            }
            return result;
        }
    }
}
