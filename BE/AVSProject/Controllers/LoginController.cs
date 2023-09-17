using AVSProject.Common;
using AVSProject.DataService;
using AVSProject.model;
using AVSProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AVSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private static db_AVSContext dbcontext = new db_AVSContext();
        private static UserBusiness userBusiness = new UserBusiness();

        [HttpPost]
        public IActionResult Post([FromBody] LoginModel value)
        {
            string currentPass = AESUtility.Decrypt(value.PassWord, AESUtility.DEFAULT_ENCRYPT_KEY_STRING);
            //var test1 = AESUtility.Decrypt(test, AESUtility.DEFAULT_ENCRYPT_KEY_STRING);
            var check = CheckUserName(value.UserName);
            if(check == null) return Unauthorized();
            string userPass = AESUtility.Decrypt(check.Password, AESUtility.DEFAULT_ENCRYPT_KEY_STRING);
            if (currentPass == userPass)
            {
                //var response =  new HttpResponseMessage();
                //response.StatusCode = HttpStatusCode.OK;
                var data = GetToken(500, check);
                return Ok(data);
            } else
            {
                return Unauthorized();
            }
        }

        public SUser CheckUserName(string username)
        {
            var checkUser = dbcontext.SUser.Where(x => x.UserName == username).FirstOrDefault();
            if (checkUser == null) return new SUser();
            return checkUser;
        }
        public string GetToken(int tokenValidPeriod, SUser checkUser)
        {
            var obj = new UserModel
            {
                Userid = checkUser.Userid,
                UserName = checkUser.UserName,
                Password = checkUser.Password,
                Permission = checkUser.Permission,
                BranchId = checkUser.BranchId,
                CreatedAt = checkUser.CreatedAt,
                CreatedBy = checkUser.CreatedBy,
                IsAdmin = checkUser.IsAdmin,
                FullName = checkUser.FullName,
                Decriptions = checkUser.Decriptions,
                IsInactive = checkUser.IsInactive,
                ModifiedAt = checkUser.ModifiedAt,
                ModifiedBy = checkUser.ModifiedBy,
                Expired = (long) DateTime.Now.AddMinutes(tokenValidPeriod).Subtract(new DateTime(1970, 1, 1)).TotalSeconds
            };
            return JsonConvert.SerializeObject(obj);
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
    }
}
