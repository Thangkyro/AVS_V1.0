using AVSProject.Common;
using AVSProject.EFModel;
using AVSProject.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AVSProject.DataService
{
    public class UserBusiness
    {
        private static UserService userService = new UserService();
        private static db_AVSContext dataModel = new db_AVSContext();
        private static string GetString(byte[] reason) => Encoding.ASCII.GetString(reason);
        public List<UserModel> GetUser()
        {
            List<UserModel> listData = new List<UserModel>();
            var getAllUser = userService.GetAllUser();
            listData = getAllUser.Select(x => new UserModel()
            {
                Userid = x.Userid,
                Email = x.Email,
                UserName = x.UserName,
                Password = x.Password,
                Permission = x.Permission,
                BranchId = x.BranchId,
                CreatedAt = x.CreatedAt,
                CreatedBy = x.CreatedBy,
                IsAdmin = x.IsAdmin,
                FullName = x.FullName,
                Decriptions = x.Decriptions,
                IsInactive = x.IsInactive,
                ModifiedAt = x.ModifiedAt,
                ModifiedBy = x.ModifiedBy,
            }).ToList();
            return listData;
        }

        public UserModel GetUserByID(int userID)
        {
            UserModel data = new UserModel();
            var getUser = userService.Get(userID);
            if (getUser == null) return new UserModel();
            data = new UserModel
            {
                Userid = getUser.Userid,
                UserName = getUser.UserName,
                Password = getUser.Password,
                Permission = getUser.Permission,
                BranchId = getUser.BranchId,
                CreatedAt = getUser.CreatedAt,
                CreatedBy = getUser.CreatedBy,
                IsAdmin = getUser.IsAdmin,
                FullName = getUser.FullName,
                Decriptions = getUser.Decriptions,
                IsInactive = getUser.IsInactive,
                ModifiedAt = getUser.ModifiedAt,
                ModifiedBy = getUser.ModifiedBy
            };
            return data;
        }

        public void UpdateUser(UserModel user)
        {
            var check = userService.Get(user.Userid);
            var data = new SUser
            {
                UserName = user.UserName,
                Password = AESUtility.Encrypt(user.Password, AESUtility.DEFAULT_ENCRYPT_KEY_STRING),
                Permission = user.Permission,
                BranchId = user.BranchId,
                CreatedAt = user.CreatedAt,
                CreatedBy = user.CreatedBy,
                IsAdmin = user.IsAdmin,
                FullName = user.FullName,
                Decriptions = user.Decriptions,
                IsInactive = user.IsInactive,
                ModifiedAt = user.ModifiedAt,
                ModifiedBy = user.ModifiedBy
            };
            if (check == null)
            {
                userService.Add(data);
                return;
            }
            else
            {
                userService.Update(data);
                return;
            }
        }
        public void DeleteUser(int userID)
        {
            userService.Delete(userID);
        }
        public bool UpdateNewPassword(string token, string newPass)
        {
            byte[] tokenByteArray = Convert.FromBase64String(token);
            string email = GetString(tokenByteArray.Skip(8).ToArray());
            DateTime when = DateTime.FromBinary(BitConverter.ToInt64(tokenByteArray, 0));
            if (when < DateTime.UtcNow.AddMinutes(-5))
            {
                return false;
            }
            var checkUser = dataModel.SUser.Where(x => x.Email == email).FirstOrDefault();
            if (checkUser == null) return false;
            checkUser.Password = AESUtility.Encrypt(newPass, AESUtility.DEFAULT_ENCRYPT_KEY_STRING);
            userService.Update(checkUser);
            return true;
        }
    }
}