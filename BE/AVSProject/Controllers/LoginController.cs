using AVSProject.Business;
using AVSProject.Common;
using AVSProject.DataService;
using AVSProject.EFModel;
using AVSProject.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Linq;

namespace AVSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private static db_AVSContext dbcontext = new db_AVSContext();
        private static LoginBusiness loginBusiness = new LoginBusiness();
        [HttpPost]
        public IActionResult Post([FromBody] LoginModel value)
        {
            string currentPass = AESUtility.Decrypt(value.PassWord, AESUtility.DEFAULT_ENCRYPT_KEY_STRING);
            var check = loginBusiness.CheckEmail(value.Email);
            if (check == null) return Unauthorized();
            string userPass = AESUtility.Decrypt(check.Password, AESUtility.DEFAULT_ENCRYPT_KEY_STRING);
            if (currentPass == userPass)
            {
                var data = loginBusiness.GetToken(500, check);
                return Ok(data);
            }
            else
            {
                return Unauthorized();
            }
        }

        //public static string GetToken(LoginModel model, int expired = 1)
        //{
        //    try
        //    {
        //        string json = model.ToString(); //JsonConvert.SerializeObject( model);
        //        DateTime d_exprired;// = DateTime.Now.AddDays(1);
        //        if (expired == Int32.MinValue)
        //            d_exprired = DateTime.MaxValue;
        //        else
        //        {
        //            if (expired <= 1)
        //                d_exprired = DateTime.Now.AddDays(1);
        //            else
        //            {
        //                if (DateTime.MaxValue.Ticks - DateTime.Now.Ticks > TimeSpan.TicksPerDay * expired)
        //                    d_exprired = DateTime.MaxValue;
        //                else
        //                    d_exprired = DateTime.Now.AddDays(expired);
        //            }
        //        }
        //        FormsAuthenticationTicket tick = new FormsAuthenticationTicket(model.ID, model.UserName, DateTime.Now, d_exprired, true, json);
        //        string rawtoken = FormsAuthentication.Encrypt(tick);
        //        return toBase64(rawtoken);
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}

        //public void ForGetPassword(string email)
        //{
        //    if (string.IsNullOrEmpty(email)) return;
        //    var emailExist = dbcontext.SUser.Where(x => x.Email == email).FirstOrDefault();
        //    if (emailExist != null)
        //    {

        //    }
        //}
    }
}