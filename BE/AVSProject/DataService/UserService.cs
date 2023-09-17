using AVSProject.Interface;
using AVSProject.model;
using AVSProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AVSProject.DataService
{
    public class UserService : IUser
    {
        private static db_AVSContext dbcontext = new db_AVSContext();
        public void Delete(int userID)
        {
            var user = dbcontext.SUser.First(x => x.Userid == userID);
            dbcontext.Remove(user);
            dbcontext.SaveChanges();
        }

        public SUser Get(int userID)
        {
            return dbcontext.SUser.First(x => x.Userid == userID);
        }

        public List<SUser> GetAllUser()
        {
            return dbcontext.SUser.ToList();
        }

        public void Update(SUser user)
        {
            var model = dbcontext.Update<SUser>(user);
            dbcontext.SaveChanges(true);
        }

        public void Add(SUser user)
        {
            var model = dbcontext.Add<SUser>(user);
            dbcontext.SaveChanges(true);
        }
    }
}
