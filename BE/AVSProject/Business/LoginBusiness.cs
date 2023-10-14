using AVSProject.EFModel;
using AVSProject.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AVSProject.Business
{
    public class LoginBusiness
    {
        private static db_AVSContext dbcontext = new db_AVSContext();
        public SUser CheckEmail(string email)
        {
            var checkUser = dbcontext.SUser.Where(x => x.Email == email).FirstOrDefault();
            if (checkUser == null) return null;
            return checkUser;
        }

        public UserModel GetToken(int tokenValidPeriod, SUser checkUser)
        {
            //var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            //var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var obj = new UserModel
            {
                Userid = checkUser.Userid,
                UserName = checkUser.UserName,
                //Password = checkUser.Password,
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
                Expired = (long)DateTime.Now.AddMinutes(tokenValidPeriod).Subtract(new DateTime(1970, 1, 1)).TotalSeconds
            };
            return obj;
        }
    }
}
